import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion from Framer Motion
import Cookies from 'js-cookie';

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState(0);  // Initialize as a number
  const navigate = useNavigate();

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/product/product/${productId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Fetch comments for the product
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:3000/comment/getComments/${productId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }
        const comments = await response.json();
        setComments(comments);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchComments();
  }, []); // Remove `comments` dependency to avoid infinite loop

  // Handle adding a comment
  const handleAddComment = async (productId) => {
    const token = Cookies.get('token');  // Get the token from the cookie
    try {
      if (token) {
        const response = await fetch(`http://localhost:3000/comment/addComment/${productId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,  // Include the token in headers
          },
          credentials: 'include',
          body: JSON.stringify({ content: newComment, rating: rating }),
        });

        if (!response.ok) {
          throw new Error('Failed to add Review');
        }

        const data = await response.json(); // Get response data
        alert(data.msg); // Use the message from response

        // Directly update comments state without refetching
        const newCommentObj = {
          _id: data.commentId,  // Assuming server returns the new comment ID
          user: { username: "You" },  // Use current user's name
          content: newComment,
          rating: rating
        };
        setComments([...comments, newCommentObj]);  // Add new comment to state
        setNewComment(""); // Clear comment input
        setRating(0); // Reset rating
      } else {
        alert('Please login');
      }
    } catch (err) {
      console.error(err.message);
      alert(err);
    }
  };

  // Handle adding to cart
  const handleAddToCart = async (productId) => {
    try {
      const token = Cookies.get('token');  // Get the token from the cookie
      if (token) {
        const response = await fetch(`http://localhost:3000/cart/addToCart/${productId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,  // Include the token in headers
          },
          credentials: 'include'  // Include credentials (cookies) in the request
        });

        if (!response.ok) {
          throw new Error('Failed to add product to cart');
        }

        const data = await response.json(); // Get response data
        alert(data.msg); // Use the message from response
      } else {
        alert('Please login to add products to cart');
      }
    } catch (err) {
      console.error(err.message);
      alert('Error adding product to cart');
    }
  };

  const handleBuyNow = async () => {
    navigate('/order-summary', { state: { product, quantity } });
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={product.image}
            alt={product.altText}
            className="w-full h-auto object-contain border rounded-lg shadow-md"
          />
        </motion.div>

        {/* Product Details */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-800">{product.title}</h2>
          <p className="text-green-600 text-lg line-through font-semibold mb-4">MRP: ₹{product.MRP}</p>
          <p className="text-green-600 text-md font-semibold mb-4">Discount: {product.discount}%</p>
          <p className="text-green-600 text-2xl font-semibold mb-4">Price: ₹{product.price}</p>

          {/* Product Rating */}
          <div className="flex items-center mb-6">
            <span className="text-yellow-500 text-xl">
              {"★".repeat(Math.round(product.rating))}
            </span>
            <span className="ml-2 text-gray-600 text-lg">({product.total_rating} ratings)</span>
          </div>

          {/* Product Description in Points */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Product Description</h3>
            <ul className="list-disc list-inside space-y-1">
              {product.description.split('\n').map((line, index) => (
                <li key={index} className="text-gray-700">{line}</li>
              ))}
            </ul>
          </div>

          <div className="flex items-center space-x-2">
            <label htmlFor="quantity" className="text-lg font-medium">Quantity</label>
            <button className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={decreaseQuantity}>
              -
            </button>
            <span className="text-lg">{quantity}</span>
            <button className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={increaseQuantity}>
              +
            </button>
          </div>

          {/* Add to Cart and Buy Now Buttons */}
          <div className="mt-6 flex gap-4">
            <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-300" onClick={() => handleAddToCart(product._id)}>Add to Cart</button>
            <button className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600 transition duration-300" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </motion.div>
      </div>

      {/* Comments Section */}
      <div className="mt-10">
        <h3 className="text-3xl font-bold mb-4 underline">Reviews</h3>

        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={comment._id} className="flex flex-col bg-gray-100 p-4 rounded-lg shadow-md">
                <div>
                  <p className="text-gray-700">{comment.user.username}</p>
                </div>
                <div className="flex flex-row justify-between">
                  <div>
                    <p className="text-gray-700">Review:{comment.content}</p>
                  </div>
                  <div>
                    <p className="text-gray-700">{comment.rating}★</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet</p>
          )}
        </div>

        {/* Add Comment Form */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Add Your Review</h3>
          <form className="space-y-4 bg-gray-100 p-6 rounded-lg shadow-md" onSubmit={(e) => { e.preventDefault(); handleAddComment(product._id); }}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md"
              placeholder="Write a comment..."
            />
              <label className="text-lg font-medium">Rating</label>
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                min="1"
                max="5"
                className="w-16 p-2 mx-3 border border-gray-300 rounded-md"
              />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Product;
