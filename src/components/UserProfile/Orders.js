import React from 'react';

// Assuming you have an OrderCard component or similar for displaying individual orders
// For this example, I'll create a simple inline component structure.
// In a real application, you might abstract this into a separate component.
const OrderCard = ({ order }) => {
  return (
    <li className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-700">Order #{order.id}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {order.status}
        </span>
      </div>
      <p className="text-gray-600 mb-2">Placed on: {order.date}</p>
      <div className="border-t border-gray-200 pt-2">
        <p className="text-gray-700 font-medium">Items:</p>
        <ul className="list-disc list-inside text-gray-600">
          {order.items.map((item, index) => (
            <li key={index}>{item.name} (x{item.quantity}) - ${item.price.toFixed(2)}</li>
          ))}
        </ul>
      </div>
      <p className="text-right text-lg font-bold text-gray-800 mt-3">Total: ${order.total.toFixed(2)}</p>
    </li>
  );
};

const Orders = () => {
  // In a real application, this data would come from an API call
  // or a state management solution (e.g., Redux, Context API).
  const userOrders = [
    {
      id: '12345',
      date: '2025-05-20',
      status: 'Shipped',
      items: [
        { name: 'Elegant laptop Bag', quantity: 1, price: 59.99 },
        { name: 'Compact Sling Bag', quantity: 1, price: 25.99 },
      ],
      total: 85.98,
    },
    {
      id: '67890',
      date: '2025-05-15',
      status: 'Delivered',
      items: [
        { name: 'Classic Leather bag', quantity: 1, price: 89.50 },
      ],
      total: 89.50,
    },
    {
      id: '98765',
      date: '2025-05-10',
      status: 'Processing',
      items: [
        { name: 'Stylish backpack', quantity: 2, price: 34.00 },
        { name: 'Travel Duffle Bag', quantity: 1, price: 75.00 },
      ],
      total: 143.00,
    },
  ];

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Orders</h2>
      {userOrders.length > 0 ? (
        <ul className="space-y-4">
          {userOrders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 text-lg">You haven't placed any orders yet.</p>
      )}
    </div>
  );
};

export default Orders;