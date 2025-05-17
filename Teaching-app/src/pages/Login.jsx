import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const navigate = useNavigate();
  const { login, currentUser, error } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      // Check if user can access admin portal
      if (currentUser.can_access_admin) {
        navigate('/approval-pending');
      } else {
        // User is logged in but not approved yet
        navigate('/approval-pending');
      }
    }
  }, [currentUser, navigate]);

  // Update local error state when context error changes
  useEffect(() => {
    if (error) {
      setErrorMsg(error);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (!username.trim() || !password.trim()) {
      setErrorMsg('Please enter both username and password');
      return;
    }
    
    try {
      setLoading(true);
      const userData = await login(username, password);
      
      // Handle navigation based on approval status
      if (userData.can_access_admin) {
        navigate('/admin/dashboard');
      } else {
        navigate('/approval-pending');
      }
    } catch (error) {
      // Error is already handled in the AuthContext
      console.log('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <h2>Login</h2>
        
        {errorMsg && <div className="error-message">{errorMsg}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username or Email</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username or email"
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="form-footer">
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;