'use strict'

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var models = require('../models/index'),
  User = models.User;

passport.serializeUser(function(user,done){
  //done(err,result);
  done(null, user.id);
});
passport.deserializeUser(function(id, done){
  User.findOne({
    where: {
      'id' : id
    }
  }).then(function(user){
    done(null,user);
  }).catch(function(err){
    done(err);
  });
});

var localStrat = new LocalStrategy(function(email, password, done){
  User.findOne({
    where: {
      localName: email
    }
  }).then(function(user){
    if(!user){
      return done(null, false);
    }
    bcrypt.compare(password, user.localPass, function(err,match){
      if(err){
        return done(err);
      }
      done(null, match ? user : false);
    });
  }).catch(function(err){
    done(err);
  });
});

passport.use(localStrat);
/**INVOCATIONS
 *  passport.use:
 *    local strategy instance
 *
 */
module.exports = passport;
