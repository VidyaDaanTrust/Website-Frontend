import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContactComponent.css';
import locationicon from "../../assets/location-icon.svg";
import phoneicon from "../../assets/bxs-phone.svg";
import mailicon from "../../assets/bxl-gmail.svg";
import api from '../../services/api';

// Create a dedicated axios instance for the form submission
const formAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

const ContactComponent = ({ contactData }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
    const [csrfToken, setCsrfToken] = useState('');

    // Get CSRF token from cookies
    const getCsrfToken = () => {
        const name = 'csrftoken';
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith(name))
            ?.split('=')[1];
        return cookieValue;
    };

    // Fetch CSRF token on component mount
    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/csrf/`, {
                    withCredentials: true
                });
                const token = getCsrfToken();
                if (token) {
                    setCsrfToken(token);
                    console.log('CSRF token obtained:', token);
                }
            } catch (error) {
                console.warn('Failed to get CSRF token:', error);
            }
        };

        fetchCsrfToken();
    }, []);

    // Clear success message after 2 seconds
    useEffect(() => {
        let timer;
        if (submitStatus.type === 'success') {
            timer = setTimeout(() => {
                setSubmitStatus({ type: '', message: '' });
            }, 2000);
        }
        return () => clearTimeout(timer);
    }, [submitStatus]);

    // Function to generate Google Maps URL from address
    const getGoogleMapsUrl = (address) => {
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name.replace('contact-', '')]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: '', message: '' });

        try {
            // Prepare contact data
            const contactData = {
                name: `${formData.firstName} ${formData.lastName}`.trim(),
                email: formData.email,
                subject: formData.subject,
                message: formData.message
            };

            // Try using the api service directly first
            try {
                await api.contact.submitForm(contactData);
            } catch (apiError) {
                console.warn('Failed with API service, trying direct axios:', apiError);

                // If that fails, try direct axios call
                const response = await formAxios.post('/contact/', contactData, {
                    headers: {
                        'X-CSRFToken': csrfToken || getCsrfToken()
                    }
                });

                console.log('Contact form submission response:', response);
            }

            setSubmitStatus({
                type: 'success',
                message: 'Message sent successfully! We will get back to you soon.'
            });

            // Clear form
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                subject: '',
                message: ''
            });
        } catch (error) {
            console.error('Contact form submission error:', error);
            setSubmitStatus({
                type: 'error',
                message: error.message || 'Failed to send message. Please try again later.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="contact-component-container">
            <div className="contact-info-container">
                <h1>Contact us</h1>
                <p>Any question or remarks? Write us a message!</p>
                <div className='contact-info'>
                    <div className="contact-info-box">
                        <div className='contact-info-header'>
                            <span>
                                <img className="contact-info-image contact-info-location-icon" src={locationicon} alt="" />
                            </span>
                            <span>Address:</span>
                        </div>
                        <a
                            href={getGoogleMapsUrl(contactData.contactAddress)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-link"
                        >
                            <div className='contact-info-content'>{contactData.contactAddress}</div>
                        </a>
                    </div>
                    <div className="contact-info-box">
                        <div className='contact-info-header'>
                            <span>
                                <img className="contact-info-image" src={phoneicon} alt="" />
                            </span>
                            <span>Phone:</span>
                        </div>
                        <a
                            href={`tel:${contactData.contactPhone.replace(/[^0-9+]/g, '')}`}
                            className="contact-link"
                        >
                            <div className='contact-info-content'>{contactData.contactPhone}</div>
                        </a>
                    </div>
                    <div className="contact-info-box">
                        <div className='contact-info-header'>
                            <span>
                                <img className="contact-info-image" src={mailicon} alt="" />
                            </span>
                            <span>Email:</span>
                        </div>
                        <a
                            href={`mailto:${contactData.contactMail}`}
                            className="contact-link"
                        >
                            <div className='contact-info-content'>{contactData.contactMail}</div>
                        </a>
                    </div>
                </div>
            </div>

            <form className="contact-us-contact-form" onSubmit={handleSubmit}>
                <div className="contact-us-name-group">
                    <span>
                        <label htmlFor="contact-us-contact-firstName">First Name</label>
                        <input
                            type="text"
                            placeholder=""
                            name='contact-firstName'
                            id='contact-us-contact-firstName'
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                        />
                    </span>
                    <span>
                        <label htmlFor="contact-us-contact-lastName">Last Name</label>
                        <input
                            type="text"
                            placeholder=""
                            name='contact-lastName'
                            id='contact-us-contact-lastName'
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                        />
                    </span>
                </div>

                <div className="contact-us-form-group">
                    <label htmlFor="contact-us-contact-email">Email</label>
                    <input
                        type="email"
                        placeholder=""
                        id='contact-us-contact-email'
                        name='contact-email'
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="contact-us-form-group">
                    <label htmlFor="contact-us-contact-subject">Subject</label>
                    <input
                        type="text"
                        placeholder=""
                        id='contact-us-contact-subject'
                        name='contact-subject'
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="contact-us-form-group">
                    <label htmlFor="contact-us-contact-message">Message</label>
                    <textarea
                        placeholder=""
                        id='contact-us-contact-message'
                        name='contact-message'
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>

                {submitStatus.message && (
                    <div className={`submit-status ${submitStatus.type}`}>
                        {submitStatus.message}
                    </div>
                )}

                <button
                    type="submit"
                    className="contact-us-send-btn"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
            </form>
        </div>
    );
};

export default ContactComponent;