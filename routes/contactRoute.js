const express = require("express");
const ContactController = require("../controllers/contactController");

const router = express.Router();

// POST: Submit contact form
router.post("/contact", ContactController.submitContactMessage);

// GET: Admin - fetch all contact messages
router.get("/contact", ContactController.getAllMessages);  // Protect this route if needed

module.exports = router;
