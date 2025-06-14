// components/Home_Announcements/Home_Announcements.jsx
import React, { useState, useEffect } from 'react';
import './Home_Announcements.css';
import AnnouncementItem from "../AnnouncementItem/AnnouncementItem.jsx";
import BackButton from "../BackButton/BackButton.jsx";
import { updateService } from '../../services/api';


const Home_Announcements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const formatTime = (dateString) => {
        try {
            const date = new Date(dateString);
            if (isNaN(date)) return null;
            return date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        } catch (e) {
            console.error('Error formatting time:', e);
            return null;
        }
    };

    // Fetch Announcements from Backend
    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                setLoading(true);
                setError(null);

                // Use updateService instead of api.announcements
                const response = await updateService.getByCamp();
                console.log('Fetched updates/announcements:', response);

                // Transform the data to match the expected format for AnnouncementItem
                const formattedAnnouncements = Array.isArray(response) ? response.map(update => ({
                    id: update.id,
                    date: formatDate(update.time || update.created_at),
                    title: update.title,
                    announcementDetails: [update.text],
                    // Add venue and time with fallbacks
                    venue: update.venue || 'Location information not available',
                    time: update.examTime || formatTime(update.time) || 'Time information not available',
                    // Store the original for reference
                    original: update
                })) : [];

                setAnnouncements(formattedAnnouncements);
            } catch (err) {
                console.error('Error fetching announcements:', err);
                setError('Failed to load announcements. Please try again later.');
                // Set fallback data in case of error
                setAnnouncements([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncements();
    }, []);

    // Helper function to format date to DD-MM-YYYY
    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            if (isNaN(date)) return 'Date not available';

            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();

            return `${day}-${month}-${year}`;
        } catch (e) {
            console.error('Error formatting date:', e);
            return 'Date not available';
        }
    };

    return (
        <div className="home-announcement-container">
            <div className="home-announcements-section">
                <h2>Latest Announcements</h2>
                <div className="view-all-link">
                    <BackButton to='/for-students' onClick={true} title='View All' />
                </div>
            </div>
            {/* extract first 5 announcements */}
            <div className="home-announcement-content announcementItem-announcements-container">
                {loading ? (
                    <div className="loading-message">Loading announcements...</div>
                ) : error ? (
                    <div className="error-message">{error}</div>
                ) : announcements.length > 0 ? (
                    announcements.map((announcement, index) => (
                        <AnnouncementItem
                            key={announcement.id}
                            date={announcement.date}
                            title={announcement.title}
                            showDivider={index > 0}
                            announcement={announcement}
                            comingFrom='/'
                        />
                    ))
                ) : (
                    <div className="no-data-message">No announcements available at this time.</div>
                )}
            </div>
        </div>
    );
};

export default Home_Announcements;