const Registration = require("../models/Registration");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require('fs');


const SECRET_KEY = process.env.JWT_SECRET_KEY || "your-default-secret-key";

const registerUser = async (req, res) => {
  try {
    const {
      username,
      useremail,
      userpassword,
      usermobile,
      useraddress,
      userpincode,
      userstate,
      usercity,
    } = req.body;

    const existingUser = await Registration.findOne({ useremail });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(userpassword, 10);

    const newUser = new Registration({
      username,
      useremail,
      userpassword: hashedPassword,
      usermobile,
      useraddress,
      userimage: req.file ? req.file.path : null,
      userpincode,
      userstate,
      usercity,
    });

    await newUser.save();

    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ success: false, message: "Server error during registration", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { useremail, userpassword } = req.body;

    const user = await Registration.findOne({ useremail });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(userpassword, user.userpassword);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      userid: user._id.toString(),
      _id: user._id.toString(),
      username: user.username,
      useremail: user.useremail,
      usermobile: user.usermobile,
      useraddress: user.useraddress,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Server error during login" });
  }
};

const getUserProfile = async (req, res) => {
    try {
      const user = await Registration.findById(req.params.id);
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      res.status(200).json({
        success: true,
        data: {
          userimage: user.userimage,
          username: user.username,
          useremail: user.useremail,
          usermobile: user.usermobile,
          useraddress: user.useraddress,
          usercity: user.usercity,
          userstate: user.userstate,
          userpincode: user.userpincode,
        },
      });
    } catch (error) {
      console.error("Error getting user profile:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  

const updateUserProfile = async (req, res) => {
    try {
      const userId = req.params.id;
      const {
        username,
        useremail,
        usermobile,
        useraddress,
        usercity,
        userstate,
        userpincode,
      } = req.body;
  
      const user = await Registration.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      // If a new image is uploaded
      if (req.file) {
        // Delete old image file if exists
        if (user.userimage && fs.existsSync(user.userimage)) {
          fs.unlinkSync(user.userimage);
        }
        user.userimage = req.file.path; // Update with new file path
      }
  
      // Update other fields
      user.username = username || user.username;
      user.useremail = useremail || user.useremail;
      user.usermobile = usermobile || user.usermobile;
      user.useraddress = useraddress || user.useraddress;
      user.usercity = usercity || user.usercity;
      user.userstate = userstate || user.userstate;
      user.userpincode = userpincode || user.userpincode;
  
      const updatedUser = await user.save();
  
      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  };

  module.exports = {registerUser, loginUser, getUserProfile, updateUserProfile};
