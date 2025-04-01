import React, { useContext } from 'react';
import { DataContext } from '../../store/Data';
import './ApiStatus.css';

const ApiStatus = () => {
    const { error } = useContext(DataContext);
    
    // If no error, don't show anything
    if (!error) return null;
    
    return (
        <div className="api-status-container">
            <div className="api-status-message error">
                <h3>Backend Connection Issue</h3>
                <p>The application encountered an error. Some features may not work correctly.</p>
                {error && <p className="error-details">Error: {error}</p>}
                <p>Please make sure the backend server is running at {import.meta.env.VITE_API_URL || 'http://localhost:8001/api'}</p>
            </div>
        </div>
    );
};

export default ApiStatus; 