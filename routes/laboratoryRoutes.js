const laboratoryController = require('../controllers/laboratoryController');

const express = require('express');
const router = express.Router();
const upload = require('../middlewear/upload');


// Route
router.post('/userlab', upload.single('prescription'), laboratoryController.storeLaboratory);
router.get('/userlab/:userid', laboratoryController.getLabAppointments);


module.exports = router;