import React, { useContext } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../store/Data';
import './Dashboard.css';

const Dashboard = () => {
    const { currentUser, logout } = useAuth();
    const { user, logoutUser } = useContext(DataContext);
    const navigate = useNavigate();
    
    // Use data from either context (preferring AuthContext first if available)
    const userData = currentUser || user;

    const handleLogout = async () => {
        try {
            // Try both logout methods since we don't know which one is active
            if (logout) {
                await logout();
            }
            
            // Also call the DataContext logout if available
            if (logoutUser) {
                logoutUser();
            }
            
            navigate('/login');
        } catch (error) {
            console.error('Failed to log out:', error);
        }
    };

    if (!userData) {
        return <div className="dashboard-loading">Loading user data...</div>;
    }

    return (
        <div className="dashboard">
            <div className="dashboard-container">
                <h1>Welcome, {userData.name || userData.username || 'User'}!</h1>
                <div className="dashboard-content">
                    <div className="user-info">
                        <h2>Your Profile</h2>
                        <p><strong>Email:</strong> {userData.email}</p>
                        <p><strong>Name:</strong> {userData.name || userData.username}</p>
                        {userData.role && (
                            <p><strong>Role:</strong> {userData.role}</p>
                        )}
                    </div>
                    <div className="dashboard-actions">
                        <button onClick={handleLogout} className="logout-button">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 