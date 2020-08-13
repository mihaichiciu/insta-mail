module.exports = (req, res, next) => {
  console.log(req.user.credits, req.body.recipients.split(',').length);
  if (req.user.credits < req.body.recipients.split(',').length) {
    return res.status(403).send({ error: 'Not enough credits!' });
  }
  next();
};
