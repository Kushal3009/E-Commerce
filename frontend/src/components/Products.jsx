import React, { useState } from "react";
import products from "./products.json";
import ProductSortList from "./ProductSortList";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto py-10">
      <div className="container mx-auto px-4">
        <div>
          <div>
            <div>
              <h1 className="text-4xl font-bold text-center mb-8">
                Products
              </h1>
            </div>
          </div>

          <div>
            <ProductSortList
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={product.imgSrc}
                alt={product.altText}
                className="w-full h-64 object-contain p-4"
              />
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-2">{product.label}</h2>
                <p className="text-green-600 font-bold mb-4">{product.price}</p>
                <a
                  href={`/products/${product.id}`}
                  className="text-blue-500 hover:underline"
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
