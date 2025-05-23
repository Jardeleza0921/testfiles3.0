import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminManagementSidebar = ({ isAdminManagementSidebarOpen }) => { // Receive prop for open state
  const location = useLocation();

  const adminManagementItems = [
    { id: 'create-admin', icon: 'person_add', label: 'Create New Admin', path: '/admin/create-admin' },
    { id: 'manage-admins', icon: 'manage_accounts', label: 'Manage Admins', path: '/admin/manage-admins' },
    // Add more admin management links here if needed
  ];

  const getActiveContent = (itemPath) => {
    return location.pathname === itemPath;
  };

  const sidebarBaseClasses = "fixed top-20 right-0 h-full w-64 p-5 border-l border-gray-200 bg-gray-50 flex flex-col items-start rounded-l-lg z-20 transition-transform duration-300";
  const collapsedClass = "translate-x-full"; // Tailwind class to move element off-screen to the right

  return (
    <aside className={`${sidebarBaseClasses} ${isAdminManagementSidebarOpen ? '' : collapsedClass}`}>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Admin Management</h2>
      <nav className="w-full flex flex-col justify-start gap-1">
        {adminManagementItems.map(item => (
          <Link
            key={item.id}
            to={item.path}
            className={`flex items-center text-gray-600 py-3 px-4 no-underline rounded-md transition-all duration-200 w-full ${getActiveContent(item.path) ? 'bg-red-100 text-red-700 font-semibold' : 'hover:bg-red-100 hover:text-red-700'}`}
          >
            <span className="material-symbols-outlined text-2xl mr-3">{item.icon}</span>
            <h3 className="text-base font-medium">{item.label}</h3>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default AdminManagementSidebar;