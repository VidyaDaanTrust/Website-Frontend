import React from 'react'
import './TeachingReports.css'
import { TeachingReportsData } from '../../../pages/Teaching/TeachingData'; // Keep as fallback
import TeachingPageReportCard from "../../TeachingPageReportCard/TeachingPageReportCard";

const TeachingReports = ({ reports = [], loading = false, error = null, onDownload }) => {
    // Use props if provided, or fall back to the static data
    const displayReports = Array.isArray(reports) && reports.length > 0 
        ? reports 
        : TeachingReportsData;

    return (
        <div className='teaching-content-container'>
            <h2>Reports</h2>
            {loading ? (
                <div className="loading-message">Loading reports...</div>
            ) : error ? (
                <div className="error-message">{error}</div>
            ) : (
                <div className="teaching-reports-cards-container">
                    {displayReports.map((report, index) => (
                        <TeachingPageReportCard
                            key={report.id || index}
                            title={report.title}
                            placeName={report.placeName || report.location}
                            year={report.year || (report.created_at ? new Date(report.created_at).getFullYear() : '')}
                            onClick={() => onDownload(report.fileUrl, report.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default TeachingReports