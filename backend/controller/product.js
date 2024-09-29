const Product = require("../models/Product.js");
const mongoose = require("mongoose");
// Create a new product
const createProduct = async (req, res) => {
  try {
    const product = req.body;
    console.log(product);
    const newProduct = new Product(product);
    await newProduct.save();
    res.json({ message: "Product added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding product" });
  }
};

// Update an existing product
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    console.log("Product ID:", productId); // Log to see if the ID is correct

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const updatedProduct = req.body;
    const product = await Product.findByIdAndUpdate(productId, updatedProduct, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating product" });
  }
};

// Delete an existing product
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting product" });
  }
};

const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    console.log("Product ID:", productId); // Log to see if the ID is correct

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error in Get product" });
  }
};


const getAllProduct = async (req, res) => {
  try {
    // Fetch all products where is_visible is true
    const products = await Product.find({ });

    // If no products are found, return a 404 status
    if (products.length === 0) {
      return res.status(404).json({ message: "No visible products found" });
    }

    // Return the list of visible products
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products", error });
  }
};


module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProduct
};
