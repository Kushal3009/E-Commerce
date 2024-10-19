import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CartCanvas = ({ isOpen, toggleCart }) => {
    const [cartItems, setCartItems] = useState([]); // State to store cart items
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCartItems = async () => {
            if (isOpen) {
                try {
                    const response = await fetch("http://localhost:3000/cart/getAllCart", {
                        method: "GET",
                        credentials: "include", // Include cookies in the request
                    });

                    if (!response.ok) {
                        throw new Error("Unauthorized");
                    }

                    const data = await response.json(); // Parse the JSON data
                    setCartItems(data); // Set the cart items
                } catch (error) {
                    console.error("Error fetching cart items:", error);
                }
            }
        };

        fetchCartItems(); // Call the async function
    }, [isOpen]);

    const handleQuantityChange = async (itemId, change) => {
        // Update the quantity in the local state
        setCartItems((prevItems) =>
            prevItems.map((item) => {
                if (item._id === itemId) {
                    const newQuantity = item.quantity + change;
                    return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 }; // Prevent quantity from going below 1
                }
                return item;
            })
        );

        // Update the quantity in the database
        try {
            const response = await fetch(`http://localhost:3000/cart/updateQuantity/${itemId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ change }), // Send the change (increment or decrement)
                credentials: "include", // Include cookies in the request
            });

            if (!response.ok) {
                throw new Error("Failed to update quantity");
            }

            const data = await response.json(); // You can use the updated cart data from the response if needed
            alert("Quantity updated Successfully");
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    const handleRemoveItem = async (itemId) => {
        try {
            const response = await fetch(`http://localhost:3000/cart/remove/${itemId}`, {
                method: "DELETE",
                credentials: "include", // Include cookies in the request
            });

            if (!response.ok) {
                throw new Error("Unauthorized");
            }

            const data = await response.json();
            alert(data.message); // Show a success message
            setCartItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
        } catch (error) {
            console.error("Error removing cart item:", error);
        }
    };

    const handleBuyNow = async () => {
        // Close the cart canvas
        toggleCart();

        // Navigate to the order summary page, passing the cart items
        navigate('/order-summary', { state: { cartItems } });
    };



    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-20" onClick={toggleCart} />
            )}
            <div
                className={`fixed right-0 top-0 h-full w-96 bg-white shadow-lg z-30 transform ${isOpen ? "translate-x-0" : "translate-x-full"
                    } transition-transform duration-300 ease-in-out`}
            >
                <div className="p-4 flex justify-between items-center border-b">
                    <h2 className="text-2xl font-bold">Your Cart</h2>
                    <button className="text-gray-600 hover:text-gray-900 text-3xl" onClick={toggleCart}>
                        &times;
                    </button>
                </div>
                <div className="p-4 overflow-y-auto h-[calc(100%-80px)]"> {/* Adjust height for scrolling */}
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <div key={item._id} className="flex items-center justify-between mb-4">
                                <div className="flex flex-col">
                                    <h3 className="font-semibold" style={{ height: "30px", overflow: "hidden" }}>{item.product.title}</h3>
                                    <p>Price: ₹{item.product.price}</p>
                                    <div className="flex items-center">
                                        <button onClick={() => handleQuantityChange(item._id, -1)} className="px-2 py-1 bg-gray-300 hover:bg-gray-400 rounded">-</button>
                                        <span className="mx-2">{item.quantity}</span>
                                        <button onClick={() => handleQuantityChange(item._id, 1)} className="px-2 py-1 bg-gray-300 hover:bg-gray-400 rounded">+</button>
                                    </div>
                                </div>
                                <img src={item.product.image} alt={item.product.title} className="w-16 h-16 object-cover" />

                                <button onClick={() => handleRemoveItem(item._id)} className="ml-4 text-red-500 hover:text-red-700">Remove</button>
                            </div>
                        ))
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                    <div className="p-4">
                        {cartItems.length > 0 && (
                            <button
                                onClick={handleBuyNow}
                                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
                            >
                                Buy Now
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartCanvas;
