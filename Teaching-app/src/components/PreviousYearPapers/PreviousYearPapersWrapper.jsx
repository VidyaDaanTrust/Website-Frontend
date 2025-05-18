// src/components/PreviousYearPapers/PreviousYearPapersWrapper.jsx
import React from 'react';
import PreviousYearPapers from './PreviousYearPapers';
import './PreviousYearPapers.css';

const PreviousYearPapersWrapper = ({ paperSections, onDownload }) => {
    return (
        <div className="pyp-wrapper">
            {paperSections.map((section, index) => (
                <PreviousYearPapers
                    key={section.id}
                    showDivider={true}
                    sectionName={section.sectionName}
                    papers={section.papers}
                    isFirst={index === 0}
                    isLast={index === paperSections.length - 1}
                    onDownload={onDownload}
                />
            ))}
        </div>
    );
};

export default PreviousYearPapersWrapper;
