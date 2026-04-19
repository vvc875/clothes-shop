const express = require("express");
const router = express.Router();
const {
    getOrders,
    updateOrderStatus,
} = require("../controllers/orderController");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").get(protect, admin, getOrders);
router.route("/:id/status").put(protect, admin, updateOrderStatus);

module.exports = router;
