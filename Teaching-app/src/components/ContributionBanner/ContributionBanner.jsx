import React from 'react'
import { Link } from 'react-router-dom';
import greaterthanicon from '../../assets/greaterthan-icon.svg'
import './ContributionBanner.css'

const ContributionBanner = () => {
    return (
        <div className='contribution-banner-container'>
            <h1>
                Your Contribution Can transform Uttarakhand's future
            </h1>
            <Link
                to="/get-involved"
                className='contribution-banner-container-button'
                onClick={() => window.scrollTo(0, 0)}
            >
                <span>
                    Join our cause
                </span>
                <span className='contribution-banner-arrow-icon'>
                    <img src={greaterthanicon} alt="arrow icon" />
                </span>
            </Link>
        </div>
    )
}

export default ContributionBanner;