
const express = require("express");
const router = express.Router();
const upload = require('../middlewear/upload');

const doctorProfileController = require("../controllers/doctorProfileController");


// Routes
router.get("/doctor", doctorProfileController.getDoctor);
router.post("/doctor/update", upload.single("uploaded_file"), doctorProfileController.updateDoctor);

module.exports = router;
