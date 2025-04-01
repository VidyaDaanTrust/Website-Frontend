// components/Home_UttarakhandProject/Home_UttarakhandProject.jsx
import React from "react";
import "../Home_About/Home_About.css";

// Asset imports
import IntensiveCoachingCamps2 from "../../assets/IntensiveCoachingCamps2.jpeg";

const Home_UttarakhandProject = () => {
    return (
        <div className="home-about-section uttarakhand-project-section">
            <div className="home-about-content">
                <span><h2>Uttarakhand Teaching Project</h2></span>
                <span className="home-about-text">
                    <p>
                        The Uttarakhand Teaching Project is an educational initiative launched in 2017 by J.P. Dabral
                        in collaboration with NSS IIT Delhi. The project aims to provide free and quality education
                        to students from rural and underprivileged areas of Uttarakhand.
                        Every year, a team of dedicated IIT Delhi students and volunteers travel to remote regions
                        of Uttarakhand during the summer to teach, mentor, and guide students preparing for their
                        school exams and competitive entrance tests like JEE, NEET, and other career paths.
                        Through this initiative, we bridge the educational gap by providing structured learning,
                        counseling, and mentorship to students who lack access to quality education.
                    </p>
                </span>
            </div>
            <span className="about-image">
                <img className='home-about-img' src={IntensiveCoachingCamps2} alt="intensive-coaching-camps" />
            </span>
        </div>
    );
};

export default Home_UttarakhandProject;