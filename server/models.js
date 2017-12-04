var mongoose = require('mongoose');
var connect = process.env.MONGODB_URI;

mongoose.connect(connect);

var patientSchema = mongoose.Schema({
  username: String,
  password: String,
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  therapist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Therapist',
    required: false
  },
  dob: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  moods: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mood'
  }]
});

var therapistSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: String,
  fullname: {
    type: String,
    required: true
  },
  patients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient'
  }],
  email: {
    type: String,
    required: true
  }
});

var moodSchema = mongoose.Schema({
  title: String,
  rating: Number,
  date: Date,
  description: String,
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient'
  }
})


var Patient = mongoose.model('Patient', patientSchema);
var Therapist = mongoose.model('Therapist', therapistSchema);
var Mood = mongoose.model('Mood', moodSchema);

module.exports = {
  Patient: Patient,
  Therapist: Therapist,
  Mood: Mood
}
