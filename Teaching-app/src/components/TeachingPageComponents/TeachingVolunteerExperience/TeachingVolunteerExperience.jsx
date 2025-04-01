import React from 'react'
import './TeachingVolunteerExperience.css'
import { TeachingVolunteerList } from '../../../pages/Teaching/TeachingData';


const TeachingVolunteerExperience = () => {
    return (
        <>
            <h2 className="TeachingHeadings">Volunteer Experience</h2>
            <div className="TeachingVolunteerExperienceGrid">
                {TeachingVolunteerList.map((volunteer, index) => (
                    <div className='TeachingVolunteerBox' key={index}>
                        <img
                            src={volunteer.image}
                            alt={volunteer.imageAlt}
                            className="TeachingVolunteerImage"
                        />
                        <h3 className="TeachingVolunteerHeading">{volunteer.name}</h3>
                        <p className="TeachingVolunteerText">{volunteer.description}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default TeachingVolunteerExperience
