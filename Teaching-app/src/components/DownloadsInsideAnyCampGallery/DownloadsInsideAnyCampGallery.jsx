import React, { useState, useEffect } from 'react';
import { useLocation, useParams, Link, useNavigate } from 'react-router-dom';
import './DownloadsInsideAnyCampGallery.css';
import BackButton from '../BackButton/BackButton';
import circleArrow from '../../assets/arrow-with-filled-circle.svg';
import circleArrowColor from '../../assets/arrow-with-filled-circle-colored.svg';
import { galleryService } from '../../services/api';

const DownloadsInsideAnyCampGallery = () => {
    const location = useLocation();
    const params = useParams();
    const [activeTab, setActiveTab] = useState('regularclasses');
    const [galleryData, setGalleryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Extract camp information from location state or URL params
    const campData = location.state || {};
    const campId = campData.campId;
    const campLocation = campData.location || params.location?.replace(/-/g, ' ') || "Camp";

    // Define tabs order for navigation
    const tabsOrder = ['regularclasses', 'doubts', 'exams'];

    useEffect(() => {
        const fetchGalleryData = async () => {
            try {
                setLoading(true);
                setError(null);

                // If we have gallery data in state, use it
                if (campData.DownloadsInsideAnyCampGalleryData &&
                    campData.DownloadsInsideAnyCampGalleryData.length > 0) {
                    setGalleryData(campData.DownloadsInsideAnyCampGalleryData);
                    setLoading(false);
                    return;
                }

                // Otherwise fetch it using the campId
                if (campId) {
                    // Use the new API endpoint to get gallery by camp
                    const response = await galleryService.getByCamp(campId);
                    setGalleryData(response);
                } else {
                    // Fallback to location-based filtering (for backward compatibility)
                    const response = await galleryService.getAll({
                        location: campLocation
                    });
                    setGalleryData(response);
                }
            } catch (err) {
                console.error('Error fetching gallery data:', err);
                setError('Failed to load gallery images. Please try again later.');
                setGalleryData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchGalleryData();
    }, [campId, campData, campLocation]);

    // Filter gallery data by active tab (type)
    const filteredGalleryData = galleryData.filter(item =>
        (item.type || item.category) === activeTab
    );

    // Get the current tab index for navigation
    const currentTabIndex = tabsOrder.indexOf(activeTab);

    // Navigate to previous tab
    const goToPreviousTab = () => {
        if (currentTabIndex > 0) {
            setActiveTab(tabsOrder[currentTabIndex - 1]);
        }
    };

    // Navigate to next tab
    const goToNextTab = () => {
        if (currentTabIndex < tabsOrder.length - 1) {
            setActiveTab(tabsOrder[currentTabIndex + 1]);
        }
    };

    // If there's an error or no data, show appropriate message
    if (error || (!loading && (!galleryData || galleryData.length === 0))) {
        return (
            <div className="GalleryPage-container">
                <div className="no-data-message">
                    <h2>No Gallery Images Found</h2>
                    <p>Please return to the downloads page and select a gallery.</p>
                    <Link to="/" className="return-link">Return to Camps</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="GalleryPage-container">
            <div className="GalleryPage-header">
                <div className="camps-header">
                    <h2 className="camps-title">Gallery</h2>
                </div>
                <p>Browse through our collection of images from various events and activities.</p>
            </div>

            {loading ? (
                <div className="loading-message">Loading gallery images...</div>
            ) : (
                <>
                    <div className="GalleryPage-tabs-container">
                        <div className="GalleryPage-resource-tabs">
                            <div
                                className={`GalleryPage-tab ${activeTab === 'regularclasses' ? 'active' : ''}`}
                                onClick={() => setActiveTab('regularclasses')}
                            >
                                Regular Classes
                            </div>
                            <div
                                className={`GalleryPage-tab ${activeTab === 'doubts' ? 'active' : ''}`}
                                onClick={() => setActiveTab('doubts')}
                            >
                                Doubt Sessions
                            </div>
                            <div
                                className={`GalleryPage-tab ${activeTab === 'exams' ? 'active' : ''}`}
                                onClick={() => setActiveTab('exams')}
                            >
                                Exams
                            </div>
                        </div>

                        <div className="GalleryPage-tab-content">
                            {filteredGalleryData.length > 0 ? (
                                filteredGalleryData.map((item) => (
                                    <div className="GalleryPageData-image-container" key={item.id}>
                                        {/* Image with tooltip functionality */}
                                        <div className="image-tooltip-wrapper">
                                            <img
                                                src={item.imageUrl}
                                                alt={item.title || 'Gallery image'}
                                                className="GalleryPageData-image"
                                            />
                                            <div className="image-tooltip">
                                                <h3>{item.title || 'Untitled'}</h3>
                                                <p>{item.description || 'No description available'}</p>
                                                <p className="image-date">{item.date || 'Date not available'}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="no-images-message">
                                    No images available for this category.
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="GalleryPageData-tab-change">
                        <button
                            className="tab-change-button left"
                            onClick={goToPreviousTab}
                            disabled={currentTabIndex === 0}
                        >
                            <img src={circleArrow} alt="Previous" className="circle-arrow default" />
                            <img src={circleArrowColor} alt="Previous" className="circle-arrow hover" />
                            Previous Category
                        </button>
                        <button
                            className="tab-change-button right"
                            onClick={goToNextTab}
                            disabled={currentTabIndex === tabsOrder.length - 1}
                        >
                            Next Category
                            <img src={circleArrow} alt="Next" className="circle-arrow default" />
                            <img src={circleArrowColor} alt="Next" className="circle-arrow hover" />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default DownloadsInsideAnyCampGallery;
