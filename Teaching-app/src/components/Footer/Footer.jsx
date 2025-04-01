import React from 'react';
import { Link } from 'react-router-dom';
import logo_footer from "../../assets/Trust-logo.svg";
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer-container">
      <div className="footer-main">
        <div className="footer-left">
          <div className="footer-logo">
            <img src={logo_footer} alt="Himalayan Vidya Daan Trust Logo" />
            <h2>HIMALAYAN VIDYA DAAN TRUST</h2>
          </div>
          <div className="social-icons">
            <a href="https://www.facebook.com/profile.php?id=61574070208813" target="_blank" rel="noopener noreferrer" className="social-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/vidyadaan_trust?igsh=MTllZmp1bGN0enp2YQ==" target="_blank" rel="noopener noreferrer" className="social-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
            </svg>
            </a>
            <a href="https://youtube.com/@vidyadaantrust?si=Xwu2qRk-R6pzXdeW" target="_blank" rel="noopener noreferrer" className="social-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/himalayan-vidya-daan-trust-7387b1355?trk=contact-info" target="_blank" rel="noopener noreferrer" className="social-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
        
        <div className="footer-menus">
          <div className="footer-menu-section">
            <h3 className="footer-heading">Trust overview</h3>
            <ul className="footer-menu-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about-us">About us</Link></li>
              <li><Link to="/teaching">Teaching</Link></li>
              <li><Link to="/trustees">Trustees</Link></li>
            </ul>
          </div>
          
          <div className="footer-menu-section">
            <h3 className="footer-heading">Quick links</h3>
            <ul className="footer-menu-list">
              <li><Link to="/mission">Mission</Link></li>
              <li><Link to="/vision">Vision</Link></li>
              <li><Link to="/founders-message">Founder's message</Link></li>
              <li><Link to="/programs">Programs</Link></li>
              <li><Link to="/teaching-methods">Teaching methods</Link></li>
              <li><Link to="/testimonials">Testimonials</Link></li>
              <li><Link to="/brochure-reports">Brochure & Reports</Link></li>
            </ul>
          </div>
          
          <div className="footer-menu-section">
            <h3 className="footer-heading">User access</h3>
            <ul className="footer-menu-list">
              <li><Link to="/for-students">For students</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/contact-us">Contact us</Link></li>
              <li><Link to="/get-involved">Get involved</Link></li>
              <li><Link to="/downloads">Downloads</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-divider"></div>
      
      <div className="footer-copyright">
        <p>&copy; {currentYear} Himalayan Vidya Daan Trust</p>
      </div>
    </footer>
  );
};

export default Footer;