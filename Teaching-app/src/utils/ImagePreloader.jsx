// src/utils/ImagePreloader.js
import { useState, useEffect } from 'react';

/**
 * Hook for preloading images before rendering a component
 * @param {Array} imageSources - Array of image sources to preload
 * @param {Boolean} failSafe - If true, will continue even if some images fail to load
 * @returns {Object} - Loading state and progress information
 */
export const useImagePreloader = (imageSources, failSafe = true) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState({
    loaded: 0,
    total: imageSources.length,
    percentage: 0
  });

  useEffect(() => {
    // If there are no images, don't show loading state
    if (!imageSources || imageSources.length === 0) {
      setIsLoading(false);
      return;
    }

    let mounted = true;
    
    // Create an array to track loading status for each image
    const imagePromises = imageSources.map((src, index) => {
      return new Promise((resolve, reject) => {
        if (!src) {
          // Handle null or undefined sources
          if (mounted) {
            setLoadingProgress(prev => {
                const newLoaded = Math.min(prev.loaded + 1, prev.total);
                const percentage = Math.round((newLoaded / prev.total) * 100);
                return {
                  ...prev,
                  loaded: newLoaded,
                  percentage
                };
              });
          }
          resolve();
          return;
        }

        const img = new Image();
        img.src = src;
        
        img.onload = () => {
          if (mounted) {
            setLoadingProgress(prev => {
                const newLoaded = Math.min(prev.loaded + 1, prev.total);
                const percentage = Math.round((newLoaded / prev.total) * 100);
                return {
                  ...prev,
                  loaded: newLoaded,
                  percentage
                };
              });
          }
          resolve();
        };
        
        img.onerror = () => {
          console.error(`Failed to load image: ${src}`);
          if (mounted) {
            setLoadingProgress(prev => {
                const newLoaded = Math.min(prev.loaded + 1, prev.total);
                const percentage = Math.round((newLoaded / prev.total) * 100);
                return {
                  ...prev,
                  loaded: newLoaded,
                  percentage
                };
              });
          }
          
          if (failSafe) {
            resolve(); // Continue even if image fails to load
          } else {
            reject(new Error(`Failed to load image: ${src}`));
          }
        };
      });
    });

    // When all images are loaded, set loading to false
    Promise.all(imagePromises)
      .then(() => {
        if (mounted) {
          // Add a small delay to ensure smooth transition
          setTimeout(() => {
            setIsLoading(false);
          }, 300);
        }
      })
      .catch(error => {
        console.error("Image loading error:", error);
        if (mounted && failSafe) {
          setIsLoading(false);
        }
      });

    // Cleanup function
    return () => {
      mounted = false;
    };
  }, [imageSources, failSafe]);

  return { isLoading, loadingProgress };
};

/**
 * Extract image sources from React elements
 * @param {Object} dataObject - Object containing React elements with images
 * @returns {Array} - Array of image source URLs
 */
export const extractImageSources = (dataObject) => {
  const imageSources = [];

  // Helper function to recursively extract image sources
  const extractFromElement = (element) => {
    // Skip if element is null or undefined
    if (!element) return;
    
    // Check if this is a React element
    if (element.props) {
      // Check if this is an image element
      if (element.type === 'img' && element.props.src) {
        imageSources.push(element.props.src);
      }
      
      // Check children elements
      if (element.props.children) {
        if (Array.isArray(element.props.children)) {
          element.props.children.forEach(child => extractFromElement(child));
        } else {
          extractFromElement(element.props.children);
        }
      }
    }
    
    // Handle React fragments or arrays of elements
    if (Array.isArray(element)) {
      element.forEach(child => extractFromElement(child));
    }
  };

  // Handle different data structures
  if (Array.isArray(dataObject)) {
    // If dataObject is an array, process each item
    dataObject.forEach(item => {
      // Process each property of the item
      Object.values(item).forEach(value => {
        extractFromElement(value);
      });
    });
  } else if (typeof dataObject === 'object' && dataObject !== null) {
    // If dataObject is a regular object, process each property
    Object.values(dataObject).forEach(value => {
      extractFromElement(value);
    });
  }

  // Remove duplicates and return
  return [...new Set(imageSources)];
};

/**
 * Loading indicator component
 */
export const LoadingIndicator = ({ progress }) => {
  return (
    <div className="loading-container" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100%',
      backgroundColor: '#f5f5f5'
    }}>
      <div className="loading-spinner" style={{
        width: '50px',
        height: '50px',
        border: '5px solid #f3f3f3',
        borderTop: '7px solid green',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '20px'
      }}></div>
      
      <div style={{
        width: '300px',
        height: '10px',
        backgroundColor: '#e0e0e0',
        borderRadius: '5px',
        overflow: 'hidden',
        margin: '10px 0'
      }}>
        <div style={{
          width: `${progress.percentage}%`,
          height: '100%',
          backgroundColor: 'green',
          transition: 'width 0.3s ease'
        }}></div>
      </div>
      
      <p>Loading content... {progress.percentage}%</p>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};