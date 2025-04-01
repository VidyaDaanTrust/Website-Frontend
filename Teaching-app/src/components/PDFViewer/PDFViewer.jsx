import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PDFViewer.css';

const PDFViewer = ({ pdfUrl, title, documentType, onBack }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set loading to false once the iframe loads
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pdfUrl]);

  const handleDownload = () => {
    // Create a temporary link to download the file
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${title || 'document'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pdf-viewer-container">
      <div className="pdf-viewer-header">
        <button className="back-button" onClick={onBack || (() => navigate(-1))}>
          &larr; Back
        </button>
        <h2>{title || 'Document'}</h2>
        <button className="download-button" onClick={handleDownload}>
          Download PDF
        </button>
      </div>

      <div className="pdf-frame-container">
        {loading && (
          <div className="pdf-loading">
            <div className="spinner"></div>
            <p>Loading PDF...</p>
          </div>
        )}
        
        <iframe
          src={`${pdfUrl}#toolbar=1&navpanes=1`}
          className="pdf-frame"
          title={title || "PDF Viewer"}
          frameBorder="0"
          onLoad={() => setLoading(false)}
        />
      </div>
    </div>
  );
};

export default PDFViewer; 