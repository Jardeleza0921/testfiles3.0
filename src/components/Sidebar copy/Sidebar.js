import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router

const Sidebar = ({ activeContent }) => {
  const sidebarItems = [
    { id: 'home', icon: 'home', label: 'Home', path: '/' }, // Link to the main homepage
    { id: 'shop', icon: 'storefront', label: 'Shop', path: '/shop' },
    { id: 'admin', icon: 'admin_panel_settings', label: 'Admin', path: '/admin' }, // Link to the new admin page
    { id: 'logout', icon: 'logout', label: 'Logout', path: '/logout' },
  ];

  return (
    <aside className="fixed top-16 left-0 h-full w-64 p-5 border-r border-gray-200 bg-gray-50 flex flex-col items-start rounded-r-lg z-20">
      <div className="flex items-center justify-start mb-8 w-full">
        <img src="/images/BagHavenlogo.jpg" alt="BagHaven Logo" className="h-10 mr-3 rounded-full" />
        <h2 className="text-xl font-bold text-gray-800">Bag<span className="text-red-500">Haven</span></h2>
      </div>
      <nav className="w-full flex flex-col justify-start gap-1">
        {sidebarItems.map(item => (
          <Link
            key={item.id}
            to={item.path}
            className={`flex items-center text-gray-600 py-3 px-4 no-underline rounded-md transition-all duration-200 w-full ${activeContent === item.id ? 'bg-blue-50 text-blue-700 font-semibold' : 'hover:bg-gray-100 hover:text-blue-600'}`}
          >
            <span className="material-symbols-outlined text-2xl mr-3">{item.icon}</span>
            <h3 className="text-base font-medium">{item.label}</h3>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;