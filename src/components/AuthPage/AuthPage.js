import React from 'react';
import SignupForm from './SignupForm';
import { Link } from 'react-router-dom';

const AuthPage = ({ onShowLogin }) => { // onShowLogin is now directly handled by the Link to /login
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up for BagHaven</h2>
        <SignupForm onShowLogin={onShowLogin} /> {/* SignupForm still needs onShowLogin to redirect */}
        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline font-medium">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;