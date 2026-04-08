const express = require("express");
const router = express.Router();
const { getOrders } = require("../controllers/orderController");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").get(protect, admin, getOrders);

module.exports = router;
