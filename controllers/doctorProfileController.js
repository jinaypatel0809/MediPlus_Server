// controllers/doctorController.js
const Doctor = require("../models/Doctor");
const path = require("path");
const fs = require("fs");



const getDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ doctorid: req.query.doctorid });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json(doctor);
  } catch (err) {
    console.error("Error fetching doctor:", err);
    res.status(500).json({ message: "Server error" });
  }
};


const updateDoctor = async (req, res) => {
    try {
      const { doctorid } = req.body;
  
      let updatedFields = { ...req.body };
  
      // Handle uploaded image
      if (req.file) {
        updatedFields.image = `http://localhost:5000/uploads/${req.file.filename}`;
      }
  
      const updatedDoctor = await Doctor.findOneAndUpdate(
        { doctorid },
        updatedFields,
        { new: true }
      );
  
      if (!updatedDoctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }
  
      res.json({ message: "Doctor updated successfully", doctor: updatedDoctor });
    } catch (err) {
      console.error("Error updating doctor:", err);
      res.status(500).json({ message: "Server error" });
    }
  };
  
module.exports = {getDoctor, updateDoctor};
