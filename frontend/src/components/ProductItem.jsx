import React from 'react';
import { Link } from 'react-router-dom';

const products = [
  { to: '/products', imgSrc: 'Gas/image1.jpeg', altText: 'Product 1', label: 'Product 1' },
  { to: '/products', imgSrc: 'Gas/image2.jpeg', altText: 'Product 2', label: 'Product 2' },
  { to: '/products', imgSrc: 'Gas/image3.jpeg', altText: 'Product 3', label: 'Product 3' },
  { to: '/products', imgSrc: 'Gas/image4.jpeg', altText: 'Product 4', label: 'Product 4' },
];

const ProductItem = () => {
  return (
    <div className="container bg-white flex gap-10 py-10 justify-center min-w-min max-w-full mx-auto">
      {products.map((product, index) => (
        <Link
          key={index}
          to={product.to}
          className="w-72 h-72 border border-4 p-4 flex flex-col items-center justify-center text-center hover:bg-gray-100 transition-colors duration-300"
        >
          <img src={product.imgSrc} alt={product.altText} className="w-full h-3/4 product-image mb-4 object-fill" />
          <span className="text-lg font-semibold">{product.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default ProductItem;
