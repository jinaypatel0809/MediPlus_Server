const express = require("express");
const router = express.Router();
const medicineOrderController = require("../controllers/medicalOrderController");

// Routes
router.post("/placeorder", medicineOrderController.placeOrder);
router.get("/orders", medicineOrderController.getOrders);
router.patch("/approve/:id", medicineOrderController.approveOrder);
router.patch("/reject/:id", medicineOrderController.rejectOrder);
router.get("/userOrders", medicineOrderController.getOrdersByUser);

module.exports = router;
