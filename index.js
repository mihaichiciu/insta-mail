const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport'); // ce este in services/passport.js este executat, nu ma intereseaza sa preiau ceva de acolo

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 de zile
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require('./routes/auth');
const PORT = process.env.PORT || 5000;

app.use('/', authRoutes);

app.listen(PORT, () => {
  console.log('Server has started on port:', PORT);
});
