import React, { useState, useEffect } from 'react';
import './App.css'; // Import the CSS file for global styles (like body reset)
import AuthPage from './components/AuthPage/AuthPage';
import HomePage from './components/HomePage'; // This will contain user-specific routes and layout
import AdminApp from './AdminApp'; // This will contain admin-specific routes and layout
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// --- Main App Component ---
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  // Cart items will now include quantity
  const [cartItems, setCartItems] = useState([]);

  // Define your user page background URL here
  const userPageBackground = 'https://placehold.co/1920x1080/F0F8FF/000000?text=Your+User+Background'; // Placeholder image

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdminLoggedIn(false);
    setCartItems([]); // Clear cart on logout
  };

  // Function to add/update item in cart
  const updateCart = (productToAdd) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === productToAdd.id);

      if (existingItemIndex > -1) {
        // Item exists, increase quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return updatedItems;
      } else {
        // Item does not exist, add with quantity 1
        return [...prevItems, { ...productToAdd, quantity: 1 }];
      }
    });
  };

  // Function to remove item or decrease quantity from cart
  const removeFromCart = (productId) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === productId);

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        if (updatedItems[existingItemIndex].quantity > 1) {
          // Decrease quantity
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity - 1
          };
        } else {
          // Remove item if quantity is 1
          updatedItems.splice(existingItemIndex, 1);
        }
        return updatedItems;
      }
      return prevItems; // Item not found
    });
  };

  // Function to clear the entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Ensure Material Symbols Outlined font and Tailwind CSS are loaded
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const tailwindScript = document.createElement('script');
    tailwindScript.src = 'https://cdn.tailwindcss.com';
    document.head.appendChild(tailwindScript);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(tailwindScript);
    };
  }, []);

  return (
    <Router>
      <div className="font-sans antialiased text-gray-900 min-h-screen flex flex-col">
        <Routes>
          {/* User Login Route */}
          <Route
            path="/login"
            element={!isLoggedIn ? <AuthPage onLoginSuccess={handleLoginSuccess} type="user" /> : <Navigate to="/" replace />}
          />

          {/* Admin Login Route */}
          <Route
            path="/admin/login"
            element={!isAdminLoggedIn ? <AuthPage onLoginSuccess={handleAdminLoginSuccess} type="admin" /> : <Navigate to="/admin/dashboard" replace />}
          />

          {/* Protected User Routes */}
          <Route
            path="/*"
            element={isLoggedIn ? (
              <HomePage
                onLogout={handleLogout}
                updateCart={updateCart}
                removeFromCart={removeFromCart} // Pass new function
                clearCart={clearCart} // Pass new function
                cartItems={cartItems}
                backgroundUrl={userPageBackground}
              />
            ) : (
              <Navigate to="/login" replace />
            )}
          />

          {/* Protected Admin Routes */}
          <Route
            path="/admin/*"
            element={isAdminLoggedIn ? <AdminApp onLogout={handleLogout} /> : <Navigate to="/admin/login" replace />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;