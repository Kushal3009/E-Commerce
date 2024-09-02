// src/components/Product.jsx
import React from "react";

const Product = () => {
  return (
    <div className="bg-gray-100 py-20">
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap items-center">
          <div className="w-full md:w-1/2 bg-white">
            <img
              src="Gas/image2.jpeg"
              alt="Product Image"
              className="w-full h-80 object-contain"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold uppercase">Brand Name</h2>
            <h3 className="text-4xl font-semibold">The Catcher in the Rye</h3>
            <div className="flex items-center my-2">
              <div className="flex text-2xl font-bold text-yellow-500">
                <span>★★★★☆</span>
              </div>
              <span className="ml-2 text-gray-600 text-xl font-bold">
                4 Reviews
              </span>
            </div>
            <ul className="text-gray-700 my-4 list-disc pl-5 space-y-2">
              <li className="text-xl">Fam locavore kickstarter distillery</li>
              <li className="text-xl">
                Mixtape chillwave tumeric sriracha taximy chia microdosing tilde
                DIY
              </li>
              <li className="text-xl">
                XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn
              </li>
              <li className="text-xl">
                Everyday carry +1 seitan poutine tumeric
              </li>
              <li className="text-xl">
                Gastropub blue bottle austin listicle pour-over, neutra jean
                shorts keytar banjo tattooed umami cardigan
              </li>
            </ul>
            <div className="flex items-center my-4">
              <span className="mr-2">Color:</span>
              <div className="flex space-x-2">
                <span className="w-6 h-6 bg-blue-500 rounded-full"></span>
                <span className="w-6 h-6 bg-purple-500 rounded-full"></span>
                <span className="w-6 h-6 bg-gray-500 rounded-full"></span>
              </div>
            </div>
            <div className="flex items-center my-4">
              <span className="mr-2">Size:</span>
              <select className="border border-gray-300 rounded p-2">
                <option>S</option>
                <option>M</option>
              </select>
            </div>
            <div className="flex gap-3">
              <div className="text-2xl font-bold py-2">$58.00</div>
              <button className="bg-blue-500 text-white px-3 rounded text-xl py-2">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
