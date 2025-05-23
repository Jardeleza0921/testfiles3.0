import React from 'react';
import ProductCard from './ProductCard';

const ShopSection = ({ updateCart }) => {
  const products = [
    { id: 1, name: 'Elegant laptop Bag', price: 59.99, image: 'images/placeholder1.jpg' },
    { id: 2, name: 'Classic Leather bag', price: 89.50, image: 'images/placeholder2.jpg' },
    { id: 3, name: 'Stylish backpack', price: 34.00, image: 'images/placeholder3.jpg' },
    { id: 4, name: 'Travel Duffle Bag', price: 75.00, image: 'images/placeholder4.jpg' },
    { id: 5, name: 'Compact Sling Bag', price: 25.99, image: 'images/placeholder5.jpg' },
  ];

  const handleAddToCart = (product) => {
    updateCart(product); // This now handles quantity increment in App.js
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Our Shop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default ShopSection;