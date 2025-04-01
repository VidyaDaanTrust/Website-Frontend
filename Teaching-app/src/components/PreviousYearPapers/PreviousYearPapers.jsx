import React, { useState } from 'react';
import './PreviousYearPapers.css';
import pluslogo from "../../assets/bx-plus.svg";
import minuslogo from "../../assets/bx-minus.svg";
import downloadIcon from "../../assets/Download Icon.svg";
import hoveredDownloadIcon from "../../assets/HoveredDownload.svg";
import sorticon from "../../assets/bxs-sort-alt.svg";
import pdficon from "../../assets/Pdf Icon.svg";

const PreviousYearPapers = ({ showDivider, sectionName, papers, isFirst = false, isLast = false }) => {
    // Initialize with section collapsed by default
    const [expanded, setExpanded] = useState(false);

    // State to track which row's download icon is being hovered
    const [hoveredDownloadRow, setHoveredDownloadRow] = useState(null);

    // Track sort state for each column independently
    const [sortStates, setSortStates] = useState({
        camp: null,       // null, 'ascending', or 'descending'
        examDate: null,   // null, 'ascending', or 'descending'
    });

    const toggleSection = () => {
        setExpanded(!expanded);
    };

    // Parse date string (DD-MM-YYYY) to Date object for comparison
    const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split('-');
        return new Date(year, month - 1, day);
    };

    // Handle sorting when a sortable header is clicked
    const handleSort = (key) => {
        // Create a copy of current sort states
        const newSortStates = { ...sortStates };

        // Reset all other columns' sort states
        Object.keys(newSortStates).forEach(k => {
            if (k !== key) newSortStates[k] = null;
        });

        // Cycle through sort states for the clicked column
        if (newSortStates[key] === null) {
            // First click
            if (key === 'examDate') {
                // For dates: newest first (descending)
                newSortStates[key] = 'descending';
            } else {
                // For text: alphabetical ascending 
                newSortStates[key] = 'ascending';
            }
        } else if (newSortStates[key] === 'ascending') {
            // Second click: always descending
            newSortStates[key] = 'descending';
        } else if (newSortStates[key] === 'descending') {
            // Third click: for dates, switch to oldest first (ascending)
            if (key === 'examDate' && newSortStates[key] === 'descending') {
                newSortStates[key] = 'ascending';
            } else {
                // Third click for others: back to unsorted
                newSortStates[key] = null;
            }
        } else if (key === 'examDate' && newSortStates[key] === 'ascending') {
            // Fourth click for dates: back to unsorted
            newSortStates[key] = null;
        }

        setSortStates(newSortStates);
    };

    // Get sorted data based on current sort states
    const getSortedData = (data) => {
        const sortKey = Object.keys(sortStates).find(key => sortStates[key] !== null);

        if (!sortKey) {
            return [...data]; // Return a copy of unsorted data
        }

        const direction = sortStates[sortKey];

        return [...data].sort((a, b) => {
            // Handle date sorting
            if (sortKey === 'examDate') {
                const dateA = parseDate(a.examDate);
                const dateB = parseDate(b.examDate);
                return direction === 'ascending'
                    ? dateA - dateB    // Oldest first
                    : dateB - dateA;   // Newest first
            }

            // Handle string sorting for other fields
            if (a[sortKey] < b[sortKey]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[sortKey] > b[sortKey]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    };

    const renderTable = (papers) => {
        const sortedPapers = getSortedData(papers);
        const handleDownload = (downloadLink, fileName) => {
            const link = document.createElement('a');
            link.href = downloadLink;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };

        return (
            <table className="previousYearPapers-and-results-papers-table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th
                            className="previousYearPapers-and-results-sortable-header"
                            onClick={() => handleSort('camp')}
                        >
                            <span>Camp</span>
                            <span><img className="previousYearPapers-and-results-sort-icon-image" src={sorticon} alt="" /></span>
                        </th>
                        <th
                            className="previousYearPapers-and-results-sortable-header"
                            onClick={() => handleSort('examDate')}
                        >
                            <span>Exam date</span>
                            <span><img className="previousYearPapers-and-results-sort-icon-image" src={sorticon} alt="" /></span>
                        </th>
                        <th>File name</th>
                        <th className="previousYearPapers-and-results-download-header">Download</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedPapers.map((paper, index) => (
                        <tr key={`${paper.fileName}-${paper.no}`}>
                            <td>{index + 1}</td>
                            <td>{paper.camp}</td>
                            <td>{paper.examDate}</td>
                            <td>
                                <div className="previousYearPapers-and-results-file-name">
                                    <span><img className="previousYearPapers-and-results-pdf-icon" src={pdficon} alt="pdf-Icon" /></span>
                                    <span>{paper.fileName}</span>
                                </div>
                            </td>
                            <td className="previousYearPapers-and-results-download-cell">
                                <img
                                    src={hoveredDownloadRow === index ? hoveredDownloadIcon : downloadIcon}
                                    alt="Download"
                                    className="previousYearPapers-and-results-download-icon"
                                    onMouseEnter={() => setHoveredDownloadRow(index)}
                                    onMouseLeave={() => setHoveredDownloadRow(null)}
                                    onClick={() => handleDownload(paper.downloadLink)}
                                    style={{ cursor: 'pointer' }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <>
            {/* Render divider before the container if needed */}
            {showDivider && <div className="previousYearPapers-and-results-divider"></div>}

            <div className="previousYearPapers-and-results-papers-container">
                {/* Paper Section */}
                <div className={`previousYearPapers-and-results-paper-section ${isFirst ? 'first-section' : ''} ${isLast ? 'last-section' : ''}`}>
                    <div
                        className="previousYearPapers-and-results-section-header"
                        onClick={toggleSection}
                    >
                        <span>{sectionName}</span>
                        <img
                            src={expanded ? minuslogo : pluslogo}
                            alt={expanded ? "Collapse" : "Expand"}
                            className={`previousYearPapers-and-results-toggle-icon ${expanded ? "expanded" : ""}`}
                        />
                    </div>
                    <div className={`previousYearPapers-and-results-section-content ${expanded ? "show" : ""}`}>
                        {renderTable(papers)}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PreviousYearPapers;