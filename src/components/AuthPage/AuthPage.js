import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthPage = ({ onLoginSuccess, type = 'user' }) => { // Added type prop, default to 'user'
  const [showSignup, setShowSignup] = useState(false);

  // For admin type, we will always show the LoginForm and hide SignupForm
  const shouldShowSignup = type === 'user' && showSignup;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {shouldShowSignup ? (
        <SignupForm onShowLogin={() => setShowSignup(false)} />
      ) : (
        <LoginForm onLoginSuccess={onLoginSuccess} onShowSignup={() => setShowSignup(true)} type={type} />
      )}
    </div>
  );
};

export default AuthPage;