const mongoose = require('mongoose');

const medicalSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

module.exports = mongoose.model('Medicallogin', medicalSchema);
