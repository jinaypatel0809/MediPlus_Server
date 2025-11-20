const laboratoryModel = require("../models/laboratoryModel");

// Laboratory: View Pending Reports
const getPendingReports = async (req, res) => {
    try {
        const reports = await laboratoryModel.find({
            status: { $nin: ["Completed", "Cancelled"] }
        });
        res.status(200).json(reports);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Laboratory: Update Report Status
const updateReportStatus = async (req, res) => {
    try {
        const { casenum, action } = req.query;

        let status = "";
        if (action === "approve") status = "Completed";
        else if (action === "reject") status = "Cancelled";
        else return res.status(400).json({ error: "Invalid action" });

        const report = await laboratoryModel.findOneAndUpdate(
            { _id: casenum },
            { status: status },
            { new: true }
        );

        if (!report) {
            return res.status(404).json({ error: "Lab report not found" });
        }

        res.status(200).json({ message: "Status updated successfully", data: report });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getLabReportsStatus = async (req, res) => {
    try {
        const reports = await laboratoryModel.find({ status: { $in: ["Completed", "Cancelled"] } });
        res.status(200).json(reports);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports = { getPendingReports, updateReportStatus, getLabReportsStatus };
