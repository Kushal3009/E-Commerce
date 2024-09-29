import React, { useEffect, useState } from "react";
import ProductSortList from "./ProductSortList";

const Products = () => {
  const [products, setProducts] = useState([]);  // State to store products
  const [loading, setLoading] = useState(true);  // State to handle loading
  const [error, setError] = useState(null);      // State to handle errors
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isAddingToCart, setIsAddingToCart] = useState(false);


  // Fetch products from the backend when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/product/getAllProducts');  // Replace with your actual API endpoint

        // Check if the request was successful
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();  // Parse JSON data
        setProducts(data);  // Store fetched products in state
        setLoading(false);  // Set loading to false after data is fetched
      } catch (err) {
        setError(err.message);  // Handle error
        setLoading(false);
      }
    };

    fetchProducts();  // Call the function to fetch products
  }, []);

  // Function to handle adding product to cart
  const handleAddToCart = async (productId) => {
    setIsAddingToCart(true);  // Set loading state
    try {
      const response = await fetch(`http://localhost:3000/cart/addToCart/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'  // Include credentials (cookies) in the request
      });

      if (!response.ok) {
        throw new Error('Failed to add product to cart');
      }

      const data = await response.json(); // Get response data
      alert(data.msg); // Use the message from response
    } catch (err) {
      console.error(err.message);
      alert('Error adding product to cart');
    } finally {
      setIsAddingToCart(false);  // Reset loading state
    }
  };




  // Filter products based on the selected category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-10">
      <div className="container mx-auto px-4">
        <div>
          <div>
            <div>
              <h1 className="text-4xl font-bold text-center mb-8">Products</h1>
            </div>
          </div>

          {/* Product Sorting Component */}
          <div>
            <ProductSortList
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
        </div>

        {/* Displaying the filtered products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product._id}  // Use _id for MongoDB object id
              className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={product.image}
                alt={product.altText}
                className="w-full h-64 object-contain p-4"
              />
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-2" style={{ height: "60px", overflow: "hidden" }}>{product.description}</h2>
                <p className="text-green-600 text-2xl font-bold mb-2">Price ₹{product.price}</p>

                {/* Displaying the product rating and total ratings */}
                <div className="flex items-center mb-4 text-lg">
                  <span className="text-yellow-500">
                    {'★'.repeat(Math.round(product.rating))} {/* Display star rating */}
                  </span>
                  <span className="ml-2 text-gray-600">({product.total_rating})</span>
                </div>

                {/* Add to Cart Button */}
                <button
                  className={`bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 w-full ${isAddingToCart ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => handleAddToCart(product._id)}
                  disabled={isAddingToCart} // Disable while adding
                >
                  {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                </button>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
