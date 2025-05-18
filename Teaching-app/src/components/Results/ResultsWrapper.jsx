// src/components/Results/ResultsWrapper.jsx
import React from 'react';
import Results from './results';

const ResultsWrapper = ({ resultSections, onDownload }) => {
    return (
        <div className="results-wrapper">
            {resultSections.map((section, index) => (
                <Results
                    key={section.id}
                    showDivider={true}
                    sectionName={section.sectionName}
                    results={section.results}
                    isFirst={index === 0}
                    isLast={index === resultSections.length - 1}
                    onDownload={onDownload}
                />
            ))}
        </div>
    );
};

export default ResultsWrapper;
