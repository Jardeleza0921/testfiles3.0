import React from 'react';

const CollectionSection = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Our Collection</h1>
      <p className="text-lg text-gray-600">Browse through our extensive collection of bags.</p>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Placeholder for collection items */}
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <img src="https://placehold.co/300x200/e0e0e0/000000?text=Bag+Type+A" alt="Bag Type A" className="w-full h-40 object-cover rounded-md mb-4" />
          <h3 className="text-lg font-semibold text-gray-800">Everyday Carry</h3>
          <p className="text-gray-600 text-sm">Versatile bags for daily use.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <img src="https://placehold.co/300x200/d0d0d0/000000?text=Bag+Type+B" alt="Bag Type B" className="w-full h-40 object-cover rounded-md mb-4" />
          <h3 className="text-lg font-semibold text-gray-800">Travel Essentials</h3>
          <p className="text-gray-600 text-sm">Durable and spacious bags for your journeys.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <img src="https://placehold.co/300x200/c0c0c0/000000?text=Bag+Type+C" alt="Bag Type C" className="w-full h-40 object-cover rounded-md mb-4" />
          <h3 className="text-lg font-semibold text-gray-800">Fashion Statements</h3>
          <p className="text-gray-600 text-sm">Trendy bags to complete your look.</p>
        </div>
      </div>
    </div>
  );
};

export default CollectionSection;