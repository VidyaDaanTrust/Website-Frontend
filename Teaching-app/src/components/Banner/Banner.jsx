import React from 'react';
import './Banner.css'
import { BannerSection_Teaching, BannerSection_About, BannerSection_Trustees } from './BannerData';
import AboutUs_background_cover from '../../assets/Banners/AboutUs_background_cover.png';

const getBannerData = (bannerFor) => {
    switch (bannerFor) {
        case 'teaching':
            return BannerSection_Teaching;
        case 'about-us':
            return BannerSection_About;
        case 'trustees':
            return BannerSection_Trustees;
        default:
            return BannerSection_Teaching; // Fallback to Teaching if no match
    }
};

const Banner = ({ bannerFor }) => {
    const bannerData = getBannerData(bannerFor);

    return (
        <div className="BannerSection">
            <div className="BannerImageBox">
                <img
                    className='BannerImage'
                    src={bannerData.image}
                    alt={bannerData.imageAlt}
                />
                <img src={AboutUs_background_cover} alt="Background cover" className="background_cover" />
                <div className='BannerOverlayText'>
                    <h1 id='extraText'>{bannerData.extraText || ""}</h1>
                    <h1>{bannerData.overlayText}</h1>
                </div>
            </div>
            <p className="BannerDescription">{bannerData.description}</p>
        </div>
    );
};

export default Banner;