import React from 'react'

import { TeachingApproachData } from '../../../pages/Teaching/TeachingData';

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

const TeachingApproach = () => {
    return (
        <>
            <h2 className="TeachingHeadings">{TeachingApproachData.heading}</h2>
            <div className="TrusteesContainer TrusteesContainer-even ">
                <div className="TeachingProgramBox" >
                    <ul className="TeachingProgramsOuterText">
                        {TeachingApproachData.points.map((point, pointIndex) => renderListItem(point, pointIndex))}
                    </ul>
                </div>
                {renderImages(TeachingApproachData.images)}
            </div>
        </>
    )
}

export default TeachingApproach
