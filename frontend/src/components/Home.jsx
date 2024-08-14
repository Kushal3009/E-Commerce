import React from "react";
import ProductItem from "./ProductItem"; // Import the ProductItem component

const Home = () => {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-black bg-opacity-50">
        <div className="text-white text-center p-8 bg-black bg-opacity-60 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-4">Welcome to Asha Puri Gas</h1>
          <p className="text-xl mb-6">
            Discover the best gas stoves that bring efficiency and elegance to
            your kitchen.
          </p>
          <a
            href="/products"
            className="inline-block px-6 py-3 text-lg font-semibold text-black bg-white rounded-md transition-colors duration-300 hover:bg-gray-200"
          >
            Browse Products
          </a>
        </div>
      </div>
      <ProductItem /> {/* Use the ProductItem component */}
    </>
  );
};

export default Home;
