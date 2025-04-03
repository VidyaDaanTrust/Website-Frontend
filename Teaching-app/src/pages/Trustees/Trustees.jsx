// Trustees.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import JPDabral from "../../assets/JP_Dabral.png";
import RajeevJain from "../../assets/Rajeev Jain.png";
import RajendraMohan from "../../assets/Rajendra Mohan.png";
import RajKumarKohli from "../../assets/Raj Kumar Kohli.png";
import NareshChand from "../../assets/Naresh Chand.png";
import VectorHome from "../../assets/Vector.png";
import ContributionBanner from '../../components/ContributionBanner/ContributionBanner.jsx';
import { useImagePreloader, LoadingIndicator } from '../../utils/ImagePreloader';
import "./Trustees.css";
import Banner from "../../components/Banner/Banner.jsx";

// Image array for preloading
const allImages = [
  JPDabral,
  RajeevJain,
  RajendraMohan,
  RajKumarKohli,
  NareshChand,
  Banner,
];

// Trustees data with points as string arrays instead of JSX
const TrusteesList = [
  {
    id: 1,
    number: "01",
    name: "Rajendra Mohan ",
    image: RajendraMohan,
    points: [
      "Studied at Cambridge School, graduated from Shri Ram College of Commerce, and joined the family business Sri Ram & Son (est. 1882)",
      "Founded the men's wear brand Pall Mall in 1988, curating fashion for discerning men",
      "Associated with Ramjas Educational Foundation, active in Rotary & Jaycees, enjoys golf and music"
    ]
  },
  {
    id: 2,
    number: "02",
    name: "J.P. Dabral",
    image: JPDabral,
    points: [
      "An MBA graduate from Delhi University and former Regional Marketing Manager at ITC",
      "A recipient of prestigious accolades, including the Ashoka Fellowship, CNN-IBN Real Heroes Award, International Green Apple Award, and Hindustan Times India Awaken Award",
      "Over 30 years of grassroots work dedicated to improving education, tackling bureaucratic challenges, and empowering communities in Uttarakhand"
    ]
  },
  {
    id: 3,
    number: "03",
    name: "Rajeev Jain",
    image: RajeevJain,
    points: [
      "Rajeev Jain, law graduate, Consultant and Manufacturer of customised fancy lights, Jain scholar, associated in several Jain organizations and philanthropic activities",
      "Engaged in various charitable and social initiatives",
      "Actively associated with several Jain organizations"
    ]
  },
  {
    id: 4,
    number: "04",
    name: "Raj Kumar Kohli",
    image: RajKumarKohli,
    points: [
      "Alumnus of Shri Ram College of Commerce (SRCC), Delhi",
      "Importer and exporter of textiles and textile products"
    ]
  },
  {
    id: 5,
    number: "05",
    name: "Naresh Chand",
    image: NareshChand,
    points: [
      "Importer and exporter of sandal wood and various other products",
      "Committed to the upliftment of rural students through education",
      "Philanthropist"
    ]
  }
];

// Main Trustees component
const Trustees = () => {
  const { isLoading, loadingProgress } = useImagePreloader(allImages);

  if (isLoading) {
    return <LoadingIndicator progress={loadingProgress} />;
  }

  return (
    <>
      <div className='TrusteesBody'>

        {/* Breadcrumb Navigation */}
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-separator">&gt;</span>
          <span className="breadcrumb-current">Trustees</span>
        </div>

        {/* Banner Section */}
        <Banner bannerFor='trustees' />

        {/* Trustees List */}
        {TrusteesList.map((trustee, index) => (
          <div
            className={`TrusteesContainer ${index % 2 === 0 ? 'TrusteesContainer-even' : 'TrusteesContainer-odd'}`}
            key={trustee.id}
          >
            <div className='TrusteesTextBox'>
              <div className="TrusteesNumberHeading">{trustee.number}</div>
              <h2 className="TrusteesTextHeading">{trustee.name}</h2>
              <ul className='Trustees-Object-Points'>
                {trustee.points.map((point, idx) => (
                  <li key={idx} className="Trustees-Points-TextPara">{point}</li>
                ))}
              </ul>
            </div>
            <div className="TrusteesTrustImageBox">
              <img className="TrusteesTrustImage" src={trustee.image} alt={trustee.name} />
            </div>
          </div>
        ))}
      </div>
      <ContributionBanner />
    </>
  );
};

// Trustees Home component
export const TrusteesHome = () => {
  return (
    <div className="TrusteesHomeBody">
      <h1 className='TrusteesHomeHeading'>Our trustees</h1>
      <p className='TrusteesHomeDescription'>Meet the visionaries behind the Himalayan Vidya Daan Trust</p>
      <div className="TrusteesHomeFlexbox">
        {TrusteesList.map((trustee, index) => (
          <div className='TrusteesHomeFlex' key={trustee.id}>
            <img className="TrusteesHomeImage" src={trustee.image} alt={trustee.name} />
            <h2 className="TrusteesHomeName">
              {trustee.name}
              <img src={VectorHome} alt="Pointer" className="TrusteesHomePointer" />
            </h2>
            {index === 0 && <h3 className="TrusteesHomeImageDescription">(Settler of the Trust)</h3>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trustees;