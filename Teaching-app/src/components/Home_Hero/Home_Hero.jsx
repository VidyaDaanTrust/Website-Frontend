// components/Home_Hero/Home_Hero.jsx
import React from "react";
import { Link } from 'react-router-dom';
import './Home_Hero.css';

// Asset imports
import greaterthaniconwhite from '../../assets/greaterthan-icon-white.svg';
import heroimg1 from '../../assets/home-hero-section-img1.svg';
import heroimg2 from '../../assets/home-hero-section-img2.svg';
import heroimg3 from '../../assets/home-hero-section-img3.svg';

const Home_Hero = () => {
    return (
        <div className="home-hero-section-container">
            <div className="home-hero-section-content">
                <span className="home-hero-heading">
                    <h1>HIMALAYAN VIDYA DAAN TRUST</h1>
                </span>
                <span className="home-hero-title">
                    <h2>
                        Empowering young minds in the hills of{" "}
                        <span className="home-hero-section-uk">Uttarakhand</span>
                    </h2>
                </span>
                <span>
                    <p className="home-hero-description">
                        Welcome to Himalayan Vidya Daan Trust, where education transforms lives. Our mission is to uplift students in rural and border areas of Uttarakhand by providing access to free, quality education. Together, we are building a brighter future for the hill regions.
                    </p>
                </span>
                <Link
                    to="/get-involved"
                    className="home-join-cause-button"
                    onClick={() => window.scrollTo(0, 0)}
                >
                    <span>Join our cause</span>
                    <span className="contribution-banner-arrow-icon">
                        <img src={greaterthaniconwhite} alt="arrow icon" />
                    </span>
                </Link>
            </div>
            <div className="home-hero-section-images">
                <img className="home-hero-img1" src={heroimg1} alt="Students in classroom" />
                <div className="home-hero-img-row">
                    <img className="home-hero-img2" src={heroimg2} alt="Group of students" />
                    <img className="home-hero-img3" src={heroimg3} alt="Students learning" />
                </div>
            </div>
        </div>
    );
};

export default Home_Hero;