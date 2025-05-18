// src/components/DocumentList/DocumentListWrapper.jsx
import React from 'react';
import DocumentList from './DocumentList';
import './DocumentList.css';

const DocumentListWrapper = ({ sections, columnConfig, onDownload }) => {
    return (
        <div className="document-list-wrapper">
            {sections.map((section, index) => (
                <DocumentList
                    key={section.id}
                    showDivider={true}
                    sectionName={section.sectionName}
                    documents={section.documents}
                    isFirst={index === 0}
                    isLast={index === sections.length - 1}
                    columnConfig={columnConfig}
                    onDownload={onDownload}
                />
            ))}
        </div>
    );
};

export default DocumentListWrapper;
