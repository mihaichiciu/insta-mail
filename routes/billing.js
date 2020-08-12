const express = require('express');
const router = express.Router();
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/loginMiddleware');

router.post('/api/stripe', requireLogin, async (req, res) => {
  const charge = await stripe.charges.create({
    amount: 500, //trebuie pus din nou suma
    currency: 'usd',
    source: req.body.id, // intotdeauna trebuie pus primul id care vine din req.body
    description: '$5 for 5 credits',
  });

  req.user.credits += 5;
  const updatedUser = await req.user.save(); // se salveaza in bd
  res.send(updatedUser);
});

module.exports = router;
