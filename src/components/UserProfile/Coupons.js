import React, { useState } from 'react';

// Component to display a single coupon card
const CouponCard = ({ coupon, onApply, onRemove }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-5 mb-4 border border-dashed border-gray-300 flex flex-col md:flex-row justify-between items-start md:items-center">
      <div className="flex-grow mb-3 md:mb-0">
        <h3 className="text-xl font-bold text-gray-800">{coupon.code}</h3>
        <p className="text-gray-600 text-sm">{coupon.description}</p>
        {coupon.expiryDate && (
          <p className="text-red-500 text-xs mt-1">Expires: {coupon.expiryDate}</p>
        )}
        {coupon.minSpend && (
          <p className="text-gray-500 text-xs mt-1">Min. spend: ${coupon.minSpend.toFixed(2)}</p>
        )}
      </div>
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3">
        <button
          onClick={() => onApply(coupon.code)}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg text-sm shadow-md transition duration-200"
        >
          Apply Coupon
        </button>
        <button
          onClick={() => onRemove(coupon.id)}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg text-sm shadow-md transition duration-200"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

const Coupons = () => {
  // In a real application, this data would come from an API or global state
  const [userCoupons, setUserCoupons] = useState([
    {
      id: 'cpn1',
      code: 'SUMMER25',
      description: 'Get 25% off your next order',
      type: 'percentage',
      value: 0.25,
      expiryDate: '2025-08-31',
      minSpend: null,
    },
    {
      id: 'cpn2',
      code: 'FREESHIP',
      description: 'Enjoy free shipping on orders over $50',
      type: 'shipping',
      value: 0, // Value could be specific amount, but for free shipping, it's often 0
      expiryDate: '2025-12-31',
      minSpend: 50.00,
    },
    {
      id: 'cpn3',
      code: 'WELCOME10',
      description: '₱100 off for new customers',
      type: 'fixed_amount',
      value: 10.00, // Assuming 100 PHP is roughly $10 for example purposes
      expiryDate: '2025-07-15',
      minSpend: 20.00,
    },
    {
      id: 'cpn4',
      code: 'BAGLOVE',
      description: 'Buy one, get one 50% off on selected bags',
      type: 'bogo',
      value: 0.50, // 50% off second item
      expiryDate: null, // No expiry
      minSpend: null,
    },
  ]);

  const [inputCouponCode, setInputCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState('');

  const handleApplyCouponFromList = (couponCode) => {
    // In a real app, this would integrate with your cart/checkout logic
    alert(`Coupon "${couponCode}" applied! (This is a mock application)`);
    setCouponMessage(`Successfully applied coupon: ${couponCode}`);
    // You might want to visually indicate applied coupons or move them to a different section
  };

  const handleRemoveCoupon = (couponId) => {
    if (window.confirm('Are you sure you want to remove this coupon from your list?')) {
      setUserCoupons(prevCoupons => prevCoupons.filter(coupon => coupon.id !== couponId));
      setCouponMessage('Coupon removed successfully.');
    }
  };

  const handleAddCoupon = (e) => {
    e.preventDefault();
    if (!inputCouponCode.trim()) {
      setCouponMessage('Please enter a coupon code.');
      return;
    }

    // Simulate checking if coupon exists and is valid
    const existingCoupon = userCoupons.find(c => c.code === inputCouponCode.toUpperCase());
    if (existingCoupon) {
      setCouponMessage(`You already have coupon "${inputCouponCode.toUpperCase()}"`);
      setInputCouponCode('');
      return;
    }

    // For demonstration: add a dummy coupon if it's new
    const newCoupon = {
      id: `cpn${Date.now()}`,
      code: inputCouponCode.toUpperCase(),
      description: 'Newly added coupon! (Placeholder description)',
      type: 'unknown',
      value: 0,
      expiryDate: '2025-09-30', // Dummy expiry
      minSpend: null,
    };

    setUserCoupons(prevCoupons => [...prevCoupons, newCoupon]);
    setCouponMessage(`Coupon "${inputCouponCode.toUpperCase()}" added to your list!`);
    setInputCouponCode('');
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Coupons</h2>

      {/* Coupon Code Input Section */}
      <div className="bg-white shadow-md rounded-lg p-5 mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Have a Coupon Code?</h3>
        <form onSubmit={handleAddCoupon} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={inputCouponCode}
            onChange={(e) => {
              setInputCouponCode(e.target.value);
              setCouponMessage(''); // Clear message on input change
            }}
            className="flex-grow shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-200"
          >
            Add Coupon
          </button>
        </form>
        {couponMessage && (
          <p className="mt-3 text-sm text-center font-medium text-blue-600">{couponMessage}</p>
        )}
      </div>

      {/* Display User Coupons */}
      {userCoupons.length > 0 ? (
        <div className="space-y-4">
          {userCoupons.map(coupon => (
            <CouponCard
              key={coupon.id}
              coupon={coupon}
              onApply={handleApplyCouponFromList}
              onRemove={handleRemoveCoupon}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-lg text-center">You don't have any coupons yet.</p>
      )}
    </div>
  );
};

export default Coupons;