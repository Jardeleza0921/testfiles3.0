import React from 'react';

const ProductListTable = () => {
  // In a real app, this data would come from a state management solution or API
  const products = [
    { id: '001', name: 'Elegant laptop Bag', price: 59.99 },
    { id: '002', name: 'Classic Leather bag', price: 89.50 },
    { id: '003', name: 'Stylish bagpack', price: 34.00 },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Product List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left text-gray-600 bg-gray-50">ID</th>
              <th className="py-2 px-4 border-b text-left text-gray-600 bg-gray-50">Name</th>
              <th className="py-2 px-4 border-b text-left text-gray-600 bg-gray-50">Price</th>
              <th className="py-2 px-4 border-b text-left text-gray-600 bg-gray-50">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td className="py-2 px-4 border-b text-gray-800">{product.id}</td>
                <td className="py-2 px-4 border-b text-gray-800">{product.name}</td>
                <td className="py-2 px-4 border-b text-gray-800">${product.price.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">
                  <button className="text-blue-500 hover:text-blue-700 mr-2 px-3 py-1 rounded-md text-sm bg-blue-100 hover:bg-blue-200 transition-colors">Edit</button>
                  <button className="text-red-500 hover:text-red-700 px-3 py-1 rounded-md text-sm bg-red-100 hover:bg-red-200 transition-colors">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductListTable;