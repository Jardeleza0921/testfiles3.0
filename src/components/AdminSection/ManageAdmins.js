import React, { useState } from 'react';

const ManageAdmins = () => {
  // Mock data for admin accounts. In a real app, this would come from an API.
  const [adminAccounts, setAdminAccounts] = useState([
    { id: 1, username: 'admin', email: 'admin@example.com', role: 'Super Admin', status: 'Active' },
    { id: 2, username: 'editor1', email: 'editor1@example.com', role: 'Editor', status: 'Active' },
    { id: 3, username: 'moderator2', email: 'moderator2@example.com', role: 'Moderator', status: 'Inactive' },
    { id: 4, username: 'devops', email: 'devops@example.com', role: 'Developer', status: 'Active' },
  ]);

  // Function to handle editing an admin
  const handleEdit = (id) => {
    const adminToEdit = adminAccounts.find(admin => admin.id === id);
    if (!adminToEdit) return;

    // For simplicity, we'll use prompt to simulate editing.
    // In a real application, you would open a modal form here.
    const newUsername = prompt("Enter new username:", adminToEdit.username);
    const newEmail = prompt("Enter new email:", adminToEdit.email);
    const newRole = prompt("Enter new role (e.g., Super Admin, Editor, Moderator, Developer):", adminToEdit.role);
    const newStatus = prompt("Enter new status (Active/Inactive):", adminToEdit.status);

    if (newUsername !== null && newEmail !== null && newRole !== null && newStatus !== null) {
      setAdminAccounts(adminAccounts.map(admin =>
        admin.id === id
          ? {
              ...admin,
              username: newUsername,
              email: newEmail,
              role: newRole,
              status: newStatus,
            }
          : admin
      ));
      alert(`Admin '${newUsername}' updated successfully.`);
    }
  };

  // Function to handle deleting an admin
  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete this admin account?`)) {
      setAdminAccounts(adminAccounts.filter(admin => admin.id !== id));
      alert(`Admin account deleted successfully.`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100 w-full">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-3">
        Manage Admin Accounts
      </h2>

      {adminAccounts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {adminAccounts.map((admin) => (
                <tr key={admin.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{admin.username}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">{admin.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${admin.role === 'Super Admin' ? 'bg-indigo-100 text-indigo-800' :
                         admin.role === 'Editor' ? 'bg-green-100 text-green-800' :
                         'bg-gray-100 text-gray-800'}`}>
                      {admin.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${admin.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {admin.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(admin.id)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                      title="Edit Admin"
                    >
                      <span className="material-symbols-outlined text-base">edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(admin.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete Admin"
                    >
                      <span className="material-symbols-outlined text-base">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 text-lg">No admin accounts found.</p>
      )}
    </div>
  );
};

export default ManageAdmins;