import React from 'react';
import { useLocation } from 'react-router-dom';
import calendarlogo from '../../assets/bx-calendar.svg'
import './AnnouncementDetails.css';
import { Link } from 'react-router-dom';
import BackButton from '../BackButton/BackButton';

const AnnouncementDetails = () => {
    const location = useLocation();
    const announcement = location.state?.announcement || location.state?.option;
    const comingFrom = location.state?.comingFrom || '/';

    if (!announcement) {
        return <div>No data found.</div>;
    }

    return (
        <div className="announcement-details-container">
            {/* Announcement Content */}
            <div className="announcement-details-announcement-content">
                {/* Breadcrumb Navigation */}
                <div className="breadcrumb">
                    <Link to="/" className="breadcrumb-link">Home</Link>
                    <span className="breadcrumb-separator">&gt;</span>
                    <Link to="/for-students" className="breadcrumb-link">For students</Link>
                    <span className="breadcrumb-separator">&gt;</span>
                    <span className="breadcrumb-current">Announcement Details</span>
                </div>
                <BackButton to={comingFrom} />

                {announcement.date && (
                    <div className="announcement-details-announcement-date">
                        <span>
                            <img className='announcement-details-calendar-icon' src={calendarlogo} alt="Calendar Logo" />
                        </span>
                        <span>
                            {announcement.date}
                        </span>
                    </div>
                )}

                {announcement.title && (
                    <h1 className="announcement-details-announcement-title">{announcement.title}</h1>
                )}

                {(announcement.announcementDetails || announcement.desc) && (
                    <div className="announcement-details-announcement-message">
                        <p>
                            {announcement.announcementDetails || announcement.desc}
                        </p>
                    </div>
                )}

                {(announcement.venue || announcement.time) && (
                    <div className="announcement-details-important-info">
                        <h2>Important information:</h2>
                        {announcement.venue && <p>Venue: {announcement.venue}</p>}
                        {announcement.time && <p>Time: {announcement.time}</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnnouncementDetails;