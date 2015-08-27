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

var awsUpload = function(buffer, caption, callback, userId) {
  var fileType = getFileType(buffer);

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
      elementName: "req.body.elementName",
      path: "req.body.path",
      sourceURL: data.Location,
      directory: false,
      // need to split on commas and push to array of tags
      tagsArray: "req.body.tagsArray",
      description: "req.body.description"
    }, function(err, result){
      if (err) {
        console.error(err);
        return next(err);
      }
      console.log(result);
      // console.log(result['_id'].toString());
      Element.create({
        UserId: userId,
        mongoId: result['_id'].toString()
      }, function(err,file){
        if(err){
          callback(err);
          return;
        }
        console.log("aws line 71 ", file);
        callback(null, file);
        }
      );
    });
  }); // end awsS3.upload
};

module.exports = awsUpload;
