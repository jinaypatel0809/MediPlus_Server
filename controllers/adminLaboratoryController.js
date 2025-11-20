const laboratoryModel = require("../models/laboratoryModel");

const getAllLaboratoryReports = async (req, res) => {
    try {
        const reports = await laboratoryModel.find();
        res.status(200).json(reports);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllLaboratoryReports
};
