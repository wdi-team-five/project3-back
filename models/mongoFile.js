'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// var mongooseConnect = require('../lib/mongooseConnection.js');

var mongoFileSchema = new Schema({
    elementName: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    // ownerId: {
    //   type: Number,
    //   required: true
    // },
    sourceURL: {
      type: String,
      required: true
    },
    directory: {
      type: Boolean,
      required: true
    },
    tagsArray: {
      type: Array,
      required: false
    },
    description: {
      type: String,
      required: false
    }
});

var MongoFile = mongoose.model( 'MongoFile', mongoFileSchema);

// MongoFile.create({
//   elementName: "Test",
//   path: "/blah/blah",
//   ownerId: '1234',
//   sourceURL: "usr1/imgs/me.png",
//   directory: false,
//   tagsArray: ["new", "travel"],
//   description: "Something"
// }, function(err, mongoFile){
//   if(err){
//     console.error(err);
//     //return;
//   }
// });

// var MongoFile = mongoose.model( 'MongoFile', mongoFileSchema);

// MongoFile.findByID(process.argv[2], function(err, contact){
//   if(err){
//       setTimeout(dont, 0);
//       console.log(err);
//   }
//   Contact.remove(function(err){
//     if(err){
//       setTimeout(dont, 0);
//       console.log(err);
//     }
//   });
// });

module.exports = MongoFile;
