'use strict'
var express = require('express');
var app = express();

//requiring our routing info from routes/index.js
app.use('/', require('./routes/index.js'));






module.exports = app;
