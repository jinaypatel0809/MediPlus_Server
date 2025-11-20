const medicalStaffOrder = require("../models/medicalOrderModel");

const getOrders = async (req, res) => {
  try {
    // Fetch all orders
    const orders = await medicalStaffOrder.find({});
    
    return res.status(200).json({
      success: true,
      orders: orders,  
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Error fetching orders" });
  }
};

const updateOrderStatus = async (req, res) => {
  const { order_id, action } = req.query;

  try {
    // Validate action
    if (!["approve", "reject"].includes(action)) {
      return res.status(400).json({ message: "Invalid action" });
    }

    // Find and update the order
    const order = await medicalStaffOrder.findOne({ order_id });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.order_status = action === "approve" ? "approved" : "rejected";
    await order.save();

    res.json({ success: true, message: `Order ${action}d successfully` });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Error updating order status" });
  }
};

const getCompletedOrders = async (req, res) => {
    try {
        const completedOrders = await medicalStaffOrder.find({
            order_status: { $in: ['approved', 'rejected'] }
        });
        res.status(200).json(completedOrders);
    } catch (error) {
        console.error("Error fetching completed orders:", error);
        res.status(500).json({ message: "Server error fetching completed orders" });
    }
};

module.exports = {
  getOrders,
  updateOrderStatus,
  getCompletedOrders,
};
