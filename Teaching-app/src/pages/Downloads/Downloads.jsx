import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Downloads.css';
import ContributionBanner from "../../components/ContributionBanner/ContributionBanner.jsx";
import DownloadPageCard from '../../components/DownloadPageCard/DownloadPageCard.jsx';
import downloadspagearrowicon from '../../assets/downloadspage-arrowicon.svg';
import greaterthanicon from '../../assets/greaterthan-icon.svg';
import { DataContext } from '../../store/Data';
import api, { brochureService, reportService, galleryService } from '../../services/api';
import { formatImageUrl, formatFileUrl } from '../../utils/mediaUtils';

const Downloads = () => {
  const { gallery, downloads, loading } = useContext(DataContext);
  const [galleryByLocation, setGalleryByLocation] = useState({});
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [brochures, setBrochures] = useState([]);
  const [reports, setReports] = useState([]);
  const [loadingBrochures, setLoadingBrochures] = useState(false);
  const [loadingReports, setLoadingReports] = useState(false);
  const [error, setError] = useState(null);

  // Helper function to format image URLs
  const formatImageUrl = (imageUrl) => {
    if (!imageUrl) return '';

    // If it's already an absolute URL, ensure it uses HTTPS
    if (imageUrl.startsWith('http')) {
      return imageUrl.replace('http://', 'https://');
    }

    // For relative URLs, add the backend URL with HTTPS
    if (imageUrl.startsWith('/media')) {
      const apiUrl = import.meta.env.VITE_API_URL.replace('http://', 'https://');
      return `${apiUrl}${imageUrl}`;
    }

    return imageUrl;
  };

  // Fetch brochures and reports
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingBrochures(true);
        setLoadingReports(true);
        setError(null);

        // Fetch brochures
        const brochuresData = await brochureService.getAll();
        // console.log('Brochures data:', brochuresData); 
        setBrochures(Array.isArray(brochuresData) ? brochuresData : []);

        // Fetch reports
        const reportsData = await reportService.getAll();
        // console.log('Reports data:', reportsData); 
        setReports(Array.isArray(reportsData) ? reportsData : []);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load some content. Please try again later.');
        // Set default empty arrays
        setBrochures([]);
        setReports([]);
      } finally {
        setLoadingBrochures(false);
        setLoadingReports(false);
      }
    };

    fetchData();
  }, []);

  // Fetch gallery data if not available from context
  // Fetch gallery data if not available from context
  useEffect(() => {
    // Only fetch if gallery is not available from context
    if (!gallery || !Array.isArray(gallery) || gallery.length === 0) {
      const fetchGallery = async () => {
        try {
          setLoadingGallery(true);
          const response = await galleryService.getAll();
          // Make sure we handle the response structure correctly
          const galleryItems = response.data || response || [];
          // Store gallery data in local state
          setGalleryByLocation(groupGalleryData(galleryItems));
        } catch (error) {
          console.error('Error fetching gallery data:', error);
        } finally {
          setLoadingGallery(false);
        }
      };

      fetchGallery();
    } else if (gallery.length > 0) {
      // If gallery is available from context, group it
      setGalleryByLocation(groupGalleryData(gallery));
    }
  }, [gallery]);

  // Helper function to group gallery data by location
  const groupGalleryData = (galleryData) => {
    if (!Array.isArray(galleryData) || galleryData.length === 0) {
      return {};
    }

    // Get unique locations
    const uniqueLocations = [...new Set(galleryData.map(item => item.location))];

    // Create grouped object
    const grouped = {};
    uniqueLocations.forEach(location => {
      const itemsForLocation = galleryData.filter(item => item.location === location);
      if (itemsForLocation.length > 0) {
        const year = itemsForLocation[0].date ? new Date(itemsForLocation[0].date).getFullYear() : '2024';
        const formattedItems = itemsForLocation.map(item => ({
          ...item,
          image: formatImageUrl(item.image)
        }));

        grouped[location] = {
          items: formattedItems,
          year: year
        };
      }
    });

    return grouped;
  };

  const navigate = useNavigate();

  const handleClick = async (campLocation) => {
    window.scrollTo(0, 0);

    try {
      // Get gallery images for this location from the API
      const response = await galleryService.getAll({ location: campLocation });
      const locationGallery = response.data || response || [];

      // console.log('Raw gallery data:', locationGallery); 

      // Process the gallery data to maintain the original category
      const processedGallery = locationGallery.map(item => {
        // Debug log for each item's category
        // console.log('Processing item:', {
        //   id: item.id,
        //   originalCategory: item.category,
        //   title: item.title
        // });

        // Ensure we're using the correct category field from the backend
        const category = item.category || item.type || 'regularclasses';

        return {
          ...item,
          category: category
        };
      });

      // console.log('Processed gallery data:', processedGallery); 

      // Navigate to the gallery view with the processed data
      navigate(`/downloads/${campLocation.toLowerCase().replace(/\s+/g, '-')}`, {
        state: {
          DownloadsInsideAnyCampGalleryData: processedGallery,
          location: campLocation,
          year: galleryByLocation[campLocation]?.year || new Date().getFullYear()
        }
      });
    } catch (error) {
      console.error('Error fetching gallery for location:', error);
      navigate(`/downloads/${campLocation.toLowerCase().replace(/\s+/g, '-')}`, {
        state: {
          DownloadsInsideAnyCampGalleryData: [],
          location: campLocation
        }
      });
    }
  };

  // Handle file download
  // Handle file download
  const handleDownload = async (fileUrl, id, type) => {
    try {
      if (!fileUrl) {
        console.error(`No file URL provided for ${type} download`);
        return;
      }

      // If direct file URL is available, use window.open
      if (fileUrl.startsWith('http://') || fileUrl.startsWith('https://')) {
        window.open(fileUrl, '_blank');
        return;
      }

      // Fallback to API download endpoint
      let response;
      if (type === 'brochure') {
        response = await brochureService.download(id);
      } else if (type === 'report') {
        response = await reportService.download(id);
      } else {
        console.error('Invalid download type');
        return;
      }

      // Create a blob from the response data
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link and click it
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${type}_${id}.pdf`); // Default filename
      document.body.appendChild(link);
      link.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error(`Error downloading ${type}:`, error);
    }
  };

  return (
    <>
      <div className="downloads">
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-separator">&gt;</span>
          <span className="breadcrumb-current">Downloads</span>
        </div>

        <div className='downloads-header'>
          <h1>Downloads</h1>
          <p>
            Explore our trust's brochure and past camp reports to gain insights into
            our mission, teaching approach, and the impact we create. Download now
            to learn more about our journey and initiatives.
          </p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className='downloads-content-container'>
          <h2>Brochure</h2>
          <div className="brochure-cards-container">
            {loadingBrochures ? (
              <div className="loading-message">Loading brochures...</div>
            ) : brochures && brochures.length > 0 ? (
              brochures.map((brochure) => (
                <DownloadPageCard
                  key={brochure.id}
                  title={brochure.title}
                  subtitle={`Year ${brochure.year || new Date(brochure.created_at).getFullYear()}`}
                  lastUpdated={brochure.updated_at}
                  onClick={() => handleDownload(brochure.fileUrl || formatFileUrl(brochure.file), brochure.id, 'brochure')}
                />
              ))
            ) : (
              <div className="no-data-message">No brochures available</div>
            )}
          </div>
        </div>

        <div className='downloads-content-container'>
          <h2>Reports</h2>
          <div className="reports-cards-container">
            {loadingReports ? (
              <div className="loading-message">Loading reports...</div>
            ) : reports && reports.length > 0 ? (
              reports.map((report) => (
                <DownloadPageCard
                  key={report.id}
                  title={report.title}
                  subtitle={`${report.location || 'Unknown Location'}, Year ${report.year || new Date(report.created_at).getFullYear()}`}
                  lastUpdated={report.updated_at}
                  onClick={() => handleDownload(report.fileUrl || formatFileUrl(report.file), report.id, 'report')}
                />
              ))
            ) : (
              <div className="no-data-message">No reports available</div>
            )}
          </div>
        </div>

        <div className='downloads-gallery-container'>
          <h2>Gallery</h2>
          <p>Highlights from our past camps in pictures</p>
          {loading || loadingGallery ? (
            <div className="loading-message">Loading gallery...</div>
          ) : (
            <div className="gallery-grid">
              {Object.keys(galleryByLocation).length > 0 ? (
                Object.keys(galleryByLocation).map((location) => (
                  <div
                    key={location}
                    className="gallery-item-card"
                    onClick={() => handleClick(location)}
                  >
                    <span className='location-image-container'>
                      <img
                        className='location-image'
                        src={galleryByLocation[location].items[0].imageUrl || formatImageUrl(galleryByLocation[location].items[0].image)}
                        alt={`Camp at ${location}`}
                      />
                    </span>
                    <span className="gallery-item-caption">
                      <span>{location} ({galleryByLocation[location].year})</span>
                      <img className='downloadspagearrowicon' src={downloadspagearrowicon} alt="" />
                    </span>
                  </div>
                ))
              ) : (
                <div className="no-gallery-message">
                  <p>No gallery images available</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <ContributionBanner />
    </>
  );
};

export default Downloads;
