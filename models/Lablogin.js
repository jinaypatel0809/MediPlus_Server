const mongoose = require('mongoose');

const labSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

module.exports = mongoose.model('Lablogin', labSchema);
