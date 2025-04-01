// components/Home_Programs/Home_Programs.jsx
import React from "react";
import { useNavigate } from 'react-router-dom';
import './Home_Programs.css';
import CarouselTray from '../CarouselTray/CarouselTray';

import IntensiveCoachingCamps2 from "../../assets/IntensiveCoachingCamps2.jpeg";
import arrowicon from '../../assets/bx-right-arrow-alt.svg';

// Sample program data
const programs = [
    { id: 1, title: "Intensive coaching camps", image: IntensiveCoachingCamps2, link: "/programs/intensive-coaching" },
    { id: 2, title: "Weekly and surprise tests", image: IntensiveCoachingCamps2, link: "/programs/weekly-tests" },
    { id: 3, title: "Mentorship Program", image: IntensiveCoachingCamps2, link: "/programs/mentorship" },
];


const Home_Programs = () => {
    const navigate = useNavigate();

    const handleClick = (link) => {
        navigate(link, { state: { programs } });
    };

    const renderProgramCard = (program) => (
        <div
            className="program-card"
            onClick={() => handleClick(program.link)}
        >
            <div className="program-image">
                <img src={program.image} alt={program.title} />
            </div>
            <div className="program-content">
                <h3>{program.title}</h3>
                <span className="announcementItem-arrow-icon">
                    <img
                        className='announcementItem-announcement-arrow-icon home-programs-arrow'
                        src={arrowicon}
                        alt="arrow icon"
                    />
                </span>
            </div>
        </div>
    );

    return (
        <div className="programs-section">
            <h2>Programs</h2>
            <CarouselTray
                items={programs}
                renderCard={renderProgramCard}
                cardsPerViewConfig={{ desktop: 2, mobile: 1 }}
            />
        </div>
    );
};

export default Home_Programs;