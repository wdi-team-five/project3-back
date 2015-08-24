'use strict'

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

process.env.SESSION_SECRET || require('dotenv').load();

var passport = require('./lib/passport.js');
var routes = require('./routes/index.js');
var users = require('./routes/users.js');

app.use(passport.initialize());

app.use(passport.session());
//requiring our routing info from routes/index.js

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extender: false }));

// var models = require('../models/index'),
//   User = models.User;
/*other models, like tag, profile, etc.*/

app.use(function(req,res,next){
  console.log("Req.Body is ", req.body);
  console.log("Next is ", next);
  next();
});

app.use('/', require('./routes/index.js'));

module.exports = app;
