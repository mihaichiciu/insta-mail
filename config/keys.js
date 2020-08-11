if (process.env.NODE_ENV === 'production') {
  // NODE_ENV = variabila de sistem in heroku
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
