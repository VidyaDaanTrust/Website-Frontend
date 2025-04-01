import React from 'react';
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
import { TeachingApproachData, TeachingProgramsData, TeachingReportsData, TeachingTestimonialsData, TeachingVolunteerList } from './TeachingData.jsx';

const Teaching = () => {
  const allImageSources = [
    ...extractImageSources(TeachingProgramsData),
    ...extractImageSources(TeachingApproachData),
    ...extractImageSources(TeachingVolunteerList),
    ...extractImageSources(TeachingReportsData),
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

        {/* <Home_Testimonials />
        <Home_Testimonials /> */}

        {/* Volunteer Experience section */}
        <TeachingVolunteerExperience />

        {/* Reports section */}
        <TeachingReports />

      </div>

      {/* Contribution banner */}
      <ContributionBanner />
    </>
  );
};

export default Teaching;