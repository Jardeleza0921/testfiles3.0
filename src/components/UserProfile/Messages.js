import React from 'react';

const Messages = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">My Messages</h2>
      {/* Display user's messages or notifications */}
      <ul>
        <li>New product announcement!</li>
        <li>Your order #12345 has shipped.</li>
        {/* ... more messages ... */}
      </ul>
    </div>
  );
};

export default Messages;