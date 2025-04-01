import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./GetInvolved.css";
import "../ForStudents/ForStudents.css"; // Already imported, ensures tab styles are available
import DonateForm from "../../components/GetInvolved/DonateForm";
import PartnerUs from "../../components/GetInvolved/PartnerwithUs";

// Define components outside of the main component
const VolunteerForm = ({
  selectedRole,
  setSelectedRole,
  isDropdownOpen,
  setIsDropdownOpen,
  fullName,
  setFullName,
  email,
  setEmail
}) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsDropdownOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectRole = (role) => {
    setSelectedRole(role);
    setIsDropdownOpen(false);
  };

  return (
    <div className="get-involved-container">
      <div className="get-involved-intro">
        <h1>Become a volunteer</h1>
        <p>
          Join hands with us to inspire and educate the youth of Uttarakhand.
          Whether you are a teacher, a professional, or a student, your
          contribution can make a lasting impact.
        </p>
      </div>

      <div className="get-involved-form-container">
        <div className="get-involved-form-group">
          <label htmlFor="role">Role</label>
          <div className="custom-dropdown" ref={dropdownRef}>
            <div className="dropdown-header" onClick={toggleDropdown}>
              {selectedRole || "Choose role"}
              <span className="dropdown-arrow">&#9662;</span>
            </div>
            {isDropdownOpen && (
              <div className="dropdown-content">
                <div className="dropdown-item" onClick={() => selectRole("Mentoring")}>
                  Mentoring
                </div>
                <div className="dropdown-item" onClick={() => selectRole("Teaching")}>
                  Teaching
                </div>
                <div className="dropdown-item" onClick={() => selectRole("Administrative support")}>
                  Administrative support
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="get-involved-form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder=""
            className="get-involved-form-input"
          />
        </div>

        <div className="get-involved-form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=""
            className="get-involved-form-input"
          />
        </div>

        <button className="submit-button">Write mail</button>
      </div>
    </div>
  );
};

const Donate = () => (
  <div className="get-involved-container">
    <div className="get-involved-intro">
      <h1>Donate</h1>
      <p>
        Your support helps us provide free coaching, study materials, and
        resources to students in remote areas. Together, we can build a
        brighter future.
      </p>
    </div>
    <div className="get-involved-partner-section">
      <DonateForm />
    </div>
  </div>
);

const PartnerWithUs = () => (
  <div className="get-involved-container">
    <div className="get-involved-intro">
      <h1>Partner with us</h1>
      <p>
        Join Hands to Empower Education in Rural Uttarakhand! We invite
        organizations, NGOs, corporates, and individuals to collaborate with
        us in bringing quality education to underprivileged students in
        Uttarakhand. Together, we can bridge the education gap and transform
        young lives.
      </p>
    </div>
    <div className="get-involved-partner-section">
      <PartnerUs />
    </div>
  </div>
);

function GetInvolved() {
  const [activeTab, setActiveTab] = useState("Volunteer");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="for-students-container"> {/* Updated class */}
      <div className="breadcrumb">
        <Link to="/" className="breadcrumb-link">Home</Link>
        <span className="breadcrumb-separator">&gt;</span>
        <span className="breadcrumb-current">Get Involved</span>
      </div>

      <div className="for-students-student-resources"> {/* Updated class */}
        <div className="for-students-title-container"> {/* Updated class */}
          <h1 className="for-students-page-title">Get Involved</h1> {/* Updated class */}
          <p className="for-students-description"> {/* Updated class */}
            Your impact, your choice: Choose how you want to contribute.
          </p>
        </div>

        <div className="for-students-tabs-container">
          <div className="for-students-resource-tabs">
            <div
              className={`for-students-tab ${activeTab === "Volunteer" ? "active" : ""}`}
              onClick={() => setActiveTab("Volunteer")}
            >
              Volunteer
            </div>
            <div
              className={`for-students-tab ${activeTab === "Donate" ? "active" : ""}`}
              onClick={() => setActiveTab("Donate")}
            >
              Donate
            </div>
            <div
              className={`for-students-tab ${activeTab === "Partner with us" ? "active" : ""}`}
              onClick={() => setActiveTab("Partner with us")}
            >
              Partner with us
            </div>
          </div>

          {activeTab === 'Volunteer' && (
            <div className="for-students-tab-content">
              <VolunteerForm
                selectedRole={selectedRole}
                setSelectedRole={setSelectedRole}
                isDropdownOpen={isDropdownOpen}
                setIsDropdownOpen={setIsDropdownOpen}
                fullName={fullName}
                setFullName={setFullName}
                email={email}
                setEmail={setEmail}
              />
            </div>
          )}

          {activeTab === 'Donate' && (
            <div className="for-students-tab-content">
              <Donate />
            </div>
          )}

          {activeTab === 'Partner with us' && (
            <div className="for-students-tab-content">
              <PartnerWithUs />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GetInvolved;