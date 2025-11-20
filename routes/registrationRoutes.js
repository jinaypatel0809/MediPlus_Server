const express = require("express");
const router = express.Router();

const upload = require("../middlewear/upload"); 

const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/registrationController");

// Routes
router.post("/", upload.single("userimage"), registerUser);
router.post("/login", loginUser);
router.get("/profile/:id", getUserProfile);
router.put("/profile/:id", upload.single("userimage"), updateUserProfile);

module.exports = router;
