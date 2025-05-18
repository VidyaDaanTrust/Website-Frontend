// src/components/DocumentList/DocumentList.jsx
import React, { useState } from 'react';
import './DocumentList.css';
import pluslogo from "../../assets/bx-plus.svg";
import minuslogo from "../../assets/bx-minus.svg";
import downloadIcon from "../../assets/Download Icon.svg";
import hoveredDownloadIcon from "../../assets/HoveredDownload.svg";
import sorticon from "../../assets/bxs-sort-alt.svg";
import pdficon from "../../assets/Pdf Icon.svg";

const DocumentList = ({
    showDivider,
    sectionName,
    documents,
    isFirst = false,
    isLast = false,
    columnConfig,
    onDownload
}) => {
    // Initialize with section collapsed by default
    const [expanded, setExpanded] = useState(false);

    // State to track which row's download icon is being hovered
    const [hoveredDownloadRow, setHoveredDownloadRow] = useState(null);

    // Track sort state for each column independently
    const [sortStates, setSortStates] = useState(
        Object.keys(columnConfig).reduce((acc, key) => {
            if (columnConfig[key].sortable) {
                acc[key] = null; // null, 'ascending', or 'descending'
            }
            return acc;
        }, {})
    );

    const toggleSection = () => {
        setExpanded(!expanded);
    };

    // Parse date string (DD-MM-YYYY) to Date object for comparison
    const parseDate = (dateStr) => {
        if (!dateStr || dateStr === 'Date not available') return new Date(0);
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
            // First click - use default direction based on column type
            if (columnConfig[key].type === 'date') {
                newSortStates[key] = 'descending'; // Newest first
            } else {
                newSortStates[key] = 'ascending'; // A-Z
            }
        } else if (newSortStates[key] === 'ascending') {
            // Second click: switch to descending
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
        const columnType = columnConfig[sortKey].type;

        return [...data].sort((a, b) => {
            // Handle different types of sorting
            if (columnType === 'date') {
                const dateA = parseDate(a[sortKey]);
                const dateB = parseDate(b[sortKey]);
                return direction === 'ascending' ? dateA - dateB : dateB - dateA;
            } else if (columnType === 'number') {
                const numA = parseInt(a[sortKey]) || 0;
                const numB = parseInt(b[sortKey]) || 0;
                return direction === 'ascending' ? numA - numB : numB - numA;
            } else {
                // Default string comparison
                if (a[sortKey] < b[sortKey]) {
                    return direction === 'ascending' ? -1 : 1;
                }
                if (a[sortKey] > b[sortKey]) {
                    return direction === 'ascending' ? 1 : -1;
                }
                return 0;
            }
        });
    };

    const renderTable = () => {
        const sortedDocuments = getSortedData(documents);

        return (
            <div className="table-container">
                <table className="documents-table">
                    <thead>
                        <tr>
                            <th>No</th>
                            {Object.entries(columnConfig).map(([key, config]) => (
                                <th
                                    key={key}
                                    className={config.sortable ? "sortable-header" : ""}
                                    onClick={config.sortable ? () => handleSort(key) : undefined}
                                >
                                    {config.label}
                                    {config.sortable && (
                                        <img
                                            src={sorticon}
                                            alt="Sort"
                                            className={`sort-icon ${sortStates[key] ? 'active' : ''}`}
                                        />
                                    )}
                                </th>
                            ))}
                            <th>Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedDocuments.map((doc, index) => (
                            <tr key={doc.id || index}>
                                <td>{index + 1}</td>
                                {Object.entries(columnConfig).map(([key, config]) => (
                                    <td key={key}>{doc[key]}</td>
                                ))}
                                <td className="download-cell">
                                    <img
                                        src={hoveredDownloadRow === index ? hoveredDownloadIcon : downloadIcon}
                                        alt="Download"
                                        className="download-icon"
                                        onMouseEnter={() => setHoveredDownloadRow(index)}
                                        onMouseLeave={() => setHoveredDownloadRow(null)}
                                        onClick={() => onDownload(doc)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className={`pyp-section ${expanded ? 'expanded' : ''}`}>
            {showDivider && !isFirst && <div className="section-divider"></div>}

            <div className="section-header" onClick={toggleSection}>
                <h3>{sectionName}</h3>
                <img
                    src={expanded ? minuslogo : pluslogo}
                    alt={expanded ? "Collapse" : "Expand"}
                    className="toggle-icon"
                />
            </div>

            {expanded && documents.length > 0 && renderTable()}
            {expanded && documents.length === 0 && (
                <div className="no-documents">No documents available</div>
            )}

            {showDivider && !isLast && expanded && <div className="section-divider bottom"></div>}
        </div>
    );
};

export default DocumentList;
