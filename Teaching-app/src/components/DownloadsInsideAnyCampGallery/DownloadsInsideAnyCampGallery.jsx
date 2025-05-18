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
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('regularclasses');
    const [galleryData, setGalleryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Extract camp information from location state or URL params
    const campData = location.state || {};
    const campId = campData.campId;
    const campLocation = campData.location || params.location?.replace(/-/g, ' ') || "Camp";
    const campName = campData.campName || "Camp";
    const year = campData.year || new Date().getFullYear();

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

    // Handle image download
    const handleDownload = async (id) => {
        try {
            const response = await galleryService.download(id);

            // Create a blob from the response data
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const url = window.URL.createObjectURL(blob);

            // Create a temporary link and click it
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `gallery_${id}.jpg`); // Default filename
            document.body.appendChild(link);
            link.click();

            // Clean up
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };

    // If there's an error or no data, show appropriate message
    if (error || (!loading && (!galleryData || galleryData.length === 0))) {
        return (
            <div className="DownloadsInsideAnyCampGallery-container">
                <div className="breadcrumb">
                    <BackButton />
                </div>
                <div className="no-data-message">
                    <h2>No gallery images available</h2>
                    <p>Please return to the downloads page and select a gallery.</p>
                    <Link to="/downloads" className="return-link">Return to Downloads</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="DownloadsInsideAnyCampGallery-container">
            <div className="breadcrumb">
                <BackButton />
            </div>

            <div className="DownloadsInsideAnyCampGallery-header">
                <h1>{campName} Gallery</h1>
                <p>Location: {campLocation}</p>
                <p>Year: {year}</p>
            </div>

            <div className="DownloadsInsideAnyCampGallery-tabs-container">
                <div className="DownloadsInsideAnyCampGallery-resource-tabs">
                    <div
                        className={`DownloadsInsideAnyCampGallery-tab ${activeTab === 'regularclasses' ? 'active' : ''}`}
                        onClick={() => setActiveTab('regularclasses')}
                    >
                        Regular Classes
                    </div>
                    <div
                        className={`DownloadsInsideAnyCampGallery-tab ${activeTab === 'doubts' ? 'active' : ''}`}
                        onClick={() => setActiveTab('doubts')}
                    >
                        Doubts
                    </div>
                    <div
                        className={`DownloadsInsideAnyCampGallery-tab ${activeTab === 'exams' ? 'active' : ''}`}
                        onClick={() => setActiveTab('exams')}
                    >
                        Exams
                    </div>
                </div>

                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading gallery images...</p>
                    </div>
                ) : (
                    <>
                        <div className="DownloadsInsideAnyCampGallery-tab-content">
                            {filteredGalleryData.length > 0 ? (
                                filteredGalleryData.map((item) => (
                                    <div key={item.id} className="DownloadsInsideAnyCampGalleryData-image-container">
                                        <img
                                            src={item.imageUrl || item.image_url || item.image}
                                            alt={item.title}
                                            className="DownloadsInsideAnyCampGalleryData-image"
                                            onClick={() => handleDownload(item.id)}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className="no-images-message">
                                    <h3>No images available for this category</h3>
                                </div>
                            )}
                        </div>

                        <div className="DownloadsInsideAnyCampGalleryData-tab-change">
                            {currentTabIndex > 0 && (
                                <button
                                    onClick={goToPreviousTab}
                                    className="tab-change-button left"
                                >
                                    <img
                                        src={circleArrow}
                                        alt="Previous"
                                        className="circle-arrow default"
                                    />
                                    <img
                                        src={circleArrowColor}
                                        alt="Previous"
                                        className="circle-arrow hover"
                                    />
                                    Previous Category
                                </button>
                            )}

                            {currentTabIndex < tabsOrder.length - 1 && (
                                <button
                                    onClick={goToNextTab}
                                    className="tab-change-button right"
                                    style={{ marginLeft: 'auto' }}
                                >
                                    Next Category
                                    <img
                                        src={circleArrow}
                                        alt="Next"
                                        className="circle-arrow default"
                                    />
                                    <img
                                        src={circleArrowColor}
                                        alt="Next"
                                        className="circle-arrow hover"
                                    />
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default DownloadsInsideAnyCampGallery;
