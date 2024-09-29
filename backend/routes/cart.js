const express = require('express');
const router = express.Router();
const { addToCart,getAllCart } = require('../controller/cart.js');
const authenticateToken = require('../middleware/checkAuth.js');  // Import authenticateToken correctly
router.post('/addToCart/:id', authenticateToken, addToCart);  // Add to cart route
router.get('/getAllCart', authenticateToken, getAllCart);



module.exports = router;
