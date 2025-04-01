import React from 'react';
import './MessageContainer.css'; // Make sure the filename matches

const MessageContainer = (props) => {
  const { title, photo, message, name, position } = props;
  
  return (
    <div className="message-container">
      {/* Header with title */}
      <hr />
      <div className="message-header">
        <h2>{title}</h2>
      </div>
      
      {/* Main content container */}
      <div className="message-content">
        {/* Person's photo */}
        <div className="person-photo">
          <img 
            src={photo} 
            alt={`${name}'s photo`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/250x300?text=Photo";
            }}
          />
        </div>
        
        {/* Message text */}
        <div className="message-text">
          {/* Map through message paragraphs for easy maintenance */}
          {message.map((paragraph, index) => (
            <p key={index}>
              {paragraph}
            </p>
          ))}
          
          {/* Signature */}

          
          <p className="signature" id='signature'>
            - {name}
            {position && `, ${position}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;