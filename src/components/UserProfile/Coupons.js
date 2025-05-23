import React from 'react';

const Coupons = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">My Coupons</h2>
      {/* Display user coupons here */}
      <ul>
        <li>SUMMER25 - 25% off your next order</li>
        <li>FREESHIP - Free shipping on orders over $50</li>
        {/* ... more coupons ... */}
      </ul>
    </div>
  );
};

export default Coupons;