'use strict'

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/file-upload');

var fileSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  mime: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
});

var File = mongoose.model('File', fileSchema);

module.exports = File;
