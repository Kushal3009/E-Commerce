const Cart = require('../models/Cart.js');  // Import Cart model correctly
const addToCart = async (req, res) => {
    try {
        const productId = req.params.id;
        const userId = req.userId;

        let cartItem = await Cart.findOne({ user: userId, product: productId });

        if (cartItem) {
            cartItem.quantity += 1; // Increment quantity
        } else {
            cartItem = new Cart({
                user: userId,
                product: productId,
                quantity: 1,
            });
        }

        await cartItem.save();
        res.json({ msg: "Product added to cart successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add product to cart" });
    }
};

const getAllCart = async (req, res) => {
    const userId = req.userId; // Get the user ID from the token

    try {
        // Find all cart items for the user and populate product details
        const cartItems = await Cart.find({ user: userId }).populate('product');

        // Extract only product details from the cart items
        const products = cartItems.map(item => item.product);

        // Send the retrieved product details as a response
        res.json(products);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: "Failed to retrieve cart items" }); // Send an error response
    }
}


module.exports = { addToCart, getAllCart };
