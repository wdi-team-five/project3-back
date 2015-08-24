'use strict'

var express = require('express');
var router = express.Router();
var passport = require('passport');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
//async

router.get('/', function(req,res){
  console.log("Hello world.");
  res.send("Welcome to Cara's app.");
});



router.route('/login')
  .get(function(req,res,next){
    res.sendStatus(405);
  })
  .post(passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

router.route('/signup')
  .get(function(req,res,next){
    res.sendStatus(405);
  })
  .post(function(req,res,next){
    if(!req.body || !req.body.username || !req.body.password){
      return next(err);
    }
    async.waterfall([
      function(cb){
        bcrypt.genSalt(16,cb);
      },
      function(salt,cb){
        bcrypt.hash(req.body.username, salt, cb);
      },
      function(hash,cb){
        User.create({
          localName: req.body.username,
          localPass: hash
        }).then(function(user){
          cb(null,user);
        }).catch(cb);
      }
      ], function(err,res){
        if(err){
          return next(err);
        }
        res.sendStatus(201);
      });
  });

module.exports = router;
