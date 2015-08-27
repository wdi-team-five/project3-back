'use strict'

var express = require('express');
var router = express.Router();
var passport = require('passport');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var async = require('async');
var forEach = require('async-foreach').forEach;

var mongoose = require('mongoose');
var MongoFile = require('../models/MongoFile');

// var MongoFile = mongoose.MongoFile;

var models = require('../models/index'),
    User = models.User,
    Element = models.Element,
    Profile = models.Profile;

// router.get('/', function(req,res,next){
//   res.json('index', {
//     title: (req.user && req.user.localName) || "Nobody"
//   });
// });

// search function that returns index of mongoDB documents by default, limited by a tag if provided
var indexOfElements = function(){
  var mongoElements = [];



  async.waterfall([
    function(cb){
      Element.findAll({
        where: {
          userID: req.user.id
        }
      })
    },
    function(usersElements, cb){
      forEach(usersElements, function(item, index, arr) {
        mongoElements.push(
          MongoFile.findById(element.mongoId, function(err){
            if (err) {
              console.error(err);
              return next(err);
            }
          }
        ));
      });
    }
    ], function(err,result){
      if(err){
        return next(err);
      }
      console.log(result);
      res.sendStatus(201);
    });

  //
  // var mongoElements = [];
  // var sqlElements =
  // console.log(sqlElements);
  // ;
  // return mongoElements;
};


router.route('/login')
  .get(function(req,res,next){
    res.sendStatus(405);
  })
  .post(
   passport.authenticate('local'), function(req, res){
     res.json(req.user);
   });

router.route('/profile')
  .get(function(req,res, next){
    req.user.getProfile().then(function(profile){
      res.json(profile);
    }, function(err){
      next(err);
    });
  });

router.route('/register')
  .get(function(req,res,next){
    res.sendStatus(405);
  })
  .post(function(req,res,next){
    if(!req.body || !req.body.username || !req.body.password){
      var err = new Error("No username and/or password provided.");
      return next(err);
    }
    async.waterfall([
      function(cb){
        bcrypt.genSalt(16,cb);
        //kind of like this:
        //.then(function(salt){
        //   cb(null,salt)
        // })
      },
      function(salt,cb){
        bcrypt.hash(req.body.password, salt, cb);
      },
      function(hash,cb){
        User.create({
          localName: req.body.username,
          localPass: hash
        }).then(function(user){
          cb(null,user);
        })
        //this is what is going on with .catch(cb);
        .catch(function(err){
          cb(err);
        });
      },
      function(user,cb){
        Profile.create({
          firstName: req.body.firstName || "",
          lastName: req.body.lastName || "",
          companyName: req.body.company || "",
          UserId: user.id
        }).then(function(profile){
          cb(null,profile);
        }).catch(cb);
      }
      ], function(err,result){
        if(err){
          return next(err);
        }
        res.sendStatus(201);
      });
  });

router.route('/changePassword')
  .get(function(req,res,next){
    res.sendStatus(405);
  })
  .put(function(req,res,next){
    //check if user is logged in ( if(req.user) ) && user.body has a 'password' in it -- OR 403
    if(!req.user){
      var err = new Error("User not logged in.");
      return next(err);
    }
    if(!req.body || !req.body.password){
      var err = new Error("You have no credentials.");
      return next(err);
    }
    //check if body contains a password value OR 404
    //bcrpyt

    async.waterfall([
      function(cb){
        bcrypt.genSalt(16,cb);
      },
      function(salt,cb){
        bcrypt.hash(req.body.password,salt,cb);
      },
      function(hash,cb){
        req.user.update({
          localPass: hash
        }).then(function(user){
          cb(null,user);
        }).catch(cb);
      }
      ], function(err,result){
        if(err){
          return next(err);
        }
        res.sendStatus(202);
    });
    //update user's db row with new pass
    //send a server response 202/200
  });

router.route('/updateProfile')
  .get(function(req,res,next){
    res.sendStatus(405);
  })
  .put(function(req,res,next){
    //check if user is logged in ( if(req.user) ) && user.body has a 'password' in it -- OR 403
    if(!req.user){
      var err = new Error("User not logged in.");
      return next(err);
    }
    if(!req.body || !req.body.password){
      var err = new Error("You have no credentials.");
      return next(err);
    }
    //check if body contains a password value OR 404
    //bcrpyt
    req.user.getProfile().then(
      function(profile){
        profile.update({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          companyName: req.body.company
      }).then(
        function(profile){
        //probably returning updated profile? maybe change this to return updated profile in json for handlebars
          res.sendStatus(200);
        },
        function(err){
          next(err);
        });
    });
    //req.user.create Route folder~!
  });

router.route('/createFolder')
  .post(function(req, res, next){
    MongoFile.create({
      elementName: req.body.elementName,
      path: req.body.path,
      sourceURL: null,
      directory: true,
      // need to split on commas and push to array of tags
      tagsArray: req.body.tagsArray,
      description: req.body.description
    }, function(err, result){
      if (err) {
        console.error(err);
        return next(err);
      }
      res.sendStatus(200);
      Element.create({
        userID: req.user.id,
        mongoId: result['_id'].toString()
      });
    });
  });

router.route('/createFile')
  .post(function(req, res, next){
    // file upload through AWS

    MongoFile.create({
      elementName: req.body.elementName,
      path: req.body.path,
      sourceURL: req.body.sourceURL,
      directory: false,
      // need to split on commas and push to array of tags
      tagsArray: req.body.tagsArray,
      description: req.body.description
    }, function(err, result){
      if (err) {
        console.error(err);
        return next(err);
      }
      res.sendStatus(200);
      // console.log(result['_id'].toString());
      Element.create({
        userID: req.user.id,
        mongoId: result['_id'].toString()
      });
    });
  });

router.route('/deleteFile')
  .delete(function(req, res, next){
    Element.destroy({
      where: {
        mongoId: req.body.mongoId
      }
    });
    MongoFile.findOneAndRemove({ _id:req.body.mongoId }, function(err){
      if (err) {
        console.error(err);
        return next(err);
      }
      res.sendStatus(200);
    });
    // MongoFile.find({ _id:req.body.mongoId }).remove().exec();
  });

router.route('/elements')
  .get(function(req, res, next){

    // create JSON for response
  }, function(err){
    if (err) {
      console.error(err);
      return next(err);
    }
  });


//MongoFile.create({
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

module.exports = router;
