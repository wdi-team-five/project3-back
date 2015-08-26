'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var mongoFileSchema = new Schema({
    path: {
      type: String,
      required: true
    },
    ownerId: {
      type: Number,
      required: true
    },
    sourceURL: {
      type: String,
      required: true
    },
    folder: {
      type: Boolean,
      required: true
    }
});

var MongoFile = mongoose.model( 'MongoFile', mongoFileSchema);

// MongoFile.create({
//   path: "/blah/blah",
//   ownerId: '1234',
//   sourceURL: "usr1/imgs/me.png",
//   folder: false
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
