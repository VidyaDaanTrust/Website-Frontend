// HomeVolunteerExperience.jsx
import React from 'react';
import CarouselTray from '../CarouselTray/CarouselTray';
import { TeachingVolunteerList } from '../../pages/Teaching/TeachingData';
import '../Home_Announcements/Home_Announcements.css';
import './Home_VolunteerExperience.css';
import '../TeachingPageComponents/TeachingVolunteerExperience/TeachingVolunteerExperience.css';
import BackButton from '../BackButton/BackButton.jsx';

const HomeVolunteerExperience = () => {
    const renderCard = (volunteerObject) => (
        <div className="home-volunteer-box">
            <img
                className='home-TeachingVolunteerImage'
                src={volunteerObject.image}
                alt={volunteerObject.altImage || volunteerObject.name}
            />
            <div className="home-TeachingVolunteerHeading">
                {volunteerObject.name}
            </div>
            <div className="home-TeachingVolunteerText">
                {volunteerObject.description}
            </div>
        </div>
    );

    return (
        <div className="home-volunteer-experience">
            <div className="home-announcements-section home-volunteer-header" >
                <span>
                    <h2 className="home-volunteer-heading">Volunteer Experience</h2>
                </span>
                <div className="view-all-link">
                    <BackButton to='/teaching' onClick={true} title='View All' />
                </div>
            </div>
            <CarouselTray
                items={TeachingVolunteerList}
                renderCard={renderCard}
                cardsPerViewConfig={{ desktop: 2, mobile: 2 }}
            />
        </div>
    );
};

export default HomeVolunteerExperience;