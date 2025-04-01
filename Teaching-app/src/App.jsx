import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { DataContext } from './store/Data';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import ApiStatus from './components/ApiStatus/ApiStatus';
import "./App.css";
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
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

// Protected Route component
const ProtectedRoute = ({ children }) => {
    const { currentUser, loading: authLoading } = useAuth();
    const { user, loading: dataLoading } = useContext(DataContext);

    // Check if we have a token regardless of context state
    const token = localStorage.getItem('token');

    // If auth is still loading, show a loading indicator
    if (authLoading || dataLoading) {
        return <div>Loading...</div>;
    }

    // Allow access if user is authenticated in either context or has a token
    if (currentUser || user || token) {
        return children;
    }

    // Otherwise redirect to login
    return <Navigate to="/login" />;
};

const App = () => {
    return (
        <div className="app">
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/for-students" element={<ForStudents />} />
                    <Route path="/announcement/:id" element={<AnnouncementDetails />} />
                    <Route path="/partnership-option/:id" element={<AnnouncementDetails />} />
                    <Route path="/downloads/:location" element={<DownloadsInsideAnyCampGallery />} />
                    <Route path="/downloads" element={<Downloads />} />
                    <Route path="/trustees" element={<Trustees />} />
                    <Route path="/teaching" element={<Teaching />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/get-involved" element={<GetInvolved />} />
                </Routes>
            </main>
            <Footer />
            <ApiStatus />
        </div>
    );
};

export default App;