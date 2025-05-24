// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import AuthPage from './components/AuthPage/AuthPage'; // User Signup Page
import UserLoginPage from './components/AuthPage/UserLoginPage'; // Dedicated User Login Page
import AdminLoginPage from './components/AuthPage/AdminLoginPage'; // Dedicated Admin Login Page
import AdminSignupPage from './components/AuthPage/AdminSignupPage'; // NEW: Admin Signup Page
import HomePage from './components/HomePage';
import AdminApp from './AdminApp'; // Reverted to original version
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const userPageBackground = 'https://placehold.co/1920x1080/F0F8FF/000000?text=Your+User+Background';

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token && role) {
      setUserRole(role);
      if (role === 'user') {
        setIsLoggedIn(true);
        setIsAdminLoggedIn(false);
      } else if (role === 'admin') {
        setIsAdminLoggedIn(true);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
      setIsAdminLoggedIn(false);
      setUserRole(null);
    }
  }, []);

  const handleLoginSuccess = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    setUserRole(role);

    if (role === 'user') {
      setIsLoggedIn(true);
      setIsAdminLoggedIn(false);
    } else if (role === 'admin') {
      setIsAdminLoggedIn(true);
      setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setIsAdminLoggedIn(false);
    setUserRole(null);
    setCartItems([]);
  };

  const updateCart = (productToAdd) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === productToAdd.id);
      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return updatedItems;
      } else {
        return [...prevItems, { ...productToAdd, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === productId);
      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        if (updatedItems[existingItemIndex].quantity > 1) {
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity - 1
          };
        } else {
          updatedItems.splice(existingItemIndex, 1);
        }
        return updatedItems;
      }
      return prevItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

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
            element={!isLoggedIn && !isAdminLoggedIn ? <UserLoginPage onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/" replace />}
          />
          {/* Admin Login Route */}
          <Route
            path="/admin/login"
            element={!isLoggedIn && !isAdminLoggedIn ? <AdminLoginPage onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/admin/dashboard" replace />}
          />
          {/* User Signup Route */}
          <Route
            path="/signup"
            element={!isLoggedIn && !isAdminLoggedIn ? <AuthPage onShowLogin={() => {}} /> : <Navigate to="/" replace />}
          />
          {/* NEW: Admin Signup Route */}
          <Route
            path="/admin/signup"
            element={!isLoggedIn && !isAdminLoggedIn ? <AdminSignupPage /> : <Navigate to="/admin/dashboard" replace />}
          />
          {/* Protected User Routes */}
          <Route
            path="/*"
            element={isLoggedIn && userRole === 'user' ? (
              <HomePage
                onLogout={handleLogout}
                updateCart={updateCart}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
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
            element={isAdminLoggedIn && userRole === 'admin' ? <AdminApp onLogout={handleLogout} /> : <Navigate to="/admin/login" replace />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;