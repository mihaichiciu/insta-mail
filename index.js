const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport'); // ce este in services/passport.js este executat, nu ma intereseaza sa preiau ceva de acolo

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 de zile
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require('./routes/auth');
const billingRoutes = require('./routes/billing');

app.use('/', authRoutes, billingRoutes);

if (process.env.NODE_ENV === 'production') {
  // Express serves up production assets
  app.use(express.static('./client/build'));
  // Express serves up index.html when it does not recongnize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server has started on port:', PORT);
});
