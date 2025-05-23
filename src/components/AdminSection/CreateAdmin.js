import React from 'react';

const CreateAdmin = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Create New Admin Account</h2>
      {/* Form for creating a new admin user */}
      <form className="space-y-4">
        <div>
          <label htmlFor="new-admin-username" className="block text-gray-700 text-sm font-semibold mb-2">Username:</label>
          <input type="text" id="new-admin-username" className="w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label htmlFor="new-admin-password" className="block text-gray-700 text-sm font-semibold mb-2">Password:</label>
          <input type="password" id="new-admin-password" className="w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label htmlFor="confirm-new-admin-password" className="block text-gray-700 text-sm font-semibold mb-2">Confirm Password:</label>
          <input type="password" id="confirm-new-admin-password" className="w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <button type="submit" className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700">Create Admin</button>
      </form>
    </div>
  );
};

export default CreateAdmin;