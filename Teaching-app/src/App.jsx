// website-frontend/src/App.jsx
import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { DataContext } from './store/Data';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import ApiStatus from './components/ApiStatus/ApiStatus';
import "./App.css";

// Public pages
import ComingSoon from "./pages/ComingSoon/ComingSoon.jsx";
import AboutUs from "./pages/AboutUs/AboutUs.jsx";
import ForStudents from "./pages/ForStudents/ForStudents.jsx";
import AnnouncementDetails from './components/AnnouncementDetails/AnnouncementDetails.jsx';
import DownloadsInsideAnyCampGallery from './components/DownloadsInsideAnyCampGallery/DownloadsInsideAnyCampGallery.jsx';
import Trustees from "./pages/Trustees/Trustees.jsx";
import GetInvolved from "./pages/GetInvolved/GetInvolved.jsx";
import Downloads from "./pages/Downloads/Downloads.jsx";
import ContactUs from "./pages/ContactUs/ContactUs.jsx";
import Teaching from "./pages/Teaching/Teaching.jsx";
import Home from "./pages/Home/Home.jsx";

// Layout component for public pages
const PublicLayout = ({ children }) => {
    const location = useLocation();

    // Pages that don't need navbar/footer
    const noLayoutPages = ['/login', '/register'];
    const showLayout = !noLayoutPages.includes(location.pathname);

    if (!showLayout) {
        return children;
    }

    return (
        <div className="website-app-main-container">
            <Navbar />
            <main className="website-app-content-container">
                {children}
            </main>
            <Footer />
            <ApiStatus />
        </div>
    );
};

function App() {
    return (
        <BrowserRouter>
            <PublicLayout>
                <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/for-students" element={<ForStudents />} />
                    <Route path="/trustees" element={<Trustees />} />
                    <Route path="/get-involved" element={<GetInvolved />} />
                    <Route path="/downloads" element={<Downloads />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/teaching" element={<Teaching />} />
                    <Route path="/coming-soon" element={<ComingSoon />} />
                    <Route path="/announcement/:id" element={<AnnouncementDetails />} />
                    <Route path="/downloads/gallery/:campId/" element={<DownloadsInsideAnyCampGallery />} />
                    {/* Catch all route */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </PublicLayout>
        </BrowserRouter>
    );
}

export default App;
