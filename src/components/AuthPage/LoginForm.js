import React, { useState } from 'react';

const LoginForm = ({ onLoginSuccess, onShowSignup, type = 'user' }) => { // Added type prop, default to 'user'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let success = false;
    if (type === 'admin') {
      // Simulated admin login credentials
      if (username === 'admin' && password === 'adminpass') {
        success = true;
      } else {
        setMessage('Admin login failed. Please check your username and password.');
      }
    } else {
      // Simulated user login credentials
      if (username === 'user' && password === 'pass') {
        success = true;
      } else {
        setMessage('Login failed. Please check your username and password.');
      }
    }

    if (success) {
      onLoginSuccess();
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        {type === 'admin' ? 'Admin Login' : 'Login to BagHaven'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-2">Username:</label>
          <input
            type="text"
            id="username"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" // Changed focus ring to red
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Password:</label>
          <input
            type="password"
            id="password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" // Changed focus ring to red
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {message && <p className="text-red-500 text-center text-sm">{message}</p>}
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded-md font-bold text-lg hover:bg-red-700 transition-colors duration-200 shadow-md" // Changed button color to red
        >
          {type === 'admin' ? 'Admin Login' : 'Login'}
        </button>
        {type !== 'admin' && ( // Only show signup link for regular user login
          <p className="text-center text-gray-600 text-sm mt-4">
            Don't have an account? <a href="#" onClick={onShowSignup} className="text-red-600 hover:underline font-medium">Sign up</a>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginForm;