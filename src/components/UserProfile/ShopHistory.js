import React from 'react';

// A simple component to display a single item from the history
const HistoryItemCard = ({ item, type }) => {
  const getBadgeColor = (itemType) => {
    switch (itemType) {
      case 'viewed': return 'bg-blue-100 text-blue-800';
      case 'cart': return 'bg-red-100 text-red-800';
      case 'wishlist': return 'bg-purple-100 text-purple-800';
      case 'purchased': return 'bg-green-100 text-green-800'; // Though Orders handles this
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
      {item.image && (
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-md flex-shrink-0"
        />
      )}
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
          {type && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(type)}`}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
          )}
        </div>
        {item.price && <p className="text-gray-700 text-sm mt-1">Price: ${item.price.toFixed(2)}</p>}
        {item.date && <p className="text-gray-500 text-xs">Last {type}: {item.date}</p>}
        {item.status && <p className="text-gray-500 text-xs">Status: {item.status}</p>}
      </div>
      <div className="flex-shrink-0">
        {/* Example: Add to Cart button for viewed/wishlist items */}
        {(type === 'viewed' || type === 'wishlist' || type === 'cart') && (
          <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded-md transition duration-200">
            View Details
          </button>
        )}
      </div>
    </div>
  );
};


const ShopHistory = () => {
  // In a real application, this data would be fetched from your backend
  // It's structured to show different types of history.
  const userHistory = {
    recentlyViewed: [
      { id: 101, name: 'Elegant Laptop Bag', price: 59.99, image: 'images/placeholder1.jpg', date: '2025-06-05' },
      { id: 102, name: 'Stylish Backpack', price: 34.00, image: 'images/placeholder3.jpg', date: '2025-06-04' },
      { id: 103, name: 'Travel Duffle Bag', price: 75.00, image: 'images/placeholder4.jpg', date: '2025-06-03' },
    ],
    abandonedCart: [
      { id: 201, name: 'Classic Leather Bag', price: 89.50, image: 'images/placeholder2.jpg', date: '2025-05-30', status: 'Pending Checkout' },
    ],
    wishlistItems: [
      { id: 301, name: 'Compact Sling Bag', price: 25.99, image: 'images/placeholder5.jpg', date: '2025-05-25', status: 'In Stock' },
      { id: 302, name: 'Waterproof Backpack', price: 45.00, image: 'images/placeholder6.jpg', date: '2025-05-20', status: 'Low Stock' },
    ],
    // You could also have 'purchased' items here if they are distinct from 'Orders'
    // e.g., if 'Orders' is just a list of order IDs, but 'ShopHistory' shows the actual items
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Shop Activity</h2>

      {/* Recently Viewed Items Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">Recently Viewed</h3>
        {userHistory.recentlyViewed.length > 0 ? (
          <div className="space-y-4">
            {userHistory.recentlyViewed.map(item => (
              <HistoryItemCard key={item.id} item={item} type="viewed" />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No recently viewed items.</p>
        )}
      </div>

      {/* Abandoned Cart Items Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">Abandoned Cart</h3>
        {userHistory.abandonedCart.length > 0 ? (
          <div className="space-y-4">
            {userHistory.abandonedCart.map(item => (
              <HistoryItemCard key={item.id} item={item} type="cart" />
            ))}
            <div className="text-center mt-6">
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-200">
                Continue Checkout
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">No items in your abandoned cart.</p>
        )}
      </div>

      {/* Wishlist Items Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">Your Wishlist</h3>
        {userHistory.wishlistItems.length > 0 ? (
          <div className="space-y-4">
            {userHistory.wishlistItems.map(item => (
              <HistoryItemCard key={item.id} item={item} type="wishlist" />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">Your wishlist is empty.</p>
        )}
      </div>

      {/* Call to Action for More History */}
      <div className="text-center mt-10 p-6 bg-gray-50 rounded-lg shadow-inner">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Looking for your past purchases?</h3>
        <p className="text-gray-600 mb-4">
          Visit the <span className="font-bold">"My Orders"</span> section for a detailed history of your completed transactions.
        </p>
        {/* You might want a button here to navigate to the Orders page */}
        {/* <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-md">
          Go to My Orders
        </button> */}
      </div>
    </div>
  );
};

export default ShopHistory;