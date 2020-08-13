const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const requireLogin = require('../middlewares/loginMiddleware');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Survey = mongoose.model('surveys');

router.get('/api/surveys', requireLogin, async (req, res) => {
  const surveys = await Survey.find({ _user: req.user.id }).select({ recipients: false }); // exclude recipients from the query
  res.send(surveys);
});

router.get('/api/surveys/:surveyId/:choice', (req, res) => {
  res.send('Thank for voting!');
});

router.post('/api/surveys/webhooks', (req, res) => {
  const p = new Path('/api/surveys/:surveyId/:choice');

  _.chain(req.body)
    .map(({ url, email }) => {
      const match = p.test(new URL(url).pathname); // match will be an object that contains surveyId and choice or will be null
      if (match) {
        return { email, surveyId: match.surveyId, choice: match.choice };
      }
    })
    .compact() // it removes elements that are undefined
    .uniqBy('email', 'surveyId') // removes duplicate events with the same email AND same surveyId
    .each(async ({ surveyId, email, choice }) => {
      // not using async await is intentional because we don't need to responde with anything to SendGrid
      await Survey.updateOne(
        {
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, hasResponded: false },
          },
        },
        {
          $inc: { [choice]: 1 },
          $set: { 'recipients.$.hasResponded': true },
          lastResponded: new Date(),
        }
      ).exec();
    })
    .value();

  res.send({});
});

router.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
  const { title, subject, body, recipients } = req.body;
  listOfRecipients = recipients.split(',').map((email) => ({ email: email.trim() }));
  const noOfRecipients = listOfRecipients.length;
  const survey = new Survey({
    title,
    subject,
    body,
    recipients: listOfRecipients,
    _user: req.user.id,
    dateSent: Date.now(),
  });

  const mailer = new Mailer(survey, surveyTemplate(survey));
  try {
    await mailer.send();
    await survey.save();
    req.user.credits -= noOfRecipients;
    const user = await req.user.save();
    res.send(user);
  } catch (err) {
    res.status(422).send(err);
  }
});

module.exports = router;
