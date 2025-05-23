import React from 'react';

const LogoutSection = ({ onLogout }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Logout</h1>
        <p className="text-lg text-gray-600 mb-8">Are you sure you want to log out?</p>
        <button
          onClick={onLogout}
          className="bg-red-600 text-white px-8 py-3 rounded-md font-bold text-lg hover:bg-red-700 transition-colors duration-200 shadow-md"
        >
          Confirm Logout
        </button>
      </div>
    </div>
  );
};

export default LogoutSection;