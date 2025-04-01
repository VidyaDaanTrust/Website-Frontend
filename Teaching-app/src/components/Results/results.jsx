import React, { useState } from 'react';
import "../PreviousYearPapers/PreviousYearPapers.css";
import pluslogo from "../../assets/bx-plus.svg";
import minuslogo from "../../assets/bx-minus.svg";
import downloadIcon from "../../assets/Download Icon.svg";
import hoveredDownloadIcon from "../../assets/HoveredDownload.svg";
import excelIcon from "../../assets/excel-icon.svg";
import sorticon from "../../assets/bxs-sort-alt.svg";

const Results = ({ showDivider, sectionName, results, isFirst = false, isLast = false }) => {
    // Initialize with section collapsed by default
    const [expanded, setExpanded] = useState(false);

    // State to track which row's download icon is being hovered
    const [hoveredDownloadRow, setHoveredDownloadRow] = useState(null);

    // Track sort state for each column independently
    const [sortStates, setSortStates] = useState({
        camp: null,     // null, 'ascending', or 'descending'
        standard: null, // null, 'ascending', or 'descending'
    });

    const toggleSection = () => {
        setExpanded(!expanded);
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
            // First click: alphabetical/numerical ascending
            newSortStates[key] = 'ascending';
        } else if (newSortStates[key] === 'ascending') {
            // Second click: descending
            newSortStates[key] = 'descending';
        } else {
            // Third click: back to unsorted
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
            // Handle numeric sorting for 'standard' if it contains numbers
            if (!isNaN(parseInt(a[sortKey])) && !isNaN(parseInt(b[sortKey]))) {
                const numA = parseInt(a[sortKey]);
                const numB = parseInt(b[sortKey]);
                return direction === 'ascending'
                    ? numA - numB
                    : numB - numA;
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

    const renderTable = (results) => {
        const sortedResults = getSortedData(results);
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
                            onClick={() => handleSort('standard')}
                        >
                            <span>Standard</span>
                            <span><img className="previousYearPapers-and-results-sort-icon-image" src={sorticon} alt="" /></span>
                        </th>
                        <th>File name</th>
                        <th className="previousYearPapers-and-results-download-header">Download</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedResults.map((result, index) => (
                        <tr key={`${result.fileName}-${result.no}`}>
                            <td>{index + 1}</td>
                            <td>{result.camp}</td>
                            <td>{result.standard}</td>
                            <td>
                                <div className="previousYearPapers-and-results-file-name">
                                    <span><img className="previousYearPapers-and-results-pdf-icon" src={excelIcon} alt="excel-Icon" /></span>
                                    <span>{result.fileName}</span>
                                </div>
                            </td>
                            <td className="previousYearPapers-and-results-download-cell">
                                <img
                                    src={hoveredDownloadRow === index ? hoveredDownloadIcon : downloadIcon}
                                    alt="Download"
                                    className="previousYearPapers-and-results-download-icon"
                                    onMouseEnter={() => setHoveredDownloadRow(index)}
                                    onMouseLeave={() => setHoveredDownloadRow(null)}
                                    onClick={() => handleDownload(result.downloadLink, result.fileName)}
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
                {/* Results Section */}
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
                        {renderTable(results)}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Results;