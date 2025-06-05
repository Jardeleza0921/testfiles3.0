import React from 'react';

// A hypothetical MessageCard component for individual messages
// You'd create this in a separate file (e.g., MessageCard.js)
const MessageCard = ({ sender, message, timestamp, isUser }) => {
  const messageClasses = isUser
    ? 'bg-blue-500 text-white rounded-lg p-2 max-w-[70%] self-end'
    : 'bg-gray-200 text-gray-800 rounded-lg p-2 max-w-[70%] self-start';

  const timeClasses = isUser
    ? 'text-xs text-white text-right mt-1'
    : 'text-xs text-gray-500 text-left mt-1';

  return (
    <div className={`flex flex-col mb-3 ${isUser ? 'items-end' : 'items-start'}`}>
      {!isUser && <span className="text-sm font-semibold text-gray-700 mb-1">{sender}</span>}
      <div className={messageClasses}>
        {message}
      </div>
      <span className={timeClasses}>
        {timestamp}
      </span>
    </div>
  );
};

const Messages = () => {
  // Sample messages to demonstrate the improved display
  const messages = [
    {
      id: 1,
      sender: 'Admin',
      message: 'New product announcement! Check out our latest arrivals.',
      timestamp: '2:00 PM',
      isUser: false, // This message is from the admin
    },
    {
      id: 2,
      sender: 'You',
      message: 'Awesome! Can I get more details on the new features?',
      timestamp: '2:05 PM',
      isUser: true, // This message is from the current user
    },
    {
      id: 3,
      sender: 'Support',
      message: 'Your order #12345 has shipped and is expected to arrive by Friday.',
      timestamp: 'Yesterday',
      isUser: false,
    },
    {
      id: 4,
      sender: 'You',
      message: 'Great, thanks for the update!',
      timestamp: 'Yesterday',
      isUser: true,
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800">My Messages</h2>
      </div>

      {/* Message List Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <MessageCard
            key={msg.id}
            sender={msg.sender}
            message={msg.message}
            timestamp={msg.timestamp}
            isUser={msg.isUser}
          />
        ))}
      </div>

      {/* Message Input (Placeholder) */}
      <div className="bg-white border-t border-gray-200 p-4">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* You'd typically have a send button here too */}
      </div>
    </div>
  );
};

export default Messages;