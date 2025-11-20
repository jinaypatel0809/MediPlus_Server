const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  username: String,
  useremail: String,
  userpassword: String,
  usermobile: String,
  useraddress: String,
  userimage: String,
  userpincode: String,
  userstate: String,
  usercity: String
}, {
  collection: "register"
});

module.exports = mongoose.model("Registration", registrationSchema);
