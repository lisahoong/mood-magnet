var express = require('express');
var router = express.Router();
var Patient = require('../models').Patient;
var Mood = require('../models').Mood;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('home');
});

router.get('/signup', function(req, res) {
  res.send('sign up pGW');
})

router.post('/add', function(req, res) {
  console.log('body: ', req.body);
  var newPatient = new Patient(req.body);
  newPatient.save(function(err, patient) {
    if (err) {
      console.log(err);
      res.send(500)
    } else {
      res.json({
        patientId: patient._id
      })
    }
  });
})

router.get('/getpatients', function(req, res) {
  Patient.find({})
  .populate('moods')
  .exec(
   function(err, patients) {
    if (!err) {
      res.json({
        patients: patients
      });
    } else {
      res.send(500);
    }
  })
})

router.get('/patient/:id', function(req, res) {
  Patient.findOne({_id: req.params.id}, function(err, p) {
    if (!err) {
      res.json(p);
    } else {
      res.send(500);
    }
  })
})

router.post('/login', function(req, res) {
  Patient.findOne({email: req.body.email}, function(err, p) {

  })
})

router.get('/view/:id', function (req, res) {
  Patient.findOne({_id: req.params.id})
  .populate('moods')
  .exec(function (err, p) {
    if (!err) {
      var i = -1;
      var total = 0;
      var moods = p.moods.map(function(m) {
        console.log(m);
        i += 1;
        total += m.rating;
        return {
          date: `${m.date.getMonth() + 1}/${m.date.getDate() + 1}/${m.date.getYear() % 100}`,
          index: i,
          rating: m.rating,
          desc: m.description,
          emotion: m.title,
        }
      });
      var j = -1;
      var points = p.moods.map(function(m) {
        j += 1;
        return {
          y: m.rating,
          x: j
        }
      })
      console.log(moods);
      res.json({
        patient: p,
        dob: `${p.dob.getMonth() + 1}/${p.dob.getDate() + 1}/${p.dob.getYear() % 100}`,
        moods: moods,
        points: {color: "steelblue", points: points},
        avg: (total/p.moods.length).toFixed(2)
      });
    } else {
      console.log('error: ', err);
      res.send(500);
    }
  })
})

router.post('/createaccount', function(req, res) {
  console.log(req.body);
  Patient.findOneAndUpdate({_id: req.body.id},
    {password: req.body.pw}, function(err, p) {
    if (!err) {
      console.log('patient found', p);
      res.send(200);
    } else {
      console.log('error: ', err);
      res.send(500);
    }
  })
});

router.post('/addmood/:id', function(req, res) {
  Patient.findOne({_id: req.params.id}, function(err, user) {
    if (!err) {
      var mood = new Mood({
        title: req.body.mood,
        rating: req.body.scale,
        date: req.body.date,
        description: req.body.description,
        patient: user._id
      });
      mood.save(function(err, saved) {
        if (!err) {
          console.log(saved);
          user.moods.push(saved);
          user.save(function(err, updatedUser) {
            if (!err) {
              console.log(updatedUser);
              res.send(200);

            } else {
              console.log('error: ', err);
              res.send(500);
            }
          })
        } else {
          console.log('error: ', err);
          res.send(500);
        }
      })
    }
  })
})

module.exports = router;
