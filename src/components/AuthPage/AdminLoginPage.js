// components/AuthPage/AdminLoginPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminLoginPage = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const endpoint = 'http://localhost:5000/api/auth/admin-login';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        onLoginSuccess(data.token, data.role);
      } else {
        setMessage(data.message || 'Admin login failed. Please try again.');
      }
    } catch (error) {
      console.error('Admin login error:', error);
      setMessage('Network error. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="admin-username" className="block text-gray-700 text-sm font-semibold mb-2">Username:</label>
            <input
              type="text"
              id="admin-username"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="block text-gray-700 text-sm font-semibold mb-2">Password:</label>
            <input
              type="password"
              id="admin-password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {message && <p className={`text-center text-sm ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-md font-bold text-lg hover:bg-red-700 transition-colors duration-200 shadow-md"
          >
            Admin Login
          </button>
        </form>
        <p className="text-center text-gray-600 text-sm mt-4">
          <Link to="/login" className="text-blue-600 hover:underline font-medium">Back to User Login</Link>
        </p>
        {/* NEW: Temporary link to Admin Signup */}
        <p className="text-center text-gray-600 text-sm mt-2">
          New admin? <Link to="/admin/signup" className="text-blue-600 hover:underline font-medium">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLoginPage;