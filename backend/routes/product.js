const express = require('express');
const router = express.Router();
const { createProduct, updateProduct, deleteProduct, getProduct, getAllProduct } = require('../controller/product.js');
const Product = require('../models/Product.js')
router.get('/getAllProducts', getAllProduct);
router.get('/getProduct/:id', getProduct);
router.post('/createProduct', createProduct);
router.put('/updateProduct/:id', updateProduct);
router.delete('/deleteProduct/:id', deleteProduct); // Add route for deleting products
router.get('/product/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findById(productId);  // Assuming you're using Mongoose
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch product details" });
    }
});

module.exports = router;
