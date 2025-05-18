import React, { useState, useEffect } from 'react';
import './ForStudents.css';
import '../../components/AnnouncementItem/AnnouncementItem.css';
import AnnouncementItem from '../../components/AnnouncementItem/AnnouncementItem';
import PreviousYearPapersWrapper from '../../components/PreviousYearPapers/PreviousYearPapersWrapper';
import ResultsWrapper from '../../components/Results/ResultsWrapper';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { paperService, resultService, updateService } from '../../services/api';

const ForStudents = () => {
    const [activeTab, setActiveTab] = useState('updates');
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Add states for papers and results
    const [previousYearPapers, setPreviousYearPapers] = useState([]);
    const [resultSections, setResultSections] = useState([]);
    const [loadingPapers, setLoadingPapers] = useState(false);
    const [loadingResults, setLoadingResults] = useState(false);

    // Fetch announcements from the backend using updateService instead of api.announcements
    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                setLoading(true);
                setError(null);

                // Use updateService instead of api.announcements
                const response = await updateService.getByCamp();
                console.log('Fetched updates/announcements:', response);

                // Transform the data to match the expected format for AnnouncementItem
                const formattedAnnouncements = Array.isArray(response) ? response.map(update => ({
                    id: update.id,
                    date: formatDate(update.time || update.created_at),
                    title: update.title,
                    announcementDetails: [update.text],
                    // Add venue and time with fallbacks
                    venue: update.venue || 'Location information not available',
                    time: update.examTime || formatTime(update.time) || 'Time information not available',
                    // Store the original for reference
                    original: update
                })) : [];

                setAnnouncements(formattedAnnouncements);
            } catch (err) {
                console.error('Error fetching announcements:', err);
                setError('Failed to load announcements. Please try again later.');
                // Set fallback data in case of error
                setAnnouncements([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncements();
    }, []);

    // Fetch papers data
    useEffect(() => {
        const fetchPapers = async () => {
            try {
                setLoadingPapers(true);

                // Get all papers without camp filter
                const data = await paperService.getAllPapers({
                    sort_by: 'exam_date',
                    sort_order: 'descending'
                });

                // Group papers by type
                const screeningPapers = [];
                const surprisePapers = [];
                const weeklyPapers = [];

                // Format data for display
                data.results.forEach(paper => {
                    const formattedPaper = {
                        no: paper.id,
                        camp: paper.camp_name || 'Unknown',
                        examDate: formatDate(paper.exam_date),
                        fileName: paper.title,
                        downloadLink: paper.file_url
                    };

                    // Group by paper type
                    if (paper.type === 'screening') {
                        screeningPapers.push(formattedPaper);
                    } else if (paper.type === 'surprise') {
                        surprisePapers.push(formattedPaper);
                    } else if (paper.type === 'weekly') {
                        weeklyPapers.push(formattedPaper);
                    }
                });

                // Create the data structure expected by PreviousYearPapersWrapper
                const formattedPaperSections = [
                    {
                        id: 1,
                        sectionName: "Screening test papers",
                        papers: screeningPapers
                    },
                    {
                        id: 2,
                        sectionName: "Surprise test papers",
                        papers: surprisePapers
                    },
                    {
                        id: 3,
                        sectionName: "Weekly test papers",
                        papers: weeklyPapers
                    }
                ];

                setPreviousYearPapers(formattedPaperSections);
            } catch (error) {
                console.error('Error fetching papers:', error);
                // Set fallback data in case of error
                setPreviousYearPapers([]);
            } finally {
                setLoadingPapers(false);
            }
        };

        fetchPapers();
    }, []);

    // Fetch results data
    useEffect(() => {
        const fetchResults = async () => {
            try {
                setLoadingResults(true);

                // Get all results without camp filter
                const data = await resultService.getAllResults({
                    sort_by: 'result_date',
                    sort_order: 'descending'
                });

                // Group results by type
                const screeningResults = [];
                const surpriseResults = [];
                const weeklyResults = [];

                // Format data for display
                data.results.forEach(result => {
                    const formattedResult = {
                        no: result.id,
                        camp: result.camp_name || 'Unknown',
                        standard: result.standard || 'All',
                        fileName: result.title,
                        downloadLink: result.file_url
                    };

                    // Group by result type
                    if (result.type === 'screening') {
                        screeningResults.push(formattedResult);
                    } else if (result.type === 'surprise') {
                        surpriseResults.push(formattedResult);
                    } else if (result.type === 'weekly') {
                        weeklyResults.push(formattedResult);
                    }
                });

                // Create the data structure expected by ResultsWrapper
                const formattedResultSections = [
                    {
                        id: 1,
                        sectionName: "Screening test results",
                        results: screeningResults
                    },
                    {
                        id: 2,
                        sectionName: "Surprise test results",
                        results: surpriseResults
                    },
                    {
                        id: 3,
                        sectionName: "Weekly test results",
                        results: weeklyResults
                    }
                ];

                setResultSections(formattedResultSections);
            } catch (error) {
                console.error('Error fetching results:', error);
                // Set fallback data in case of error
                setResultSections([]);
            } finally {
                setLoadingResults(false);
            }
        };

        fetchResults();
    }, []);

    // Helper function to format date to DD-MM-YYYY
    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            if (isNaN(date)) return 'Date not available';
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        } catch (e) {
            console.error('Error formatting date:', e);
            return 'Date not available';
        }
    };

    // Helper function to format time (HH:MM AM/PM)
    const formatTime = (dateString) => {
        try {
            const date = new Date(dateString);
            if (isNaN(date)) return null;
            return date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        } catch (e) {
            console.error('Error formatting time:', e);
            return null;
        }
    };

    // Handle download for papers and results
    const handleDownload = (url, fileName) => {
        // Create a download link
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="for-students-container">
            {/* Breadcrumb Navigation */}
            <div className="breadcrumb">
                <Link to="/" className="breadcrumb-link">Home</Link>
                <span className="breadcrumb-separator">&gt;</span>
                <span className="breadcrumb-current">For students</span>
            </div>

            {/* Main Content */}
            <div className="for-students-title-container">
                <h1 className="for-students-page-title">Important Resources for students</h1>
                <p className="for-students-description">
                    This section provides all the essential academic materials for students.
                    Access Previous Year Question Papers (PYQs) to prepare effectively, view
                    marks lists to track your progress, and download other important materials
                    to support your studies. Check regularly for updates!
                </p>
            </div>

            {/* Tabs Container */}
            <div className="for-students-tabs-container">
                {/* Tabs */}
                <div className="for-students-resource-tabs">
                    <div
                        className={`for-students-tab ${activeTab === 'updates' ? 'active' : ''}`}
                        onClick={() => setActiveTab('updates')}
                    >
                        All updates
                    </div>
                    <div
                        className={`for-students-tab ${activeTab === 'questions' ? 'active' : ''}`}
                        onClick={() => setActiveTab('questions')}
                    >
                        Previous year questions
                    </div>
                    <div
                        className={`for-students-tab ${activeTab === 'results' ? 'active' : ''}`}
                        onClick={() => setActiveTab('results')}
                    >
                        Results
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'updates' && (
                    <div className="for-students-tab-content announcementItem-announcements-container">
                        {loading ? (
                            <div className="loading-message">Loading announcements...</div>
                        ) : error ? (
                            <div className="error-message">{error}</div>
                        ) : announcements.length > 0 ? (
                            announcements.map((announcement, index) => (
                                <AnnouncementItem
                                    key={announcement.id}
                                    date={announcement.date}
                                    title={announcement.title}
                                    showDivider={index > 0}
                                    announcement={announcement}
                                    comingFrom='/for-students'
                                />
                            ))
                        ) : (
                            <div className="no-data-message">No announcements available at this time.</div>
                        )}
                    </div>
                )}

                {activeTab === 'questions' && (
                    <div className="for-students-tab-content">
                        {loadingPapers ? (
                            <div className="loading-message">Loading previous year papers...</div>
                        ) : previousYearPapers.length > 0 ? (
                            <PreviousYearPapersWrapper
                                paperSections={previousYearPapers}
                                onDownload={handleDownload}
                            />
                        ) : (
                            <div className="no-data-message">No previous year papers available at this time.</div>
                        )}
                    </div>
                )}

                {activeTab === 'results' && (
                    <div className="for-students-tab-content">
                        {loadingResults ? (
                            <div className="loading-message">Loading results...</div>
                        ) : resultSections.length > 0 ? (
                            <ResultsWrapper
                                resultSections={resultSections}
                                onDownload={handleDownload}
                            />
                        ) : (
                            <div className="no-data-message">No results available at this time.</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForStudents;
