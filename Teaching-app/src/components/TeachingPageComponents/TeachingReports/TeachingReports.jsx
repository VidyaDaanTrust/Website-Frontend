import React from 'react'
import './TeachingReports.css'
import { TeachingReportsData } from '../../../pages/Teaching/TeachingData';
import TeachingPageReportCard from "../../TeachingPageReportCard/TeachingPageReportCard";

const TeachingReports = () => {
    return (
        <div className='teaching-content-container'>
            <h2>Reports</h2>
            <div className="teaching-reports-cards-container">
                {TeachingReportsData.map((report, index) => (
                    <TeachingPageReportCard
                        key={index}
                        title={report.title}
                        placeName={report.placeName}
                        year={report.year}
                    />
                ))}
            </div>
        </div>
    )
}

export default TeachingReports
