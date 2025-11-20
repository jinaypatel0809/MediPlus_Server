const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  medicinename: String,
  medicineprice: Number,
  medicinetype: String,
  medicinedetail: String,
  image: String, // filename of uploaded image
}, { collection: 'medicine' }); 

module.exports = mongoose.model("Medicine", medicineSchema);
