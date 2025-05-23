import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = ({ onToggleSidebar, cartItemCount, onCartIconClick }) => {
  const [pageDropdownOpen, setPageDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const togglePageDropdown = () => {
    setPageDropdownOpen(!pageDropdownOpen);
  };

  const navigateToPage = (path) => {
    navigate(path);
    setPageDropdownOpen(false);
  };

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <header className="bg-white text-gray-800 p-4 flex justify-between items-center shadow-md rounded-b-lg w-full fixed top-0 z-10">
      <div className="flex items-center">
        <button onClick={onToggleSidebar} className="mr-4 text-gray-600 hover:text-red-500 focus:outline-none sm:block hidden">
          <span className="material-symbols-outlined text-3xl">menu</span>
        </button>
        {isAdminRoute ? (
          <h1 className="text-2xl font-extrabold text-blue-600 no-underline text-inherit mx-auto">BagHaven's Admin</h1>
        ) : (
          <Link to="/" className="text-2xl font-extrabold text-blue-600 no-underline text-inherit">BagHaven</Link>
        )}
      </div>
      <nav className="hidden sm:block">
        <ul className="flex list-none p-0 m-0 gap-4">
          {!isAdminRoute && (
            <>
              <li><Link to="/" className="text-gray-700 hover:text-blue-500 transition-colors duration-200">Home</Link></li>
              <li><Link to="/shop" className="text-gray-700 hover:text-blue-500 transition-colors duration-200">Shop</Link></li>
              <li><Link to="/about-us" className="text-gray-700 hover:text-blue-500 transition-colors duration-200">About Us</Link></li>
              <li><Link to="/collection" className="text-gray-700 hover:text-blue-500 transition-colors duration-200">Collection</Link></li>
            </>
          )}
        </ul>
      </nav>
      <div className="flex items-center gap-4">
        {!isAdminRoute && (
          <>
            <div className="flex w-full sm:w-auto">
              <input type="text" placeholder="Search..." className="p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-500 w-full" />
              <button type="submit" className="px-4 py-2 bg-gray-200 border border-gray-300 rounded-r-md cursor-pointer hover:bg-gray-300 transition-colors duration-200">Search</button>
            </div>
            <Link to="/cart" className="relative text-2xl no-underline text-gray-700 hover:text-blue-500 transition-colors duration-200">
              🛒
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </>
        )}

        {/* Page Switch Dropdown - Always Visible */}
        <div className="relative z-30">
          <button
            onClick={togglePageDropdown}
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors duration-200 font-medium"
          >
            Switch Page
          </button>
          {pageDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-40">
              <button onClick={() => navigateToPage("/")} className="block px-4 py-2 text-gray-800 hover:bg-red-100 hover:text-red-700 w-full text-left">User Page</button>
              <button onClick={() => navigateToPage("/admin/dashboard")} className="block px-4 py-2 text-gray-800 hover:bg-red-100 hover:text-red-700 w-full text-left">Admin Page</button>
            </div>
          )}
        </div>
        <Link to="/logout" className="text-gray-600 no-underline hover:text-red-500 transition-colors duration-200 font-medium">Logout</Link>
      </div>
    </header>
  );
};

export default Header;