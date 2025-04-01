import React, { useState } from 'react'
import './TeachingPageReportCard.css'
import attachfileicon from '../../assets/attach-file-icon.svg'
import greaterthanicon from '../../assets/greaterthan-icon.svg'

const TeachingPageReportCard = (props) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    // Function to calculate time elapsed since the lastUpdated date
    const getTimeAgo = (lastUpdatedDate) => {
        if (!lastUpdatedDate) return '';

        const lastUpdated = new Date(lastUpdatedDate);
        const now = new Date();

        const seconds = Math.floor((now - lastUpdated) / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);

        if (years > 0) {
            return years === 1 ? '1 year ago' : `${years} years ago`;
        } else if (months > 0) {
            return months === 1 ? '1 month ago' : `${months} months ago`;
        } else if (days > 0) {
            return days === 1 ? '1 day ago' : `${days} days ago`;
        } else if (hours > 0) {
            return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
        } else if (minutes > 0) {
            return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
        } else {
            return seconds <= 5 ? 'just now' : `${seconds} seconds ago`;
        }
    };

    // Format the title based on available data
    const formatTitle = () => {
        if (props.placeName) {
            return `${props.placeName}, ${props.year}`;
        } else {
            return `Year ${props.year}`;
        }
    };

    return (
        <div className='TeachingPageCard-outer-container' onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <div className='TeachingPageCard-container'>
                <div className='attachment-icon-container' style={{
                    opacity: isHovered ? 0 : 1,
                    transition: 'opacity 0.3s ease'
                }}>
                    <img src={attachfileicon} alt="" />
                </div>
                <div className='TeachingPageCard-Content-container'>
                    <div className='TeachingPageCard-Content-Title'>
                        <div className="teaching-subtitle-text">{formatTitle()}</div>
                    </div>
                </div>
                <div className='arrow-icon-container' style={{
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.3s ease'
                }}>
                    <img src={greaterthanicon} alt="" />
                </div>
            </div>
        </div>

    )
}

export default TeachingPageReportCard