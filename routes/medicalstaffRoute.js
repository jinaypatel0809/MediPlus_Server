const express = require("express");
const medstaffController = require("../controllers/medstaffController");

const router = express.Router();

// Route to get all orders
router.get("/orders", medstaffController.getOrders);

// Route to update the status of an order
router.get("/orders/update_status", medstaffController.updateOrderStatus);
router.get('/completed_orders', medstaffController.getCompletedOrders);

module.exports = router;
