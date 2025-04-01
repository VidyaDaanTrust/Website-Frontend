import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./PartnerwithUs.css";
import arrowicon from '../../assets/bx-right-arrow-alt.svg'

const PartnerUs = () => {
  // Partnership options data - could be moved to a separate file in a larger application
  const partnershipOptions = [
    {
      id: 1,
      title: "Sponsor a Student Education",
      desc: "This is sample desc 1  ",
    },
    {
      id: 2,
      title: "Provide Digital & Learning Resources to Students",
      desc: "This is sample desc 2",
    },
    {
      id: 3,
      title: "Provide Digital & Learning Resources to Uttrakhand Teaching Project",
      desc: "This is sample desc 3",
    },
    {
      id: 4,
      title: "Sponsor student food cost",
      desc: "This is sample desc 4",
    },
    {
      id: 5,
      title: "Sponsor Volunteer travel or food cost",
      desc: "This is sample desc 5",
    },
  ];

  // right now on click, it is navigating to announcementdetails page. 
  // if needed to change in future, create a new component and add its route to app.jsx

  const navigate = useNavigate();

  const handleClick = (option) => {
    navigate(`/partnership-option/${option.id}`, {
      state: {
        option,
        comingFrom: '/get-involved',
      }
    });
    window.scrollTo(0, 0);
  };

  return (
    <div className="for-students-tab-content announcementItem-announcements-container">
      {partnershipOptions.length > 0 ? (
        partnershipOptions.map((option, index) => (
          <div key={option.id} className="announcementItem-announcements-container">
            {index > 0 && <div className="announcementItem-announcement-divider"></div>}
            <div className="announcementItem-announcement-item" onClick={() => handleClick(option)}>
              <div className="announcementItem-announcement-header">
                <div className="announcementItem-announcement-item-title">{option.title}</div>
                <span className="announcementItem-arrow-icon"><img className='announcementItem-announcement-arrow-icon' src={arrowicon} alt="arrow icon" /></span>
              </div>
            </div>
          </div>
        ))) : 'No options available currently'}
    </div>
  );
};

export default PartnerUs;