import React, { useState } from 'react';

const SignupForm = ({ onShowLogin }) => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: newUsername, password: newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setNewUsername('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          onShowLogin();
          setMessage('');
        }, 1500);
      } else {
        setMessage(data.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Network error during registration:', error);
      setMessage('Network error. Please try again later.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up for BagHaven</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="new-username" className="block text-gray-700 text-sm font-semibold mb-2">Username:</label>
          <input
            type="text"
            id="new-username"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="new-password" className="block text-gray-700 text-sm font-semibold mb-2">Password:</label>
          <input
            type="password"
            id="new-password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirm-password" className="block text-gray-700 text-sm font-semibold mb-2">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {message && <p className={`text-center text-sm ${message.includes('created') ? 'text-green-600' : 'text-red-500'}`}>{message}</p>}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-md font-bold text-lg hover:bg-green-700 transition-colors duration-200 shadow-md"
        >
          Sign Up
        </button>
        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account? <button onClick={onShowLogin} className="text-blue-600 hover:underline font-medium" style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}>Login</button>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;