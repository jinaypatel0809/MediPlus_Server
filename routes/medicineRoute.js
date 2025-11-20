const express = require("express");
const router = express.Router();
const Medicine = require("../models/Medicine");
const multer = require("multer");
// const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");


// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage: storage });

// POST /api/medicine/add
router.post("/add", upload.single("uploaded_file"), async (req, res) => {
  try {
    const { medicinename, medicineprice, medicinetype, medicinedetail } = req.body;
    const image = req.file.filename;

    const newMedicine = new Medicine({
      medicinename,
      medicineprice,
      medicinetype,
      medicinedetail,
      image,
    });

    await newMedicine.save();
    res.status(201).json({ message: "Medicine added successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add medicine" });
  }
});
// GET /api/medicine
router.get("/", async (req, res) => {
    try {
      const medicines = await Medicine.find();
      const baseUrl = "http://localhost:5000/uploads/";
  
      const response = medicines.map((medicine) => ({
        ...medicine._doc,
        medicineimage: baseUrl + medicine.image, // Attach full image URL
        medicineid: medicine._id,
      }));
  
      res.status(200).json(response);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch medicines" });
    }
  });
  router.get("/", async (req, res) => {
    try {
      const medicine = await Medicine.find();
      res.status(200).json(medicine);
    } catch (error) {
      console.error("Error fetching medicine:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
module.exports = router;
