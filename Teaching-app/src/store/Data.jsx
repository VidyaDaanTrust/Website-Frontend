import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile();
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const userData = await api.auth.getProfile();
      setUser(userData);
      setError(null);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (username, password) => {
    try {
      setLoading(true);
      const data = await api.auth.login(username, password);
      await fetchUserProfile(); // Fetch user profile after successful login
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (userData) => {
    try {
      setLoading(true);
      const data = await api.auth.register(userData);
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    api.auth.logout();
    setUser(null);
  };

  const contextValue = {
    user,
    setUser,
    loading,
    error,
    loginUser,
    registerUser,
    logoutUser
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;