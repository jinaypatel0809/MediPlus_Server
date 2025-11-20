const mongoose = require("mongoose");

const medicineOrderSchema = new mongoose.Schema({
  order_id: { type: String, required: true },
  userid: { type: String, required: true },
  username: { type: String, required: true },
  useraddress: { type: String, required: true },
  cartItems: [
    {
      medicineid: { type: String, required: true },
      medicinename: { type: String, required: true },
      medicineprice: { type: Number, required: true },
      quantity: { type: Number, required: true },
    }
  ],
  totalAmount: { type: Number, required: true },
//   payment_status: { type: String, default: "Pending" },
  order_status: { type: String,  default: "pending" },
  payment_status: { type: String,enum: ["pending", "paid", "failed"], default: "pending"},
}, { timestamps: true });

module.exports = mongoose.model("order", medicineOrderSchema);
