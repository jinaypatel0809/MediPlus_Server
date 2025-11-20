const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const Admin = require('../models/Admin');
const Doctor = require('../models/Doctor');
const Lablogin = require('../models/Lablogin');
const Medicallogin = require('../models/Medicallogin');

router.post('/login', async (req, res) => {
    const { email, password, type } = req.body;

    try {
        let userModel, sessionKey;

        // Determine user model and session key based on user type
        switch (type) {
            case 'a':
                userModel = Admin;
                sessionKey = 'adminid';
                break;
            case 'd':
                userModel = Doctor;
                sessionKey = 'doctorid';
                break;
            case 'l':
                userModel = Lablogin;
                sessionKey = 'labid';
                break;
            case 'm':
                userModel = Medicallogin;
                sessionKey = 'medicalid';
                break;
            default:
                return res.json({ success: false, message: "Invalid user type" });
        }

        // Find the user by email
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "Invalid email or password" });
        }

        // Check if the plain text password matches the stored password
        if (password === user.password) {
            return res.json({
                success: true,
                [sessionKey]: user._id, // This is the user ID (doctorid, adminid, etc.)
                doctorid: user.doctorid, // Ensure the correct doctor ID (or respective ID) is included
                id: user._id
            });
        } else {
            return res.json({ success: false, message: "Invalid email or password" });
        }

    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;
