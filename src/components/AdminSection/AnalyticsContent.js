import React from 'react';

const AnalyticsContent = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Sales Analytics</h2>
      <p className="text-gray-600 mb-4">Detailed insights into product performance and customer behavior.</p>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li><strong className="font-semibold">Top Selling Product:</strong> Elegant Tote Bag</li>
        <li><strong className="font-semibold">Customer Demographics:</strong> 60% Female, 40% Male</li>
        <li><strong className="font-semibold">Traffic Sources:</strong> 70% Organic, 30% Social Media</li>
      </ul>
    </div>
  );
};

export default AnalyticsContent;