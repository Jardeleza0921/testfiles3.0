import React from 'react';

const HomeSection = () => {
  const featuredBags = [
    'images/placeholder1.jpg',
    'images/placeholder2.jpg',
    'images/placeholder3.jpg',
    'images/placeholder4.jpg',
    'images/placeholder5.jpg',
  ];

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome to BagHaven!</h1>
      <p className="text-lg text-gray-600 mb-6">Explore our latest collection of stylish bags.</p>

      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Featured Bags</h2>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {featuredBags.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Featured Bag ${index + 1}`}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 h-auto rounded-lg shadow-md object-cover aspect-square"
          />
        ))}
      </div>
    </div>
  );
};

export default HomeSection;