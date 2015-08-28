'use strict';

var bucket = process.env.AWS_S3_BUCKET ||
 require('dotenv').load() && process.env.AWS_S3_BUCKET;
var util = require('util');
var crypto = require('crypto');
var fs = require('fs');
var AWS = require('aws-sdk');
var getFileType = require('file-type');
var MongoFile = require('../models/MongoFile');
var models = require('../models/index'),
    User = models.User,
    Element = models.Element,
    Profile = models.Profile;

var Image = require('../models/image.js');

var awsS3 = new AWS.S3();

var awsUpload = function(buffer, caption, userId, path, tagsArray, callback) {
  var fileType = getFileType(buffer);
  console.log("AWS CONSOLE LOG \n \n \n buffer, caption, callback, userId, path, tagsArray is \n \n", buffer, caption, callback, userId, path, tagsArray);
  if (!fileType) {
    fileType = {
      ext: 'bin',
      mime: 'application/octet-stream'
    };
  }

  var key = util.format('%s/%s.%s',
    (new Date()).toISOString().split('T')[0],
    crypto.pseudoRandomBytes(16).toString('hex'),
    fileType.ext);

  var params = {
    ACL: 'public-read',
    Bucket: bucket,
    Key: key,
    ContentType: fileType.mime,
    Body: buffer
  };

  awsS3.upload(params, function(err, data) {
    if (err) {
      callback(err);
      return;
    }
    MongoFile.create({
      elementName: caption,
      path: path + 'hello path',
      sourceURL: data.Location,
      directory: false,
      // need to split on commas and push to array of tags
      tagsArray: [tagsArray],
      description: "req.body.description"
    }, function(err, result){
      if (err) {
        console.error(err);
        return next(err);
      }
      // console.log(result['_id'].toString());
      Element.create({
        UserId: userId,
        mongoId: result['_id'].toString()
      }).then(function(file){
        callback(null, result);
      }).catch(callback);
    });
  }); // end awsS3.upload
};

module.exports = awsUpload;
