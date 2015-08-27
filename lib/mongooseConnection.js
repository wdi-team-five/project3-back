'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/CMSData');

module.exports = function(cb) {
  mongoose.connection.close(cb);
};
