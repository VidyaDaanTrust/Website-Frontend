// components/Home_About/Home_About.jsx
import React from "react";
import { Link } from 'react-router-dom';
import './Home_About.css';

// Asset imports
import greaterthanicon from '../../assets/greaterthan-icon.svg';
import homeaboutimg from "../../assets/AboutUs_OurVision.png";

const Home_About = () => {
    return (
        <div className="home-about-section">
            <div className="home-about-content">
                <span><h2>About Us</h2></span>
                <span className="home-about-text">
                    <p>
                        The Himalayan Vidya Daan Trust was established with the mission to provide a platform
                        for serious science stream students of rural Uttarakhand to prepare for JEE, NEET and
                        other competitive programs. We aim to bridge the gap between opportunity and talent
                        by empowering students with access to quality education, mentoring and resources to
                        study for competitions.
                    </p>
                </span>
                <span>
                    <Link
                        to="/about-us"
                        className='contribution-banner-container-button home-about-learn-more'
                        onClick={() => window.scrollTo(0, 0)}
                        aria-label="Learn More about the himalayan vidya daan trust"
                    >
                        <span>Learn More</span>
                        <span className='contribution-banner-arrow-icon'>
                            <img src={greaterthanicon} alt="arrow icon" />
                        </span>
                    </Link>
                </span>
            </div>
            <div className="about-image">
                <img className='home-about-img' src={homeaboutimg} alt="students studying" />
            </div>
        </div>
    );
};

export default Home_About;