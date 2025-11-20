const ContactMessage = require("../models/contactMessage")

 const submitContactMessage = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newMessage = new contactMessage({ name, email, phone, message });
    await newMessage.save();

    res.status(201).json({ message: "Message sent successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

const getAllMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages.", error: error.message });
  }
};

module.exports = {submitContactMessage, getAllMessages};