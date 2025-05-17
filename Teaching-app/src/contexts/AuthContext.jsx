import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// API base URL
const API_URL = 'http://localhost:8000/api';

// Create context
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      const userData = JSON.parse(storedUser);
      setCurrentUser(userData);
      
      // Set default Authorization header for all requests
      axios.defaults.headers.common['Authorization'] = `Token ${storedToken}`;
    }
    
    setLoading(false);
  }, []);

  // Configure axios to include CSRF token
  useEffect(() => {
    // Get CSRF token
    const getCsrfToken = async () => {
      try {
        const response = await axios.get(`${API_URL}/csrf/`, { withCredentials: true });
        console.log('CSRF token fetched');
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };
    
    getCsrfToken();
    
    // Add request interceptor to include CSRF token
    axios.interceptors.request.use(
      config => {
        const csrfToken = document.cookie
          .split('; ')
          .find(row => row.startsWith('csrftoken='))
          ?.split('=')[1];
          
        if (csrfToken) {
          config.headers['X-CSRFToken'] = csrfToken;
        }
        
        return config;
      },
      error => Promise.reject(error)
    );
  }, []);

  // Login function
  const login = async (username, password) => {
    try {
      setError(null);
      const response = await axios.post(`${API_URL}/login/`, { username, password }, {
        withCredentials: true,
      });
      
      const userData = response.data;
      
      // Store token and user data
      localStorage.setItem('token', userData.token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Set Authorization header for subsequent requests
      axios.defaults.headers.common['Authorization'] = `Token ${userData.token}`;
      
      setCurrentUser(userData);
      return userData;
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.error || 'Login failed. Please try again.');
      throw error;
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setError(null);
      const response = await axios.post(`${API_URL}/register/`, userData);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.response?.data?.error || 'Registration failed. Please try again.');
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post(`${API_URL}/logout/`);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Remove data from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Remove Authorization header
      delete axios.defaults.headers.common['Authorization'];
      
      setCurrentUser(null);
    }
  };

  // Check user's approval status
  const checkApprovalStatus = async () => {
    try {
      const response = await axios.get(`${API_URL}/check-approval-status/`);
      return response.data;
    } catch (error) {
      console.error('Error checking approval status:', error);
      throw error;
    }
  };

  // Value to be provided by context
  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    checkApprovalStatus,
    isCoordinator: currentUser?.profile?.role === 'Coordinator',
    isSlotCoordinator: currentUser?.profile?.role === 'Slot Coordinator',
    canAccessAdmin: currentUser?.can_access_admin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}