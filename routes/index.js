var express = require('express');

var router = express.Router();

router.get('/', function(req,res){
  console.log("Hello world.");
  res.send("Welcome to Cara's app.");
});

// router.route('/')

module.exports = router;
