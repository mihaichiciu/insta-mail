# InstaMail
This is an application for sending email surveys and collecting responses. It is a full stack application for education purposes.
The idea and initial version of the application is based on the course from Stephen Grider from Udemy.com. 

Here is a running [demo](https://hidden-woodland-47116.herokuapp.com/) on Heroku.

# Build
* Clone the repository
* Cd _root_ directory and perform `npm install`
* Cd _client_ directory and perform `npm install`
* Cd _root_ directory and create `config/dev.js` file with all necessary keys for local version

Example dev.js file:
```
module.exports = {
    googleClientID: '',
    googleClientSecret: '',
    mongoURI: '',
    cookieKey: '123123123',
    stripePublishableKey: '',
    stripeSecretKey: '',
    sendGridKey: '',
    redirectDomain: 'http://localhost:3000'
};
```
All keys must be correctly filled out. You need to suply following info:
* Google credentials to enable Google OAuth login (only Google OAuth works for now)
* mongoURI - to connect to Mongo database (use [MongoAtlas](https://www.mongodb.com/cloud/atlas) service for example)
* cookieKey - can be any arbitrary string
* Stripe keys - you need to have valid account on [Stripe](https://stripe.com/)
* SendGrid key - you need to have valid account on [SendGrid](https://sendgrid.com/)
* redirectDomain - the host of the client server

# Techstack
#### Client
* React
* [React Router](https://github.com/ReactTraining/react-router) (request routing)
* [React Redux](https://react-redux.js.org/) (state management)
* [Axios](https://github.com/axios/axios) (http client)
* [materializecss](https://materializecss.com/) (styles)
* [create-react-app](https://github.com/facebook/create-react-app)

#### Server
* Nodejs
* Express
* [Passportjs](http://www.passportjs.org/) (OAuth2 authentication)
* [Stripe](https://stripe.com/) (Payments)
* [Mongoose](https://mongoosejs.com/) (MongoDB persistence)
* [Sendgrid](https://sendgrid.com/) (Sending mails, webhooks for survey answers)

#### Services used on production instance
* [MongoAtlas](https://www.mongodb.com/cloud/atlas) (hosting MongoDB instances)
* [Stripe](https://stripe.com/)
* [SendGrid](https://sendgrid.com/)
