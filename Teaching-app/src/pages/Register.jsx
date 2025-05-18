import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout/AuthLayout';
import { useAuth } from '../contexts/AuthContext';
import { DataContext } from '../store/Data';
import axios from 'axios';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        entryNumber: '',
        webmail: '',
        mobileNumber: '',
        password: '',
        confirmPassword: '',
        role: 'Coordinator' // Set default role to Coordinator
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
    const navigate = useNavigate();
    
    // Get methods from both contexts
    const { register, login } = useAuth();
    const { registerUser } = useContext(DataContext);
    
    // Reference for closing dropdown when clicking outside
    const roleDropdownRef = React.useRef(null);

    // Effect to handle closing role dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (roleDropdownRef.current && !roleDropdownRef.current.contains(event.target)) {
                setIsRoleDropdownOpen(false);
            }
        }
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Clear success message after 2 seconds
    useEffect(() => {
        let timer;
        if (success) {
            timer = setTimeout(() => {
                setSuccess('');
                navigate('/dashboard');
            }, 2000);
        }
        return () => clearTimeout(timer);
    }, [success, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const toggleRoleDropdown = () => {
        setIsRoleDropdownOpen(!isRoleDropdownOpen);
    };
    
    const selectRole = (role) => {
        setFormData(prev => ({
            ...prev,
            role
        }));
        setIsRoleDropdownOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        // Validate mobile number (should be 10 digits)
        if (formData.mobileNumber && formData.mobileNumber.replace(/\D/g, '').length !== 10) {
            setError('Mobile number should be 10 digits');
            setLoading(false);
            return;
        }

        try {
            // Get CSRF token first
            try {
                await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/csrf/`, { 
                    withCredentials: true 
                });
            } catch (csrfError) {
                console.warn('Failed to get CSRF token:', csrfError);
            }

            // Generate username from name instead of webmail to avoid issues
            const username = (formData.firstName + formData.lastName).toLowerCase().replace(/\s+/g, '');

            // Prepare user data
            const userData = {
                first_name: formData.firstName,
                last_name: formData.lastName,
                username: username,
                email: formData.webmail,         // primary email
                entry_number: formData.entryNumber,
                mobile_number: formData.mobileNumber,
                password: formData.password,
                password2: formData.confirmPassword,
                webmail: formData.webmail,       // webmail also separately
                role: formData.role              // Include the role
            };

            console.log('Sending registration data:', userData);

            // Try registration through DataContext first
            if (registerUser) {
                const result = await registerUser(userData);
                setSuccess('Registration successful! Redirecting to dashboard...');
                
                // Once registered successfully, handle login through the same API service
                try {
                    // Login directly with the username and password after successful registration
                    await login(username, formData.password);
                } catch (loginError) {
                    console.warn('Login after registration failed:', loginError);
                    // Continue without error since registration was successful
                }
                
                // Redirect after successful registration even if login fails
                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000);
            } else {
                throw new Error('Registration functionality is not available');
            }
        } catch (err) {
            // Extract the error message from the error object
            let errorMessage = 'Failed to create an account. Please try again.';
            
            if (err.response) {
                // Server responded with an error
                if (err.response.data.error) {
                    if (typeof err.response.data.error === 'string') {
                        errorMessage = err.response.data.error;
                    } else if (typeof err.response.data.error === 'object') {
                        // Format validation errors
                        const errors = Object.entries(err.response.data.error)
                            .map(([key, value]) => `${key}: ${value}`)
                            .join(', ');
                        errorMessage = `Validation errors: ${errors}`;
                    }
                } else if (err.response.data.detail) {
                    errorMessage = err.response.data.detail;
                }
            } else if (err.message) {
                errorMessage = err.message;
            }
            
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        // <AuthLayout>
            <div className="register-page">
                <div className="register-container">
                    <h2 className="register-heading">Create an Account</h2>
                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}
                    
                    <form onSubmit={handleSubmit}>
                        <div className="form-section">
                            <h3>Personal Details</h3>
                            
                            <div className="form-group">
                                <label htmlFor="firstName">First name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="lastName">Last name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="entryNumber">IITD's Entry number</label>
                                <input
                                    type="text"
                                    id="entryNumber"
                                    name="entryNumber"
                                    value={formData.entryNumber}
                                    onChange={handleChange}
                                    placeholder="e.g., 2020XX10000"
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="webmail">Webmail</label>
                                <input
                                    type="email"
                                    id="webmail"
                                    name="webmail"
                                    value={formData.webmail}
                                    onChange={handleChange}
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="mobileNumber">Contact number</label>
                                <div className="phone-input">
                                    <span className="country-code">+91</span>
                                    <input
                                        type="tel"
                                        id="mobileNumber"
                                        name="mobileNumber"
                                        value={formData.mobileNumber}
                                        onChange={handleChange}
                                        placeholder="10-digit number"
                                        pattern="[0-9]{10}"
                                        required
                                    />
                                </div>
                            </div>
                            
                            {/* Role dropdown */}
                            <div className="form-group">
                                <label htmlFor="role">Role</label>
                                <div className="custom-dropdown" ref={roleDropdownRef}>
                                    <div 
                                        className="dropdown-header" 
                                        onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                                    >
                                        {formData.role}
                                        <span className={`dropdown-arrow ${isRoleDropdownOpen ? 'open' : ''}`}>▼</span>
                                    </div>
                                    {isRoleDropdownOpen && (
                                        <div className="dropdown-menu">
                                            <div 
                                                className="dropdown-item" 
                                                onClick={() => {
                                                    setFormData({...formData, role: 'Coordinator'});
                                                    setIsRoleDropdownOpen(false);
                                                }}
                                            >
                                                Coordinator
                                            </div>
                                            <div 
                                                className="dropdown-item" 
                                                onClick={() => {
                                                    setFormData({...formData, role: 'Slot Coordinator'});
                                                    setIsRoleDropdownOpen(false);
                                                }}
                                            >
                                                Slot Coordinator
                                            </div>
                                            <div 
                                                className="dropdown-item" 
                                                onClick={() => {
                                                    setFormData({...formData, role: 'Student'});
                                                    setIsRoleDropdownOpen(false);
                                                }}
                                            >
                                                Student
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        <div className="form-section">
                            <h3>Security</h3>
                            
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    minLength="8"
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    minLength="8"
                                />
                            </div>
                        </div>
                        
                        <div className="form-actions">
                            <button type="submit" className="register-button" disabled={loading}>
                                {loading ? 'Creating account...' : 'Create Account'}
                            </button>
                        </div>
                        
                        <div className="register-footer">
                            Already have an account? <Link to="/login">Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        // </AuthLayout>
    );
};

export default Register; 