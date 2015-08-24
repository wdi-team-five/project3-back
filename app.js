'use strict'

var express = require('express');
var app = express();

//requiring our routing info from routes/index.js
app.use('/', require('./routes/index.js'));


// var models = require('../models/index'),
//   User = models.User;
/*other models, like tag, profile, etc.*/

process.env.SESSION_SECRET || require('dotenv').load();

var passport = require('./lib/passport.js');

app.use(passport.initialize());

app.use(passport.session());

module.exports = app;
