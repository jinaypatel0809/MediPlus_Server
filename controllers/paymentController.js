const Order = require("../models/medicalOrderModel");

// Update the payment status and save the order to MongoDB
const updatePaymentStatus = async (req, res) => {
  try {
    const { order_id, status } = req.body;

    const order = await Order.findOneAndUpdate(
      { order_id },
      { payment_status: status }, // Only payment_status is updated here
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found!" });
    }

    res.status(200).json({ message: "Payment status updated", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// Create and save a new order after payment is successful
const createOrder = async (req, res) => {
  try {
    const { order_id, userid, username, useraddress, cartItems, totalAmount } = req.body;

    const newOrder = new Order({
      order_id,
      userid,
      username,
      useraddress,
      cartItems,
      totalAmount,
      payment_status: "paid",
      order_status: "pending"  
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", savedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {updatePaymentStatus , createOrder};
