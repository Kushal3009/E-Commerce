const express = require('express');
const router = express.Router();
const { createProduct, updateProduct, deleteProduct,getProduct, getAllProduct } = require('../controller/product.js');

router.get('/getAllProducts', getAllProduct);
router.get('/getProduct/:id', getProduct);
router.post('/createProduct', createProduct);
router.put('/updateProduct/:id', updateProduct);
router.delete('/deleteProduct/:id', deleteProduct); // Add route for deleting products

module.exports = router;
