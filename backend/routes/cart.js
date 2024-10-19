const express = require('express');
const router = express.Router();
const { addToCart, getAllCart, removeFromCart, updateQuantity } = require('../controller/cart.js');
const authenticateToken = require('../middleware/checkAuth.js');  // Import authenticateToken correctly

router.post('/addToCart/:id', authenticateToken, addToCart);  // Add to cart route
router.get('/getAllCart', authenticateToken, getAllCart);
router.delete("/remove/:id", authenticateToken, removeFromCart);
router.put("/updateQuantity/:id",authenticateToken, updateQuantity )
module.exports = router;
