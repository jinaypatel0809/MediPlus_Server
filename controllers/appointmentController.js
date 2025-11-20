

const Appointment = require("../models/Appointment");

const bookAppointment = async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json({ success: true, message: "Appointment booked successfully." });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ success: false, message: "Failed to book appointment." });
  }
};


const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET - Fetch appointments by user id
const getAppointmentsByUser = async (req, res) => {
  try {
    const { userid } = req.params;
    const appointments = await Appointment.find({ userid });
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching user appointments:", error);
    res.status(500).json({ success: false, message: "Server error while fetching user appointments." });
  }
};

// GET - Fetch appointments by doctor id
const getAppointmentsByDoctor = async (req, res) => {
  try {
    const { doctorid } = req.query;

    const appointments = await Appointment.find({ doctorid });

    res.json(appointments);
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// PUT - Update appointment status
const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedAppointment = await Appointment.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedAppointment) {
      return res.status(404).json({ success: false, message: "Appointment not found." });
    }

    res.status(200).json({ success: true, message: "Appointment status updated.", appointment: updatedAppointment });
  } catch (error) {
    console.error("Error updating appointment status:", error);
    res.status(500).json({ success: false, message: "Server error while updating status." });
  }
};

// routes/appointments.js


const updateFeesPaidStatus = async (req, res) => {
  try {
    const { _id } = req.body;
    const updated = await Appointment.findByIdAndUpdate(
        _id,
        { fees_paid: true },
        { new: true }
    );

    if (!updated) {
        return res.status(404).json({ status: "error", message: "Appointment not found" });
    }

    res.json({ status: "success", data: updated });
} catch (error) {
    console.error("Update error", error);
    res.status(500).json({ status: "error", message: "Server error" });
}
};



module.exports = {
  bookAppointment,
  getAllAppointments,
  getAppointmentsByUser,
  getAppointmentsByDoctor,
  updateAppointmentStatus,
  updateFeesPaidStatus,
};
