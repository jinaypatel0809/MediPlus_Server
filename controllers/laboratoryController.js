const laboratoryModel = require("../models/laboratoryModel");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const storeLaboratory = async (req, res) => {
    try {
        const { name, phone, address, message, userid } = req.body;
        const prescriptionPath = req.file.path;

        const labEntry = new laboratoryModel({
            name,
            phone,
            address,
            prescription: prescriptionPath,
            message,
            userid
        });

        await labEntry.save();
        res.status(200).json({ message: 'Uploaded successfully', data: labEntry });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getLabAppointments = async (req, res) => {
    try {
        const { userid } = req.params;
        const labAppointments = await laboratoryModel.find({ userid: userid });
        res.status(200).json(labAppointments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports = {
    storeLaboratory, getLabAppointments
};

