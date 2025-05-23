import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isSidebarOpen }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const isLoggedIn = true; // Replace with your actual authentication check
  const user = { name: 'John Doe', email: 'john.doe@example.com' }; // Replace with your actual user data

  const adminSidebarItems = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard', path: '/admin/dashboard' },
    { id: 'add-product', icon: 'add_circle_outline', label: 'Add Product', path: '/admin/add-product' },
    { id: 'products', icon: 'list_alt', label: 'Product List', path: '/admin/products' },
    { id: 'analytics', icon: 'analytics', label: 'Analytics', path: '/admin/analytics' },
    { id: 'logout', icon: 'logout', label: 'Logout', path: '/admin/logout' },
  ];

  const getActiveContent = (itemPath) => {
    return location.pathname.startsWith(itemPath);
  };

  const sidebarBaseClasses = "fixed top-20 left-0 h-full w-64 p-5 border-r border-gray-200 bg-gray-50 flex flex-col items-start rounded-r-lg z-20 transition-transform duration-300";
  const collapsedClass = "-translate-x-full";

  return (
    <aside className={`${sidebarBaseClasses} ${isSidebarOpen ? '' : collapsedClass}`}>
      <div className="flex items-center justify-start mb-8 w-full">
        <img src="/images/BagHavenlogo.jpg" alt="BagHaven Logo" className="h-10 mr-3 rounded-full" />
        <h2 className="text-xl font-bold text-gray-800">Bag<span className="text-red-500">Haven</span></h2>
      </div>
      <nav className="w-full flex flex-col justify-start gap-1">
        {!isAdminPage && isLoggedIn ? (
          <>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">User Profile</h3>
            <div className="mb-4">
              <p className="text-gray-600 text-sm">Name: {user.name}</p>
              <p className="text-gray-600 text-sm">Email: {user.email}</p>
              <Link to="/profile" className="text-blue-500 hover:underline text-sm mt-2 block">View Full Profile</Link>
            </div>
            {/* Removed other user navigation links */}
          </>
        ) : (
          isAdminPage && adminSidebarItems.map(item => (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center text-gray-600 py-3 px-4 no-underline rounded-md transition-all duration-200 w-full ${getActiveContent(item.path) ? 'bg-red-100 text-red-700 font-semibold' : 'hover:bg-red-100 hover:text-red-700'}`}
            >
              <span className="material-symbols-outlined text-2xl mr-3">{item.icon}</span>
              <h3 className="text-base font-medium">{item.label}</h3>
            </Link>
          ))
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;