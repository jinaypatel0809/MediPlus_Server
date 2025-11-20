const express = require('express');
const router = express.Router();
const adminLaboratoryController = require('../controllers/adminLaboratoryController');

// Admin can view all laboratory reports
router.get('/laboratoryList', adminLaboratoryController.getAllLaboratoryReports);

module.exports = router;
