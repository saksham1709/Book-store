const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const router = express.Router();
const { orderPlaced } = require("../controller/orderController");

router.post('/order', orderPlaced);
// router.post('/order', checkAuth, orderPlaced);

module.exports = router;