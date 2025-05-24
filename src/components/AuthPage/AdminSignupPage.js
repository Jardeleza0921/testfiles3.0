import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminSignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/admin-register', { // New admin registration endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        // Redirect to admin login after successful registration
        setTimeout(() => {
          navigate('/admin/login');
          setMessage('');
        }, 1500);
      } else {
        setMessage(data.message || 'Admin registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Network error during admin registration:', error);
      setMessage('Network error. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Register New Admin</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="admin-signup-username" className="block text-gray-700 text-sm font-semibold mb-2">Username:</label>
            <input
              type="text"
              id="admin-signup-username"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="admin-signup-password" className="block text-gray-700 text-sm font-semibold mb-2">Password:</label>
            <input
              type="password"
              id="admin-signup-password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="admin-signup-confirm-password" className="block text-gray-700 text-sm font-semibold mb-2">Confirm Password:</label>
            <input
              type="password"
              id="admin-signup-confirm-password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {message && <p className={`text-center text-sm ${message.includes('successful') ? 'text-green-600' : 'text-red-500'}`}>{message}</p>}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md font-bold text-lg hover:bg-green-700 transition-colors duration-200 shadow-md"
          >
            Register Admin
          </button>
          <p className="text-center text-gray-600 text-sm mt-4">
            <Link to="/admin/login" className="text-blue-600 hover:underline font-medium">Back to Admin Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminSignupPage;