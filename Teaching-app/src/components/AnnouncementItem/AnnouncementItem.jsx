import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AnnouncementItem.css';
import calendarlogo from '../../assets/bx-calendar.svg'
import arrowicon from '../../assets/bx-right-arrow-alt.svg'

const AnnouncementItem = ({ date, title, showDivider, announcement, comingFrom }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/announcement/${announcement.id}`, {
            state: {
                announcement,
                comingFrom: comingFrom,
            }
        });
        window.scrollTo(0, 0);
    };

    return (
        <div className="announcementItem-announcements-container">
            {showDivider && <div className="announcementItem-announcement-divider"></div>}
            <div className="announcementItem-announcement-item" onClick={handleClick}>
                <div className="announcementItem-announcement-header">
                    <div className="announcementItem-announcement-date-container">
                        <span><img className='announcementItem-announcement-calendar-logo' src={calendarlogo} alt="Calendar Logo" /></span> <span className='announcementItem-date-of-announcement'>{date}</span>
                    </div>
                    <span className="announcementItem-arrow-icon"><img className='announcementItem-announcement-arrow-icon' src={arrowicon} alt="arrow icon" /></span>
                </div>
                <div className="announcementItem-announcement-item-title">{title}</div>
            </div>
        </div>
    );
};

export default AnnouncementItem;