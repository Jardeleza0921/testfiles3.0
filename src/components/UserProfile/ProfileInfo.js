import React from 'react';

const ProfileInfo = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Information</h2>
      {/* Display user profile details here */}
      <p>Name: John Doe</p>
      <p>Email: john.doe@example.com</p>
      {/* ... more profile info ... */}
    </div>
  );
};

export default ProfileInfo;