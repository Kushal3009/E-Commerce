// ProductSortList.js
import React from 'react';

const categories = ['All', 'Gas Stove', 'Geyser', 'Mixture', 'Other'];

const ProductSortList = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className='mb-8 flex justify-center'>
      {categories.map(category => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`mx-2 px-4 py-2 rounded ${
            selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default ProductSortList;
