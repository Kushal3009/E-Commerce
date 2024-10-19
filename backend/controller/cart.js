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


const removeFromCart = async (req, res) => {
    try {
        const cartId = req.params.id;
        const userId = req.userId;
        const cartItem = await Cart.findOneAndDelete({ user: userId, _id: cartId });

        if (!cartItem) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        res.json({ message: "Product removed from cart successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to remove product from cart" });
    }
}


const getAllCart = async (req, res) => {
    const userId = req.userId; // Get the user ID from the token

    try {
        // Find all cart items for the user and populate product details
        const cartItems = await Cart.find({ user: userId }).populate('product');

        // Extract only product details from the cart items
        const products = cartItems.map(item => item.product);

        // Send the retrieved product details as a response
        res.json(cartItems);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: "Failed to retrieve cart items" }); // Send an error response
    }
}


const updateQuantity = async (req, res) => {
    const itemId = req.params.id;
    console.log(itemId);
    const { change } = req.body;

    try {
        // Fetch the cart item by ID
        const cartItem = await Cart.findById(itemId);

        if (!cartItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        // Update the quantity
        cartItem.quantity += change;

        // Prevent quantity from going below 1
        if (cartItem.quantity < 1) {
            cartItem.quantity = 1;
        }

        // Save the updated item back to the database
        await cartItem.save();

        res.json({ message: "Quantity updated successfully", cartItem });
    } catch (error) {
        console.error("Error updating quantity:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { addToCart, getAllCart, removeFromCart, updateQuantity };
