const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");
const upload = require("../middlewear/upload");


router.post("/", appointmentController.bookAppointment);
router.get("/",appointmentController.getAllAppointments);
router.get("/user/:userid", appointmentController.getAppointmentsByUser);
router.get("/doctor/:doctorid", appointmentController.getAppointmentsByDoctor);
router.put("/status/:id", appointmentController.updateAppointmentStatus);
router.post('/payment', appointmentController.updateFeesPaidStatus);

module.exports = router;
