import React from 'react';
import PreviousYearPapers from './PreviousYearPapers';
import './PreviousYearPapers.css';

const PreviousYearPapersWrapper = ({ paperSections }) => {
    return (
        <div className="previousYearPapers-and-results-wrapper">
            {paperSections.map((paperSection, index) => (
                <PreviousYearPapers
                    key={paperSection.id}
                    sectionName={paperSection.sectionName}
                    papers={paperSection.papers}
                    showDivider={index > 0}
                    isFirst={index === 0}
                    isLast={index === paperSections.length - 1}
                />
            ))}
        </div>
    );
};

export default PreviousYearPapersWrapper;