var express = require('express');
var router = express.Router();
var User = require('../models').User;
var Therapist = require('../models').Therapist;

module.exports = function(passport) {

  router.get('/login', function(req, res) {
    res.render('login')
  });

  router.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login'
  }));

  router.get('/signup', function(req, res) {
    res.render('signup');
  })

  router.post('/signup', function(req, res) {
    //
    // var t = new Therapist({
    //   username: 'rstein',
    //   password: 'password',
    //   fullname: 'Ruben Stein',
    //   email: 'rstein@aol.com'
    // })
    //
    // t.save(function(err, s) {
    //   res.send(200)

    Therapist.findOne({email: req.body.therapist}, function (err, doc) {
      if (err) {
        console.log("Error: ", err);
        res.render('signup', {
          msg: 'No therapist found under that email.'
        });
      } else {
        console.log("doc:", doc);
        var newUser = new User({
          username: req.body.username,
          password: req.body.password,
          fullname: req.body.fullname,
          dob: req.body.dob,
          therapist: doc._id
        });
        newUser.save(function(err, saved) {
          if (err) {
            console.log("error saving: err");
            res.send(500);
          } else {
            res.render('login');
          }
        })

      }
    })

  })

  return router;
}
