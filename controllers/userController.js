const Registration = require("../models/Registration");

const getAllUsers = async (req, res) => {
    try {
        const users = await Registration.find({}, "-userpassword");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user data", error });
    }
};

module.exports = {
    getAllUsers,
};
