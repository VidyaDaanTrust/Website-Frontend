import React from 'react'
import './TeachingTestimonials.css'
import { TeachingTestimonialsData } from '../../../pages/Teaching/TeachingData';


const TeachingTestimonials = () => {
    return (
        <>
            <h2 className="TeachingHeadings">Testimonials</h2>
            <p className="TeachingDescription">
                How education transform lives in Uttarakhand
            </p>
            <div className='TeachingVolunteerExperienceGrid  TestimonialsGrid'>
                {TeachingTestimonialsData.map((testimonial, index) => (
                    <div
                        key={index}
                        className="TeachingTestimonialsContainer">
                        <div className='TeachingTestimonialstextBox'>
                            <h2 className="TeachingTestimonialsHeading">
                                {testimonial.name}
                            </h2>
                            <div className='TeachingTestimonialsDescription'>
                                <p>
                                    {testimonial.description}
                                </p>
                            </div>
                        </div>
                        <div className="TeachingTestimonialsImageContainer">
                            <img className='TeachingTestimonialsImage' src={testimonial.image} alt={testimonial.imageAlt} />
                        </div>
                    </div>
                ))}
            </div>

        </>
    )
}

export default TeachingTestimonials
