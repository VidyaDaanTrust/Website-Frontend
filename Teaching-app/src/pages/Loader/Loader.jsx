// src/components/Loader/Loader.jsx
import React, { useEffect, useState } from 'react';
import './Loader.css';
import Trust_logo from "../../assets/Trust-logo.svg";

const Loader = ({ onLoadComplete }) => {
  const [shutterUp, setShutterUp] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShutterUp(true);
      setTimeout(() => {
        if (onLoadComplete) onLoadComplete();
      }, 1000); // Wait for shutter animation to complete
    }, 1000); // Show loader for 1 second
    
    return () => clearTimeout(timer);
  }, [onLoadComplete]);
  
  return (
    <div className={`loader-container ${shutterUp ? 'shutter-up' : ''}`}>
      <div className="loader-content">
        <div className="loader-logo">
          {/* Using the imported Trust logo with white filter */}
          <img 
            src={Trust_logo} 
            alt="Himalayan Vidya Daan Trust Logo" 
            width="120" 
            height="120"
            className="white-logo" 
          />
        </div>
        <h1 className="loader-title">Himalayan Vidya Daan Trust</h1>
      </div>
    </div>
  );
};

export default Loader;