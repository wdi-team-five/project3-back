'use strict'

var express = require('express');
var app = express();

//requiring our routing info from routes/index.js
app.use('/', require('./routes/index.js'));


// var models = require('../models/index'),
//   User = models.User;
/*other models, like tag, profile, etc.*/




module.exports = app;
