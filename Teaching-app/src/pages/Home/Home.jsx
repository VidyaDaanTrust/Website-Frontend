import React from "react";
import './Home.css';

// Component imports
import Home_Hero from "../../components/Home_Hero/Home_Hero";
import Home_Announcements from "../../components/Home_Announcements/Home_Announcements";
import Home_About from "../../components/Home_About/Home_About";
import Home_UttarakhandProject from "../../components/Home_UttarakhandProject/Home_UttarakhandProject";
import Home_Programs from "../../components/Home_Programs/Home_Programs";
import ContributionBanner from "../../components/ContributionBanner/ContributionBanner";
import ContactComponent from "../../components/ContactComponent/ContactComponent";
import Quote from "../../components/Quote/Quote";
import Home_Testimonials from "../../components/Home_Testimonials/Home_Testimonials";
import Home_VolunteerExperience from "../../components/Home_VolunteerExperience/Home_VolunteerExperience";
import { TrusteesHome } from "../../pages/Trustees/Trustees";

// Asset imports
import testimage from "../../assets/founder.png";

// Contact information
const contactData = {
  contactAddress: "F2, 842, Green Street, Sector 5, Vaishali, Ghaziabad, UP- 201010",
  contactPhone: "+91 888-214-8359",
  contactMail: "hvdt.uk@gmail.com"
};

const Home = () => {
  const images = [
    testimage,
    testimage,
    testimage,
    testimage,
    testimage,
    // Add more images here if needed
  ];

  return (
    <>
      <div className="home-container">
        {/* Hero Section */}
        <Home_Hero />
      </div>
      {/* Quote Section */}
      <Quote />

      <div className="home-container" id="home-container-2">
        {/* Announcements Section */}
        <Home_Announcements />

        {/* About Section */}
        <Home_About />

        {/* Uttarakhand Teaching Project Section */}
        <Home_UttarakhandProject />

        <div className="home-carousels-container">
          {/* Programs Section */}
          <Home_Programs />
        </div>

        {/* Trustees Section */}
        <TrusteesHome />

        <div className="home-carousels-container">
          {/* Testimonials Section */}
          <Home_Testimonials />
        </div>

        <div className="home-carousels-container">
          {/* Volunteer Experience Section */}
          <Home_VolunteerExperience />
        </div>

        {/* Contact Section */}
        <ContactComponent contactData={contactData} />

        {/* Image Section */}
        <div className="image-section">
          <h2>IMAGES</h2>
          <div className="image-scroller">
            {/* First set */}
            <div className="image-track">
              {images.map((image, index) => (
                <div className="image-card" key={`first-${index}`}>
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    loading="lazy" // Add lazy loading
                  />
                </div>
              ))}
            </div>
            {/* Second set for seamless looping */}
            <div className="image-track">
              {images.map((image, index) => (
                <div className="image-card" key={`second-${index}`}>
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    loading="lazy" // Add lazy loading
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contribution Banner */}
      <ContributionBanner />
    </>
  );
};

export default Home;