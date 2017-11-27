var express = require('express');
var router = express.Router();
var Puppy = require('../models').Puppy
var User = require('../models').User

router.use(function(req, res, next) {
  if (!req.user) {
    res.redirect('/login')
  } else {
    return next();
  }
})

router.get('/', function(req, res, next) {
  res.send(200)
});

module.exports = router;
