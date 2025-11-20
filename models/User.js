const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userimage: { type: String }, // store image filename here
  phone: String,
  address: String,
  pincode: String,
  state: String,
  city: String
});

module.exports = mongoose.model('User', userSchema);
