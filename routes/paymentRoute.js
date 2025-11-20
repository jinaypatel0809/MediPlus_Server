const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

// Route to update payment status
router.post("/update-payment-status", paymentController.updatePaymentStatus);

// Route to create a new order after payment
router.post("/create-order", paymentController.createOrder);

module.exports = router;

