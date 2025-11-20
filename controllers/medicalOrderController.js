const MedicineOrder = require("../models/medicalOrderModel");

// Place new medicine order
const placeOrder = async (req, res) => {
  try {
    const { order_id, username, useraddress, cartItems, totalAmount, userid } = req.body;


    const order = new MedicineOrder({
      order_id,
      username,
      useraddress,
      cartItems,
      totalAmount,
      userid,
    });

    const savedOrder = await order.save();

    res.status(200).json({ success: true, message: "Order placed successfully!", order: savedOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: "Failed to place order." });
  }
};

// Get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await MedicineOrder.find();
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders." });
  }
};

// Approve order
const approveOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await MedicineOrder.findByIdAndUpdate(id, { order_status: "approved" });
    res.status(200).json({ success: true, message: "Order approved successfully!" });
  } catch (error) {
    console.error("Error approving order:", error);
    res.status(500).json({ success: false, message: "Failed to approve order." });
  }
};

// Reject order
const rejectOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await MedicineOrder.findByIdAndUpdate(id, { order_status: "rejected" });
    res.status(200).json({ success: true, message: "Order rejected successfully!" });
  } catch (error) {
    console.error("Error rejecting order:", error);
    res.status(500).json({ success: false, message: "Failed to reject order." });
  }
};


const getOrdersByUser = async (req, res) => {
  try {
    const userid = req.query.userid;

    if (!userid) {
      return res.status(400).json({ success: false, message: "Missing userid" });
    }

    const orders = await MedicineOrder.find({ userid });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders by user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



module.exports = {
  placeOrder,
  getOrders,
  approveOrder,
  rejectOrder,
  getOrdersByUser,
};
