const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  doctorid: { type: String, required: true, unique: true },
  doctorname: { type: String, required: true },
  specialty: { type: String, required: true },
  experience: { type: String, required: true },
  fees: { type: String, required: true },
  details: { type: String, required: true },
  degree: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Doctor", DoctorSchema);
