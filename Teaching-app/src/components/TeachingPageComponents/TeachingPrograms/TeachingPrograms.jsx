import React from 'react'
import './TeachingPrograms.css'
import { TeachingProgramsData } from '../../../pages/Teaching/TeachingData';

const renderImages = (images, className = "TeachingProgramsImageBox") => {
    return (
        <div className={className}>
            {images.map((img, idx) => (
                <img
                    key={idx}
                    src={img.src}
                    alt={img.alt}
                    className="TeachingProgramsImages"
                />
            ))}
        </div>
    );
};
const renderListItem = (item, index) => {
    return (
        <li key={index}>
            {item.label && <b>{item.label}: </b>}
            {item.text}
            {item.subPoints && (
                <ul className="TeachingProgramsInnerText">
                    {item.subPoints.map((subItem, subIndex) => renderListItem(subItem, subIndex))}
                </ul>
            )}
        </li>
    );
};

const TeachingPrograms = () => {
    return (
        <>
            <h2 className="TeachingHeadings">Our programs</h2>
            {TeachingProgramsData.map((program, index) => (
                <div className={`TrusteesContainer ${index % 2 === 0 ? 'TrusteesContainer-even' : 'TrusteesContainer-odd'}`}
                    key={program.id}
                >
                    <div className='TeachingProgramBox'>
                        <div className="TrusteesNumberHeading">{program.number}</div>
                        <h2 className="TeachingProgramsNameHeading"> {program.name} </h2>
                        <ul className="TeachingProgramsOuterText">
                            {program.points.map((point, pointIndex) => renderListItem(point, pointIndex))}
                        </ul>
                    </div>
                    {renderImages(program.images)}
                </div>
            ))}
        </>
    )
}

export default TeachingPrograms
