import React from 'react';
import './ContactUs.css';
import { Link } from 'react-router-dom';
import ContactComponent from "../../components/ContactComponent/ContactComponent.jsx"
const ContactUs = () => {
  const contactData =
  {
    contactAddress: "F2, 842, Green Street, Sector 5, Vaishali, Ghaziabad, UP- 201010",
    contactPhone: "+91 888-214-8359",
    contactMail: "hvdt.uk@gmail.com"
  }

  return (
    <div className="contact-us">
      <div className="breadcrumb">
        <Link to="/" className='breadcrumb-link'>Home </Link>
        <span className="breadcrumb-separator">&gt;</span>
        <span className='breadcrumb-current'>Contact us</span>
      </div>

      <ContactComponent contactData={contactData} />


    </div>
  );
};

export default ContactUs;
