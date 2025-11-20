const express = require("express");
const router = express.Router();
const laboratoryStaffController = require("../controllers/laboratoryStaffController");

// Laboratory Staff Routes
router.get("/labShow", laboratoryStaffController.getPendingReports);
router.get("/labapprove", laboratoryStaffController.updateReportStatus);
router.get('/labStatusShow', laboratoryStaffController.getLabReportsStatus);

module.exports = router;
