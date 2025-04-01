import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in on mount
        const token = localStorage.getItem('token');
        if (token) {
            // Token will be added via API interceptors
            checkAuthStatus();
        } else {
            setLoading(false);
        }
    }, []);

    const checkAuthStatus = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                // Use our profile endpoint to get user data
                const userData = await api.auth.getProfile();
                setCurrentUser(userData);
            }
        } catch (error) {
            console.error('Auth status check failed:', error);
            // Clear token on auth failure
            localStorage.removeItem('token');
            setCurrentUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (username, password) => {
        try {
            const data = await api.auth.login(username, password);
            if (data.token) {
                // Profile data comes with the login response
                setCurrentUser({
                    id: data.user_id,
                    username: data.username,
                    email: data.email,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    profile: data.profile || {}
                });
            }
            return data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            const data = await api.auth.register(userData);
            // Registration successful but we don't set the user yet
            // It will be set during the subsequent login
            return data;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    const logout = () => {
        api.auth.logout(); // This clears tokens in localStorage
        setCurrentUser(null);
    };

    const value = {
        currentUser,
        loading,
        login,
        register,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}; 