import React from 'react'
import './Quote.css'
import invcomma from "../../assets/invcommaopen.svg";

const ContributionBanner = () => {
    return (
        <div className="quote-section">
            <div className="quote-content">
                <div className="quote-text-container">
                    <span className='quote-invcomma-open'><img src={invcomma} alt="quote-invcomma" /></span>
                    <p className="quote-text">Education is the most powerful weapon which you can use to change the world</p>
                    <span className='quote-invcomma-close'><img src={invcomma} alt="quote-invcomma" /></span>
                </div>
                <div className='quote-author-container'>
                    <p className="quote-author">Nelson Mandela</p>
                </div>
            </div>
        </div>
    )
}

export default ContributionBanner;