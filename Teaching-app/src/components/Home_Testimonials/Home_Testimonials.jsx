// Testimonials.jsx
import React from 'react';
import '../Testimonials/Testimonials.css';
import '../Home_Announcements/Home_Announcements.css';
import './Home_Testimonials.css';
import CarouselTray from '../CarouselTray/CarouselTray';
import { TeachingTestimonialsData } from '../../pages/Teaching/TeachingData.jsx';
import BackButton from '../BackButton/BackButton.jsx';

const Testimonials = () => {
    const renderTestimonialCard = (testimonial) => (
        <div className="HomeTeachingTestimonialsBox">
            <span className='HomeTeachingTestimonialsHeader'>
                <img className='HomeTeachingTestimonialsImage' src={testimonial.image} alt={testimonial.imageAlt} />
                <span className='HomeTeachingTestimonialsDescription'>
                    {testimonial.description}
                </span>
            </span>
            <div className="HomeTeachingTestimonialsNameContainer">
                <div className="HomeTeachingTestimonialsName">
                    {testimonial.name}
                </div>
            </div>
        </div>
    );

    return (
        <div className="HomeTeachingTestimonials">
            <div className="home-announcements-section">
                <h2 className="HomeTeachingHeadings" id="Testimonials">Testimonials</h2>
                <div className="view-all-link">
                    <BackButton to='/teaching' title='View All' />
                </div>
            </div>
            <p className="HomeTeachingDescription">
                How education transform lives in Uttarakhand
            </p>
            <CarouselTray
                items={TeachingTestimonialsData}
                renderCard={renderTestimonialCard}
                cardsPerViewConfig={{ desktop: 2, mobile: 1 }}
            />
        </div>
    );
};

export default Testimonials;