'use strict'

var express = require('express');
var router = express.Router();
var passport = require('passport');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var async = require('async');

var models = require('../models'),
    User = models.User;

router.get('/', function(req,res){
  res.render('index', {
    title: (req.user && req.user.localName) || "Nobody"
  });
});

router.route('/login')
  .get(function(req,res,next){
    res.sendStatus(405);
  })
  .post(passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

router.route('/register')
  .get(function(req,res,next){
    res.sendStatus(405);
  })
  .post(function(req,res,next){
    if(!req.body || !req.body.email || !req.body.password){
      var err = new Error("No email and/or password provided.");
      return next(err);
    }
    async.waterfall([
      function(cb){
        bcrypt.genSalt(16,cb);
      },
      function(salt,cb){
        bcrypt.hash(req.body.password, salt, cb);
      },
      function(hash,cb){
        User.create({
          localName: req.body.email,
          localPass: hash
        }).then(function(user){
          cb(null,user);
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

module.exports = router;
