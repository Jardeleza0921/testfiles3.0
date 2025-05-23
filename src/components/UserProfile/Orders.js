import React from 'react';

const Orders = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">My Orders</h2>
      {/* Display user order history here */}
      <ul>
        <li>Order #12345 - Placed on 2025-05-20 - Status: Shipped</li>
        <li>Order #67890 - Placed on 2025-05-15 - Status: Delivered</li>
        {/* ... more orders with details ... */}
      </ul>
    </div>
  );
};

export default Orders;