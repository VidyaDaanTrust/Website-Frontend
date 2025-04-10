import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useImagePreloader, extractImageSources, LoadingIndicator } from '../../utils/ImagePreloader';

import "./Teaching.css";
import ContributionBanner from '../../components/ContributionBanner/ContributionBanner.jsx';
import Banner from "../../components/Banner/Banner.jsx";
import TeachingPrograms from "../../components/TeachingPageComponents/TeachingPrograms/TeachingPrograms";
import TeachingApproach from "../../components/TeachingPageComponents/TeachingApproach/TeachingApproach";
import TeachingVolunteerExperience from "../../components/TeachingPageComponents/TeachingVolunteerExperience/TeachingVolunteerExperience";
import TeachingReports from "../../components/TeachingPageComponents/TeachingReports/TeachingReports";
import TeachingTestimonials from "../../components/TeachingPageComponents/TeachingTestimonials/TeachingTestimonials";
import { 
  TeachingApproachData, 
  TeachingProgramsData, 
  TeachingTestimonialsData, 
  TeachingVolunteerList
} from './TeachingData.jsx';
import { reportService } from '../../services/api';

const Teaching = () => {
  const [reports, setReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(false);
  const [error, setError] = useState(null);

  // Fetch reports data directly in Teaching component
  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoadingReports(true);
        setError(null);
        const reportsData = await reportService.getAll();
        setReports(Array.isArray(reportsData) ? reportsData : []);
      } catch (err) {
        console.error('Error fetching reports:', err);
        setError('Failed to load reports. Please try again later.');
        setReports([]);
      } finally {
        setLoadingReports(false);
      }
    };

    fetchReports();
  }, []);

  // Handle report download function
  const handleReportDownload = async (fileUrl, id) => {
    if (!fileUrl && !id) {
      console.error('No file URL or ID provided for report download');
      return;
    }

    try {
      // If direct file URL is available, try to open it in a new tab
      if (fileUrl && (fileUrl.startsWith('http://') || fileUrl.startsWith('https://'))) {
        window.open(fileUrl, '_blank');
        return;
      }

      // Fallback to API download endpoint if we have an ID
      if (id) {
        const response = await reportService.download(id);
        
        // Create a blob from the response data
        const blob = new Blob([response.data], { 
          type: response.headers['content-type'] || 'application/pdf' 
        });
        
        // Create a URL for the blob
        const url = window.URL.createObjectURL(blob);
        
        // Try to open the URL in a new tab first
        const newTab = window.open(url, '_blank');
        
        // If new tab was blocked or didn't open, fall back to download
        if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
          // Create a temporary link and click it
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `report_${id}.pdf`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
        
        // Clean up the URL object
        setTimeout(() => window.URL.revokeObjectURL(url), 100);
      }
    } catch (error) {
      console.error('Error downloading report:', error);
      alert('Failed to download the report. Please try again later.');
    }
  };

  const allImageSources = [
    ...extractImageSources(TeachingProgramsData),
    ...extractImageSources(TeachingApproachData),
    ...extractImageSources(TeachingVolunteerList),
    ...extractImageSources(TeachingTestimonialsData)
  ];
  const { isLoading, loadingProgress } = useImagePreloader(allImageSources);
  
  if (isLoading) {
    return <LoadingIndicator progress={loadingProgress} />;
  }

  return (
    <>
      <div className="TrusteesBody">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-separator">&gt;</span>
          <span className="breadcrumb-current">Teaching</span>
        </div>

        {/* Banner section */}
        <Banner bannerFor='teaching' />

        {/* Programs section */}
        <TeachingPrograms />

        {/* Teaching approach section */}
        <TeachingApproach />

        {/* Testimonials section */}
        <TeachingTestimonials />

        {/* Volunteer Experience section */}
        <TeachingVolunteerExperience />

        {/* Reports section - Now passing real API data */}
        <TeachingReports 
          reports={reports}
          loading={loadingReports}
          error={error}
          onDownload={(fileUrl, id) => handleReportDownload(fileUrl, id)}
        />
      </div>

      {/* Contribution banner */}
      <ContributionBanner />
    </>
  );
};

export default Teaching;