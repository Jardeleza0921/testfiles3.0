import React, { useState } from 'react';
import HomeSection from './HomeSection';
import ShopSection from './ShopSection';
import AdminSection from './AdminSection/AdminSection';
import AboutUsSection from './HomePage/AboutUsSection';
import CollectionSection from './HomePage/CollectionSection';
import LogoutSection from './HomePage/LogoutSection';
import Receipt from './Receipt';

const MainContent = ({ activeContent, onLogout, cartItems, updateCart }) => {
  const [showReceipt, setShowReceipt] = useState(false);

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      setShowReceipt(true);
    } else {
      alert('Your cart is empty. Please add items to checkout.');
    }
  };

  const closeReceipt = () => {
    setShowReceipt(false);
  };

  let total = 0;
  cartItems.forEach(item => (total += item.price));

  return (
    <div className="flex-grow p-4 ml-64 relative"> {/* Added relative for Receipt positioning */}
      {(() => {
        switch (activeContent) {
          case 'home':
            return <HomeSection />;
          case 'shop':
            return <ShopSection updateCart={updateCart} />;
          case 'admin':
            return <AdminSection />;
          case 'about-us':
            return <AboutUsSection />;
          case 'collection':
            return <CollectionSection />;
          case 'logout':
            return <LogoutSection onLogout={onLogout} />;
          default:
            return (
              <div className="p-4 text-center">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">Page Not Found</h1>
                <p className="text-lg text-gray-600">The content you are looking for does not exist.</p>
              </div>
            );
        }
      })()}
      {activeContent === 'shop' && (
        <div className="bg-gray-100 p-4 rounded-lg text-right shadow-inner border border-gray-200 mt-4">
          <p className="text-lg font-semibold text-gray-700 mb-2">Total: ${total.toFixed(2)}</p>
          <button
            onClick={handleCheckout}
            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-200 text-lg shadow-md"
          >
            Proceed to Checkout
          </button>
        </div>
      )}

      {showReceipt && <Receipt cartItems={cartItems} onClose={closeReceipt} />}
    </div>
  );
};

export default MainContent;