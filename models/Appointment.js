const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  userid: String,
  appname: String,
  appemail: String,
  appdate: String,
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  appdoctor: String,
  doctorid: String,
  image: String,
  specialty: String,
  experience: String,
  fees: String,
  fees_paid: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Appointment", appointmentSchema);
