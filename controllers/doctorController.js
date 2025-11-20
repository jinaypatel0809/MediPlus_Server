// controllers/doctorController.js
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

// Get appointments for a doctor
const getAppointmentsByDoctor = async (req, res) => {
    try {
      const { doctorid } = req.query;
  
      if (!doctorid) {
        return res.status(400).json({ error: "Doctor ID is required" });
      }
  
      const appointments = await Appointment.find({ doctorid });
  
      res.json(appointments);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      res.status(500).json({ error: err.message });
    }
  };
  


  // Update Appointment Status


const updateAppointmentStatus = async (req, res) => {
  const { appointmentId } = req.params;
const { action } = req.query;

try {
  const newStatus = action === 'approve' ? 'approved' : 'rejected';
  const result = await Appointment.findByIdAndUpdate(
    appointmentId,
    { status: newStatus },
    { new: true }
  );

  if (!result) {
    return res.status(404).json({ error: "Appointment not found" });
  }

  res.json({ success: true, message: `Appointment ${newStatus}`, updatedAppointment: result });
} catch (err) {
  console.error("Update error:", err);
  res.status(500).json({ error: 'Failed to update appointment status' });
}

};



// Get doctor details
const getDoctorDetails = async (req, res) => {
  try {
    const { doctorid } = req.query;
    const doctor = await Doctor.findOne({ doctorid });
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    res.json([doctor]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllDoctors = async (req, res) => {
    try {
      const doctors = await Doctor.find();
      res.json(doctors);  // return list directly
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


// Fetch all pending appointments for a doctor
const getPendingAppointments = async (req, res) => {
    const { doctorid } = req.query;

    try {
        const appointments = await Appointment.find({ doctorid, status: 'pending' });
        res.status(200).json(appointments);
    } catch (error) {
        console.error("Error fetching pending appointments:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Fetch all non-pending appointments
const getDoctorAppointments = async (req, res) => {
    const { doctorId } = req.params;

    try {
        const appointments = await Appointment.find({
            doctorid: doctorId,
            status: { $in: ['approved', 'rejected'] }
        });
        res.status(200).json(appointments);
    } catch (error) {
        console.error("Error fetching doctor appointments:", error);
        res.status(500).json({ message: "Server error" });
    }
};



const addDoctor = async (req, res) => {
  try {
    const {
      doctorname,
      specialty,
      experience,
      fees,
      details,
      degree,
      email,
      password
    } = req.body;

    // Check for file
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    // Generate doctorid based on timestamp
    const doctorid = Date.now().toString();

    // Construct full image URL (make sure static serving is enabled)
    const image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    const newDoctor = new Doctor({
      doctorid,
      doctorname,
      specialty,
      experience,
      fees,
      details,
      degree,
      email,
      password,
      image
    });

    await newDoctor.save();
    res.status(201).json({ message: "Doctor added successfully" });

  } catch (error) {
    console.error("Error adding doctor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const deleteDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const result = await Doctor.findByIdAndDelete(doctorId);

    if (!result) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const updatedList = await Doctor.find();
    res.status(200).json(updatedList);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting doctor', error });
  }
};

module.exports = {getAppointmentsByDoctor, updateAppointmentStatus, getDoctorDetails, getAllDoctors,  getPendingAppointments,
    getDoctorAppointments, addDoctor, deleteDoctor};
