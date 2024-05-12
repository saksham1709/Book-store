const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const { cartFetch, cartAdd, cartUpdate, cartRemove } = require("../controller/cartController");
const router = express.Router();

// Fetch a cart
router.get('/:userId', checkAuth, cartFetch);

// Add to cart
router.post('/add', checkAuth, cartAdd);

// Update cart
router.put('/update', checkAuth, cartUpdate);

// Remove from cart
router.delete('/remove', checkAuth, cartRemove);

module.exports = router;