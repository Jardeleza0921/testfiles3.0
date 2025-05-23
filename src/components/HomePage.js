import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar'; // Main sidebar (user profile overview/admin nav)
import UserProfileSidebar from './UserProfile/UserProfileSidebar'; // Dedicated user profile navigation sidebar
import HomeSection from './HomeSection';
import ShopSection from './ShopSection';
import AboutUsSection from './AboutUsSection';
import CollectionSection from './CollectionSection';
import LogoutSection from './LogoutSection';
import ProfileInfo from './UserProfile/ProfileInfo';
import Addresses from './UserProfile/Addresses';
import Contacts from './UserProfile/Contacts';
import Coupons from './UserProfile/Coupons';
import Orders from './UserProfile/Orders';
import ShopHistory from './UserProfile/ShopHistory';
import Messages from './UserProfile/Messages';
import BackgroundImage from './BackgroundImage'; // Import the BackgroundImage component
import CartModal from './CartModal'; // Renamed and updated Receipt component

const HomePageContent = ({ onLogout, updateCart, cartItems, isSidebarOpen, isUserProfileSidebarOpen, removeFromCart, clearCart, onShowCart }) => {
  const location = useLocation();
  const isProfilePage = location.pathname.startsWith('/profile');
  const expandedSidebarWidth = '256px'; // Width of the expanded main sidebar
  const userProfileSidebarWidth = '256px'; // Default width of the user profile sidebar (adjust if needed)

  const mainContentStyle = {
    minHeight: 'calc(100vh - 64px)', // Adjust for header height
    padding: '1rem',
    // Dynamic marginLeft based on main sidebar visibility (when not on profile page)
    marginLeft: isSidebarOpen && !isProfilePage ? expandedSidebarWidth : '0',
    // Dynamic width based on main sidebar visibility (when not on profile page)
    width: `calc(100vw - ${isSidebarOpen && !isProfilePage ? expandedSidebarWidth : '0px'})`,
    transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out',
    // Use rgba to set transparency. Alpha value of 0.2 is 20% opacity, meaning 80% transparent.
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    position: 'fixed', // Fixed position relative to viewport
    top: '64px',      // Start below the header
    right: 0,
    bottom: 0,
    overflowY: 'auto', // Make content scrollable if it overflows
    zIndex: 1, // Ensure content is above the background (-1) but below sidebars (20, 40)
  };

  const profileContentStyle = {
    ...mainContentStyle, // Inherit base styles
    marginLeft: isUserProfileSidebarOpen ? userProfileSidebarWidth : '0', // Adjust for UserProfileSidebar
    width: `calc(100vw - ${isUserProfileSidebarOpen ? userProfileSidebarWidth : '0px'})`, // Adjust width for UserProfileSidebar
  };

  return (
    // The wrapper div for HomePageContent. It doesn't need fixed positioning here.
    <div className="w-full h-full relative">
      <div
        style={isProfilePage ? profileContentStyle : mainContentStyle}
        className="p-4"
      >
        <Routes>
          <Route path="/" element={<HomeSection />} />
          <Route path="/shop" element={<ShopSection updateCart={updateCart} />} />
          <Route path="/about-us" element={<AboutUsSection />} />
          <Route path="/collection" element={<CollectionSection />} />
          <Route path="/logout" element={<LogoutSection onLogout={onLogout} />} />

          {/* Nested Profile Routes using Outlet */}
          <Route path="/profile/*" element={<Outlet />} />
          <Route path="/profile" element={<ProfileInfo />} />
          <Route path="/profile/addresses" element={<Addresses />} />
          <Route path="/profile/contacts" element={<Contacts />} />
          <Route path="/profile/coupons" element={<Coupons />} />
          <Route path="/profile/orders" element={<Orders />} />
          <Route path="/profile/history" element={<ShopHistory />} />
          <Route path="/profile/messages" element={<Messages />} />

          <Route path="*" element={<div className="text-center"><h1 className="text-3xl font-bold mb-4 text-gray-800">Page Not Found</h1><p className="text-lg text-gray-600">The content you are looking for does not exist.</p></div>} />
        </Routes>
        {location.pathname === '/shop' && (
          <div className="bg-gray-100 p-4 rounded-lg text-right shadow-inner border border-gray-200 mt-4">
            <p className="text-lg font-semibold text-gray-700 mb-2">Total: ${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</p>
            <button
              onClick={onShowCart} // Trigger modal
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-200 text-lg shadow-md"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const HomePage = ({ onLogout, updateCart, removeFromCart, clearCart, cartItems, backgroundUrl }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Controls the main left sidebar
  const location = useLocation();
  // Controls the dedicated user profile navigation sidebar (appears on /profile routes)
  const [isUserProfileSidebarOpen, setIsUserProfileSidebarOpen] = useState(false); // Initially closed
  const [showCartModal, setShowCartModal] = useState(false); // State to control cart modal visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    // When main sidebar is toggled, ensure user profile sidebar is closed
    if (isUserProfileSidebarOpen) {
      setIsUserProfileSidebarOpen(false);
    }
  };

  const toggleUserProfileSidebar = () => {
    setIsUserProfileSidebarOpen(!isUserProfileSidebarOpen);
    // When user profile sidebar is toggled, ensure main sidebar is closed
    if (isSidebarOpen) { // Check if main sidebar is open
      setIsSidebarOpen(false); // Close main sidebar
    }
  };

  const handleShowCart = () => {
    setShowCartModal(true);
  };

  const handleCloseCart = () => {
    setShowCartModal(false);
  };

  useEffect(() => {
    // This effect ensures the profile sidebar state matches the route
    // and closes the main sidebar if navigating to a profile route.
    if (location.pathname.startsWith('/profile')) {
      setIsUserProfileSidebarOpen(true); // Open profile sidebar by default on profile routes
      setIsSidebarOpen(false); // Close main sidebar when on profile route
    } else {
      setIsUserProfileSidebarOpen(false); // Close profile sidebar when not on profile route
    }
  }, [location.pathname]); // Re-run when route changes

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background Image component covers the entire viewport */}
      <BackgroundImage imageUrl="/images/user-background.jpg" /> {/* Using user-background.jpg */}

      {/* Header is fixed at the top */}
      <Header
        onToggleSidebar={toggleSidebar}
        cartItemCount={cartItems.reduce((total, item) => total + item.quantity, 0)} // Pass total quantity
        onCartIconClick={handleShowCart} // Pass function to show cart modal
      />

      {/* Main Sidebar (for user profile overview or admin nav) */}
      {/* Only render if not on admin page, and let its 'isSidebarOpen' prop control visibility */}
      {!location.pathname.startsWith('/admin') && <Sidebar isSidebarOpen={isSidebarOpen} />}

      {/* User Profile Navigation Sidebar (only on /profile routes) */}
      {location.pathname.startsWith('/profile') && <UserProfileSidebar isUserProfileSidebarOpen={isUserProfileSidebarOpen} />}

      {/* Main content area */}
      <HomePageContent
        onLogout={onLogout}
        updateCart={updateCart}
        cartItems={cartItems}
        isSidebarOpen={isSidebarOpen} // Pass state to HomePageContent for margin adjustment
        isUserProfileSidebarOpen={isUserProfileSidebarOpen} // Pass state for margin adjustment
        removeFromCart={removeFromCart} // Pass to content for ShopSection
        clearCart={clearCart} // Pass to content for ShopSection
        onShowCart={handleShowCart} // Pass to content for ShopSection
      />

      {/* Cart Modal */}
      {showCartModal && (
        <CartModal
          cartItems={cartItems}
          onClose={handleCloseCart}
          onUpdateQuantity={updateCart} // Use updateCart to increase quantity
          onRemoveItem={removeFromCart} // Use removeFromCart to decrease/remove
          onClearCart={clearCart}
        />
      )}

      {location.pathname.startsWith('/profile') && (
        <button
          onClick={toggleUserProfileSidebar}
          className="fixed bottom-4 left-4 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none flex items-center"
          style={{ zIndex: 50 }} // Ensure it's on top of both sidebars
        >
          <span className="material-symbols-outlined text-xl mr-2">person</span>
          {isUserProfileSidebarOpen ? 'Hide Profile' : 'Show Profile'}
        </button>
      )}
      {/* The main sidebar toggle button (bottom right) was removed as per previous request */}
    </div>
  );
};

export default HomePage;