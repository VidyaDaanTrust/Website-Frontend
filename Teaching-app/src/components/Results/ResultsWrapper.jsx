import React from 'react';
import Results from './results';

const ResultsWrapper = ({ resultSections }) => {
    return (
        <div className="previousYearPapers-and-results-wrapper">
            {resultSections.map((resultSection, index) => (
                <Results
                    key={resultSection.id}
                    sectionName={resultSection.sectionName}
                    results={resultSection.results}
                    showDivider={index > 0}
                    isFirst={index === 0}
                    isLast={index === resultSections.length - 1}
                />
            ))}
        </div>
    );
};

export default ResultsWrapper;