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
  // Update state to store camps instead of gallery by location
  const [camps, setCamps] = useState([]);
  const [loadingCamps, setLoadingCamps] = useState(false);
  const [brochures, setBrochures] = useState([]);
  const [reports, setReports] = useState([]);
  const [loadingBrochures, setLoadingBrochures] = useState(false);
  const [loadingReports, setLoadingReports] = useState(false);
  const [error, setError] = useState(null);

  // Helper function to format image URLs
  // This can be kept as is or use the imported formatImageUrl utility

  // Fetch brochures and reports - keep this as is
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingBrochures(true);
        setLoadingReports(true);
        setError(null);

        // Fetch brochures
        const brochuresData = await brochureService.getAll();
        setBrochures(Array.isArray(brochuresData) ? brochuresData : []);

        // Fetch reports
        const reportsData = await reportService.getAll();
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

  // Update to fetch camps instead of gallery
  useEffect(() => {
    const fetchCamps = async () => {
      try {
        setLoadingCamps(true);
        // Use the new API endpoint to get camps
        const response = await api.camps.getAll();
        console.log('Camps API response:', response);

        // Handle different response formats
        let campsData;
        if (response.data && Array.isArray(response.data)) {
          campsData = response.data;
        } else if (Array.isArray(response)) {
          campsData = response;
        } else {
          console.error('Unexpected camps data format:', response);
          campsData = [];
        }

        if (campsData.length === 0) {
          console.warn('No camps data received from API');
        }

        // Store camps data in state
        setCamps(campsData);
      } catch (error) {
        console.error('Error fetching camps data:', error);
        console.error('Error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
        setCamps([]);
      } finally {
        setLoadingCamps(false);
      }
    };

    fetchCamps();
  }, []);

  const navigate = useNavigate();

  // Update to use camp ID instead of location
  const handleClick = async (camp) => {
    window.scrollTo(0, 0);
    try {
      // Get gallery images for this camp from the API
      console.log('clicked camp ', camp.id)
      const response = await galleryService.getByCamp(camp.id);
      console.log(response)
      console.log('fetched gallery for camp ', camp.id)


      // Navigate to the gallery view with the processed data
      navigate(`/downloads/gallery/${camp.id}`, {
        state: {
          DownloadsInsideAnyCampGalleryData: response,
          location: camp.location,
          campName: camp.name,
          year: camp.year || new Date().getFullYear(),
          campID: camp.id
        }
      });
    } catch (error) {
      console.error('Error fetching gallery for camp:', error);
      navigate(`/downloads/gallery/${camp.id}`, {
        state: {
          DownloadsInsideAnyCampGalleryData: [],
          location: camp.location,
          campName: camp.name,
          campId: camp.id
        }
      });
    }
  };

  // Keep the download handler as is
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
          {loadingCamps ? (
            <div className="loading-message">Loading gallery...</div>
          ) : (
            <div className="gallery-grid">
              {camps.length > 0 ? (
                camps.map((camp) => (
                  <div
                    key={camp.id}
                    className="gallery-item-card"
                    onClick={() => handleClick(camp)}
                  >
                    <span className='location-image-container'>
                      <img
                        className='location-image'
                        src={formatImageUrl(camp.image)}
                        alt={`Camp at ${camp.location}`}
                      />
                    </span>
                    <span className="gallery-item-caption">
                      <span>{camp.location} ({camp.year})</span>
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
