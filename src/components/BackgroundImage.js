// src/components/BackgroundImage.js
import React from 'react';

const BackgroundImage = ({ imageUrl, children }) => {
  const backgroundStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',    // Ensure full viewport height
    width: '100vw',        // Ensure full viewport width
    position: 'fixed',     // Fix the background to the viewport
    top: 0,
    left: 0,
    zIndex: -1,            // Place it behind all other content
  };

  return (
    // Apply background style if imageUrl is provided, otherwise just render children
    <div style={imageUrl ? backgroundStyle : {}}>
      {children}
    </div>
  );
};

export default BackgroundImage;