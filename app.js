'use strict'

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var uuid = require('uuid');
var MongoStore = require('connect-mongo')(session);

process.env.SESSION_SECRET || require('dotenv').load();

var passport = require('./lib/passport.js');
var routes = require('./routes/index.js');
var users = require('./routes/users.js');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUnitialized: false,
  store: new MongoStore({
    url: "mongodb://localhost/CMSData"
  }),
  cookie: {
    maxAge: 300000
  },
  genid: function(req){
    return uuid.v4({
      rng: uuid.nodeRNG
    });
  }
}));

app.use(passport.initialize());

app.use(passport.session());
//requiring our routing info from routes/index.js

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extender: false }));


// var models = require('../models/index'),
//   User = models.User;
/*other models, like tag, profile, etc.*/

// app.use(function(req,res,next){
//   console.log("Req.Body is ", req.body);
//   console.log("Next is ", next);
//   next();
// });

// app.use(passport.session());

app.use('/', require('./routes/index.js'));



module.exports = app;
