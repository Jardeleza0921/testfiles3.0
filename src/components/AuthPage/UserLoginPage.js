import React, { useState } from 'react'; // Import useState
import LoginForm from './LoginForm'; // Import the now user-specific LoginForm
import { Link } from 'react-router-dom';
import SignupForm from './SignupForm'; // Import SignupForm

const UserLoginPage = ({ onLoginSuccess }) => {
  const [showSignup, setShowSignup] = useState(false); // State to toggle between Login and Signup forms

  const handleShowSignup = () => {
    setShowSignup(true);
  };

  const handleShowLogin = () => {
    setShowSignup(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {!showSignup ? (
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
          <LoginForm onLoginSuccess={onLoginSuccess} /> {/* LoginForm no longer needs 'type' */}
          <p className="text-center text-gray-600 text-sm mt-4">
            Don't have an account? <button onClick={handleShowSignup} className="text-red-600 hover:underline font-medium" style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}>Sign up</button>
          </p>
          <p className="text-center text-gray-600 text-sm mt-2">
            Are you an admin? <Link to="/admin/login" className="text-blue-600 hover:underline font-medium">Admin Login</Link>
          </p>
        </div>
      ) : (
        <SignupForm onShowLogin={handleShowLogin} />
      )}
    </div>
  );
};

export default UserLoginPage;