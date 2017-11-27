var mongoose = require('mongoose');
var connect = process.env.MONGODB_URI;

mongoose.connect(connect);

var userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: String,
  fullname: {
    type: String,
    required: true
  },
  therapist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Therapist'
  },
  dob: {
    type: Date,
    required: true
  }
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
    ref: 'User'
  }],
  email: {
    type: String,
    required: true
  },
});

var moodSchema = mongoose.Schema({
  code: Number,
  date: Date,
  description: String
})


var User = mongoose.model('User', userSchema);
var Therapist = mongoose.model('Therapist', therapistSchema);
var Mood = mongoose.model('Mood', moodSchema);

module.exports = {
  User: User,
  Therapist: Therapist,
  Mood: Mood
}
