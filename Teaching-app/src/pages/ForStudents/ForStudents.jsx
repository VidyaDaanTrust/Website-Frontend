import React, { useState, useEffect } from 'react';
import './ForStudents.css';
import '../../components/AnnouncementItem/AnnouncementItem.css';
import AnnouncementItem from '../../components/AnnouncementItem/AnnouncementItem';
import PreviousYearPapersWrapper from '../../components/PreviousYearPapers/PreviousYearPapersWrapper';
import ResultsWrapper from '../../components/Results/ResultsWrapper';
import { Link } from 'react-router-dom';
import api, { pypService, stpService, wtpService, pyrService, strService, wtrService } from '../../services/api';

const ForStudents = () => {
    const [activeTab, setActiveTab] = useState('updates');
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pyp, setPyp] = useState([]);
    const [stp, setStp] = useState([]);
    const [wtp, setWtp] = useState([]);
    const [pyr, setPyr] = useState([]);
    const [str, setStr] = useState([]);
    const [wtr, setWtr] = useState([]);
    const [loadingPyp, setLoadingPyp] = useState(false);
    const [loadingStp, setLoadingStp] = useState(false);
    const [loadingWtp, setLoadingWtp] = useState(false);
    const [loadingPyr, setLoadingPyr] = useState(false);
    const [loadingStr, setLoadingStr] = useState(false);
    const [loadingWtr, setLoadingWtr] = useState(false);
 
    // Fetch announcements from the backend
    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await api.announcements.getAll();
                // console.log('Fetched announcements:', response);

                // Transform the data to match the expected format
                const formattedAnnouncements = response.map(announcement => ({
                    id: announcement.id,
                    date: formatDate(announcement.date_posted),
                    title: announcement.title,
                    announcementDetails: [announcement.formatted_content],
                    // Add venue and time with fallbacks even if backend fields don't exist yet
                    venue: announcement.venue || (announcement.original && announcement.original.venue) || 'Location information not available',
                    time: announcement.time || (announcement.original && announcement.original.time) || 'Time information not available',
                    // Store the original for reference 
                    original: announcement
                }));

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

    // Fetch all papers and results data
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Set loading states
                setLoadingPyp(true);
                setLoadingStp(true);
                setLoadingWtp(true);
                setLoadingPyr(true);
                setLoadingStr(true);
                setLoadingWtr(true);
                setError(null);
                
                // Fetch all data in parallel for better performance
                const [pypData, stpData, wtpData, pyrData, strData, wtrData] = await Promise.all([
                    pypService.getAll().catch(err => {
                        console.error('Error fetching PYP data:', err);
                        return [];
                    }),
                    stpService.getAll().catch(err => {
                        console.error('Error fetching STP data:', err);
                        return [];
                    }),
                    wtpService.getAll().catch(err => {
                        console.error('Error fetching WTP data:', err);
                        return [];
                    }),
                    pyrService.getAll().catch(err => {
                        console.error('Error fetching PYR data:', err);
                        return [];
                    }),
                    strService.getAll().catch(err => {
                        console.error('Error fetching STR data:', err);
                        return [];
                    }),
                    wtrService.getAll().catch(err => {
                        console.error('Error fetching WTR data:', err);
                        return [];
                    })
                ]);

                // Set state with fetched data
                setPyp(Array.isArray(pypData) ? pypData : []);
                setStp(Array.isArray(stpData) ? stpData : []);
                setWtp(Array.isArray(wtpData) ? wtpData : []);
                setPyr(Array.isArray(pyrData) ? pyrData : []);
                setStr(Array.isArray(strData) ? strData : []);
                setWtr(Array.isArray(wtrData) ? wtrData : []);
                
                console.log('Data fetched:', {
                    pyp: pypData,
                    stp: stpData,
                    wtp: wtpData,
                    pyr: pyrData,
                    str: strData,
                    wtr: wtrData
                });
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load some content. Please try again later.');
                
                // Set empty arrays as fallback
                setPyp([]);
                setStp([]);
                setWtp([]);
                setPyr([]);
                setStr([]);
                setWtr([]);
            } finally {
                // Clear loading states
                setLoadingPyp(false);
                setLoadingStp(false);
                setLoadingWtp(false);
                setLoadingPyr(false);
                setLoadingStr(false);
                setLoadingWtr(false);
            }
        };

        fetchData();
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

    const formatImageUrl = (imageUrl) => {
        if (!imageUrl) return '';

        // If it's already an absolute URL, ensure it uses HTTPS
        if (imageUrl.startsWith('http')) {
            return imageUrl.replace('http://', 'https://');
        }

        // For relative URLs, add the backend URL with HTTPS
        if (imageUrl.startsWith('/media')) {
            const apiUrl = import.meta.env.VITE_API_URL.replace('http://', 'https://');
            return `${apiUrl}${imageUrl}`;
        }

        return imageUrl;
    };

    const handleDownload = async (fileUrl, id, type) => {
        try {
            if (!fileUrl) {
                console.error(`No file URL provided for ${type} download`);
                return;
            }

            // If direct file URL is available, use window.open
            if (fileUrl.startsWith('http://') || fileUrl.startsWith('https://')) {
                window.open(fileUrl, '_blank');
                return;
            }

            // Select the appropriate service based on type
            let response;
            switch (type) {
                case 'pyp':
                    response = await pypService.download(id);
                    break;
                case 'stp':
                    response = await stpService.download(id);
                    break;
                case 'wtp':
                    response = await wtpService.download(id);
                    break;
                case 'pyr':
                    response = await pyrService.download(id);
                    break;
                case 'str':
                    response = await strService.download(id);
                    break;
                case 'wtr':
                    response = await wtrService.download(id);
                    break;
                default:
                    console.error('Invalid download type:', type);
                    return;
            }

            // Create a blob from the response data
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const url = window.URL.createObjectURL(blob);

            // Create a temporary link and click it
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${type}_${id}.pdf`); // Default filename
            document.body.appendChild(link);
            link.click();

            // Clean up
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
        } catch (error) {
            console.error(`Error downloading ${type}:`, error);
        }
    };

    // Transform Previous Year Papers data for components
    const getPreviousYearPapersData = () => {
        // Check if we're loading any paper data
        const isLoading = loadingPyp || loadingStp || loadingWtp;
        
        if (isLoading) {
            return [
                {
                    id: 1,
                    sectionName: "Loading papers...",
                    papers: [
                        { no: 1, camp: 'Loading...', examDate: 'Loading...', fileName: 'Loading...', downloadLink: '' }
                    ]
                }
            ];
        }

        // Prepare the data structure
        const paperSections = [];
        
        // Process screening test papers (PYP)
        if (pyp.length > 0) {
            const screeningPapers = pyp.map((paper, idx) => ({
                no: idx + 1,
                camp: paper.location || 'Not specified',
                examDate: formatDate(paper.exam_date),
                fileName: paper.title || `Paper ${paper.id}`,
                downloadLink: paper.file_url || '',
                id: paper.id
            }));
            
            paperSections.push({
                id: 1,
                sectionName: "Screening test papers",
                papers: screeningPapers
            });
        }
        
        // Process surprise test papers (STP)
        if (stp.length > 0) {
            const surprisePapers = stp.map((paper, idx) => ({
                no: idx + 1,
                camp: paper.location || 'Not specified',
                examDate: formatDate(paper.exam_date),
                fileName: paper.title || `Paper ${paper.id}`,
                downloadLink: paper.file_url || '',
                id: paper.id
            }));
            
            paperSections.push({
                id: 2,
                sectionName: "Surprise test papers",
                papers: surprisePapers
            });
        }
        
        // Process weekly test papers (WTP)
        if (wtp.length > 0) {
            const weeklyPapers = wtp.map((paper, idx) => ({
                no: idx + 1,
                camp: paper.location || 'Not specified',
                examDate: formatDate(paper.exam_date),
                fileName: paper.title || `Paper ${paper.id}`,
                downloadLink: paper.file_url || '',
                id: paper.id
            }));
            
            paperSections.push({
                id: 3,
                sectionName: "Weekly test papers",
                papers: weeklyPapers
            });
        }
        
        // If no data is available after loading is complete, provide a message
        if (paperSections.length === 0) {
            return [
                {
                    id: 1,
                    sectionName: "No papers available",
                    papers: [
                        { no: 1, camp: 'N/A', examDate: 'N/A', fileName: 'No papers are currently available', downloadLink: '' }
                    ]
                }
            ];
        }
        
        return paperSections;
    };
    
    // Transform Results data for components
    const getResultsData = () => {
        // Check if we're loading any results data
        const isLoading = loadingPyr || loadingStr || loadingWtr;
        
        if (isLoading) {
            return [
                {
                    id: 1,
                    sectionName: "Loading results...",
                    results: [
                        { no: 1, camp: 'Loading...', standard: 'Loading...', fileName: 'Loading...', downloadLink: '' }
                    ]
                }
            ];
        }
        
        // Prepare the data structure
        const resultSections = [];
        
        // Process screening test results (PYR)
        if (pyr && pyr.length > 0) {
            const screeningResults = pyr.map((result, idx) => ({
                no: idx + 1,
                camp: result.location || 'Not specified',
                standard: result.standard || 'All',
                fileName: result.title || `Result ${result.id}`,
                downloadLink: result.file_url || '',
                id: result.id
            }));
            
            resultSections.push({
                id: 1,
                sectionName: "Screening test results",
                results: screeningResults
            });
        }
        
        // Process surprise test results (STR)
        if (str && str.length > 0) {
            const surpriseResults = str.map((result, idx) => ({
                no: idx + 1,
                camp: result.location || 'Not specified',
                standard: result.standard || 'All',
                fileName: result.title || `Result ${result.id}`,
                downloadLink: result.file_url || '',
                id: result.id
            }));
            
            resultSections.push({
                id: 2,
                sectionName: "Surprise test results",
                results: surpriseResults
            });
        }
        
        // Process weekly test results (WTR)
        if (wtr && wtr.length > 0) {
            const weeklyResults = wtr.map((result, idx) => ({
                no: idx + 1,
                camp: result.location || 'Not specified',
                standard: result.standard || 'All',
                fileName: result.title || `Result ${result.id}`,
                downloadLink: result.file_url || '',
                id: result.id
            }));
            
            resultSections.push({
                id: 3,
                sectionName: "Weekly test results",
                results: weeklyResults
            });
        }
        
        // If no data is available after loading is complete, provide a message
        if (resultSections.length === 0) {
            return [
                {
                    id: 1,
                    sectionName: "No results available",
                    results: [
                        { no: 1, camp: 'N/A', standard: 'N/A', fileName: 'No results are currently available', downloadLink: '' }
                    ]
                }
            ];
        }
        
        console.log('Results data processed:', resultSections);
        return resultSections;
    };

    // Results data organized as an array of categories
    const resultSections = [
        {
            id: 1,
            sectionName: "Screening test results",
            results: [
                { no: 1, camp: 'Saikot', standard: '12', fileName: 'Test_result_12th_2025', downloadLink: '/testing_download_button_forstudents_results.jpg' },
                { no: 2, camp: 'Saikot', standard: '11', fileName: 'Test_result_11th_2025', downloadLink: '/testing_download_button_forstudents_results.jpg' },
                { no: 3, camp: 'Saikot', standard: '10', fileName: 'Test_result_10th_2025', downloadLink: '/testing_download_button_forstudents_results.jpg' }
            ]
        },
        {
            id: 2,
            sectionName: "Surprise test results",
            results: [
                { no: 1, camp: 'Shimla', standard: '12', fileName: 'Surprise_test_result_1_2025', downloadLink: '/testing_download_button_forstudents_results.jpg' },
                { no: 2, camp: 'Dehradun', standard: '11', fileName: 'Surprise_test_result_2_2025', downloadLink: '/testing_download_button_forstudents_results.jpg' }
            ]
        },
        {
            id: 3,
            sectionName: "Weekly test results",
            results: [
                { no: 1, camp: 'Nainital', standard: '12', fileName: 'Weekly_test_result_week1_2025', downloadLink: '/testing_download_button_forstudents_results.jpg' },
                { no: 2, camp: 'Dharamshala', standard: '11', fileName: 'Weekly_test_result_week2_2025', downloadLink: '/testing_download_button_forstudents_results.jpg' },
                { no: 3, camp: 'Manali', standard: '10', fileName: 'Weekly_test_result_week3_2025', downloadLink: '/testing_download_button_forstudents_results.jpg' }
            ]
        }
    ];

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
                        {loadingPyp || loadingStp || loadingWtp ? (
                            <div className="loading-message">Loading previous year papers...</div>
                        ) : (
                            <PreviousYearPapersWrapper 
                                paperSections={getPreviousYearPapersData()} 
                                onDownload={(fileUrl, id) => {
                                    // Determine the correct type based on section
                                    const paperSections = getPreviousYearPapersData();
                                    let paperType = 'pyp'; // Default
                                    
                                    // Find which section this paper belongs to
                                    for (const section of paperSections) {
                                        const paper = section.papers.find(p => p.id === id);
                                        if (paper) {
                                            if (section.sectionName.toLowerCase().includes('surprise')) {
                                                paperType = 'stp';
                                            } else if (section.sectionName.toLowerCase().includes('weekly')) {
                                                paperType = 'wtp';
                                            }
                                            break;
                                        }
                                    }
                                    
                                    handleDownload(fileUrl, id, paperType);
                                }}
                            />
                        )}
                    </div>
                )}

                {activeTab === 'results' && (
                    <div className="for-students-tab-content">
                        {loadingPyr || loadingStr || loadingWtr ? (
                            <div className="loading-message">Loading results...</div>
                        ) : (
                            <ResultsWrapper 
                                resultSections={getResultsData()} 
                                onDownload={(fileUrl, id) => {
                                    // Determine the correct type based on section
                                    const resultSections = getResultsData();
                                    let resultType = 'pyr'; // Default
                                    
                                    // Find which section this result belongs to
                                    for (const section of resultSections) {
                                        const result = section.results.find(r => r.id === id);
                                        if (result) {
                                            if (section.sectionName.toLowerCase().includes('surprise')) {
                                                resultType = 'str';
                                            } else if (section.sectionName.toLowerCase().includes('weekly')) {
                                                resultType = 'wtr';
                                            }
                                            break;
                                        }
                                    }
                                    
                                    handleDownload(fileUrl, id, resultType);
                                }}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForStudents;