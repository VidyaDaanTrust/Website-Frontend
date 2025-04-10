import React, { useState, useEffect } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import './DownloadsInsideAnyCampGallery.css';
import BackButton from '../BackButton/BackButton';
import circleArrow from '../../assets/arrow-with-filled-circle.svg';
import circleArrowColor from '../../assets/arrow-with-filled-circle-colored.svg';
import { formatImageUrl } from '../../utils/mediaUtils';

const DownloadsInsideAnyCampGallery = () => {
    const location = useLocation();
    const params = useParams();
    const [activeTab, setActiveTab] = useState('regularclasses');

    // Get data from location state
    const galleryData = location.state?.DownloadsInsideAnyCampGalleryData || [];
    const campLocation = location.state?.location || params.location || "Camp";

    // Define tabs order for navigation
    const tabsOrder = ['regularclasses', 'doubts', 'exams'];

    useEffect(() => {

        // If no data is found in state, you could try to fetch it here
        if (!location.state) {
            console.log("No state data found, could fetch from API here");
        }
    }, [location]);

    // Check if we have gallery data, otherwise show error
    if (!galleryData || galleryData.length === 0) {
        return (
            <div className="DownloadsInsideAnyCampGallery-container">
                <div className="breadcrumb">
                    <Link to="/" className="breadcrumb-link">Home</Link>
                    <span className="breadcrumb-separator">&gt;</span>
                    <Link to="/downloads" className="breadcrumb-link">Downloads</Link>
                    <span className="breadcrumb-separator">&gt;</span>
                    <span className="breadcrumb-current">Gallery</span>
                </div>
                <div className="no-data-message">
                    <h2>No gallery images found</h2>
                    <p>Please return to the downloads page and select a gallery.</p>
                    <Link to="/downloads" className="return-link">Return to Downloads</Link>
                </div>
            </div>
        );
    }

    // Format tab name for display
    const formatTabName = (tabName) => {
        if (tabName === 'regularclasses') return 'Regular Classes';
        return tabName.charAt(0).toUpperCase() + tabName.slice(1);
    };

    // Filter images for the current tab (case insensitive comparison)
    const filteredImages = galleryData.filter(image => 
        (image.category || 'regularclasses').toLowerCase() === activeTab.toLowerCase()
    );
    useEffect(() => {
        // console.log("Gallery Data Received:", galleryData);
        // console.log("Current Active Tab:", activeTab);
        // console.log("Filtered Images:", filteredImages);
    }, [galleryData, activeTab, filteredImages]);

    return (
        <div className="DownloadsInsideAnyCampGallery-container">
            {/* Breadcrumb Navigation */}
            <div className="breadcrumb">
                <Link to="/" className="breadcrumb-link">Home</Link>
                <span className="breadcrumb-separator">&gt;</span>
                <Link to="/downloads" className="breadcrumb-link">Downloads</Link>
                <span className="breadcrumb-separator">&gt;</span>
                <span className="breadcrumb-current">Gallery</span>
            </div>

            <BackButton to="/downloads" />

            <div className='DownloadsInsideAnyCampGallery-resources'>
                <div className='DownloadsInsideAnyCampGallery-header'>
                    <h1>{campLocation}, Uttarakhand</h1>
                    <p>Year 2024</p>
                </div>
                <div className="DownloadsInsideAnyCampGallery-tabs-container">
                    {/* Tabs */}
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

                    {/* Tab Content */}
                    <div className="DownloadsInsideAnyCampGallery-tab-content">
                        {filteredImages.length > 0 ? (
                            filteredImages.map((image, index) => (
                                <img
                                    key={index}
                                    className='DownloadsInsideAnyCampGalleryData-image'
                                    src={image.imageUrl || formatImageUrl(image.image)}
                                    alt={`${campLocation} - ${activeTab}`}
                                />
                            ))
                        ) : (
                            <div className="no-images-message">
                                <p>No images available for this category</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Tab Change Navigation */}
                <div className="DownloadsInsideAnyCampGalleryData-tab-change">
                    <div className="left-nav">
                        {activeTab !== 'regularclasses' && (
                            <button
                                className="tab-change-button left"
                                onClick={() => setActiveTab(activeTab === 'exams' ? 'doubts' : 'regularclasses')}
                            >
                                <img
                                    src={circleArrow}
                                    className="circle-arrow default"
                                    alt="Previous"
                                />
                                <img
                                    src={circleArrowColor}
                                    className="circle-arrow hover"
                                    alt="Previous Colored"
                                />
                                {activeTab === 'exams' ? 'Doubts' : 'Regular Classes'}
                            </button>
                        )}
                    </div>

                    <div className="right-nav">
                        {activeTab !== 'exams' && (
                            <button
                                className="tab-change-button right"
                                onClick={() => setActiveTab(activeTab === 'regularclasses' ? 'doubts' : 'exams')}
                            >
                                {activeTab === 'regularclasses' ? 'Doubts' : 'Exams'}
                                <img
                                    src={circleArrow}
                                    className="circle-arrow default"
                                    alt="Next"
                                />
                                <img
                                    src={circleArrowColor}
                                    className="circle-arrow hover"
                                    alt="Next Colored"
                                />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DownloadsInsideAnyCampGallery;
