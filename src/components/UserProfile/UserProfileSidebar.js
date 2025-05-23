import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const UserProfileSidebar = ({ isUserProfileSidebarOpen }) => {
  const location = useLocation();

  const profileItems = [
    { id: 'profile', icon: 'person', label: 'Profile Info', path: '/profile' },
    { id: 'address', icon: 'home', label: 'Addresses', path: '/profile/addresses' },
    { id: 'contacts', icon: 'phone', label: 'Contact Info', path: '/profile/contacts' },
    { id: 'coupons', icon: 'local_offer', label: 'My Coupons', path: '/profile/coupons' },
    { id: 'orders', icon: 'shopping_bag', label: 'Orders', path: '/profile/orders' },
    { id: 'history', icon: 'history', label: 'Shop History', path: '/profile/history' },
    { id: 'messages', icon: 'mail', label: 'Messages', path: '/profile/messages' },
  ];

  const getActiveContent = (itemPath) => {
    if (itemPath === '/profile') {
      return location.pathname === itemPath;
    }
    return location.pathname.startsWith(itemPath);
  };

  const sidebarBaseClasses = "top-20 left-0 p-5 border-r border-gray-200 bg-gray-50 flex flex-col items-start rounded-r-lg transition-transform duration-300";
  const expandedClass = "translate-x-0";
  const collapsedClass = "-translate-x-full";

  return (
    <aside
      className={`${sidebarBaseClasses} ${isUserProfileSidebarOpen ? expandedClass : collapsedClass}`}
      style={{ zIndex: 40, position: 'fixed', height: 'calc(100vh - 64px)', overflowY: 'auto', width: 'auto' }}
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">My Profile</h2>
      <nav className="flex flex-col justify-start gap-1">
        {profileItems.map(item => (
          <Link
            key={item.id}
            to={item.path}
            className={`flex items-center text-gray-600 py-3 px-4 no-underline rounded-md transition-all duration-200 ${getActiveContent(item.path) ? 'bg-red-100 text-red-700 font-semibold' : 'hover:bg-red-100 hover:text-red-700'}`}
          >
            <span className="material-symbols-outlined text-2xl mr-3">{item.icon}</span>
            <h3 className="text-base font-medium">{item.label}</h3>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default UserProfileSidebar;