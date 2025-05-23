import React from 'react';

const CartModal = ({ cartItems, onClose, onUpdateQuantity, onRemoveItem, onClearCart }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto relative">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Your Cart</h2>

        {cartItems.length > 0 ? (
          <ul className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <li key={item.id} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                <div className="flex items-center flex-grow">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                  <div>
                    <span className="font-semibold text-gray-700 block">{item.name}</span>
                    <span className="text-sm text-gray-500">${item.price.toFixed(2)} each</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => onRemoveItem(item.id)} // Decrement quantity or remove
                    className="bg-red-100 text-red-700 px-3 py-1 rounded-md hover:bg-red-200 transition-colors duration-200 text-lg font-bold"
                  >
                    -
                  </button>
                  <span className="mx-3 text-lg font-semibold text-gray-800">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item)} // Increment quantity
                    className="bg-green-100 text-green-700 px-3 py-1 rounded-md hover:bg-green-200 transition-colors duration-200 text-lg font-bold"
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600 text-lg mb-6">Your cart is empty.</p>
        )}

        <div className="flex justify-between items-center pt-4 border-t border-gray-300">
          <span className="text-xl font-bold text-gray-800">Total:</span>
          <span className="text-2xl font-bold text-blue-600">${total.toFixed(2)}</span>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          {cartItems.length > 0 && (
            <button
              onClick={onClearCart}
              className="bg-gray-200 text-gray-700 px-5 py-2 rounded-md hover:bg-gray-300 transition-colors duration-200 font-medium"
            >
              Clear Cart
            </button>
          )}
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 font-medium"
          >
            Close
          </button>
          {cartItems.length > 0 && (
            <button
              onClick={() => {
                // In a real app, this would lead to a checkout process
                alert('Proceeding to actual checkout!');
                onClose();
                onClearCart(); // Clear cart after "checkout"
              }}
              className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition-colors duration-200 font-medium"
            >
              Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;