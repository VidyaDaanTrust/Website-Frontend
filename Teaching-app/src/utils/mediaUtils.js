// Media utility functions

/**
 * Format an image URL to ensure it has the correct base path
 * @param {string} imageUrl - The image URL from the API
 * @returns {string} - The formatted URL
 */
export const formatImageUrl = (imageUrl) => {
  if (!imageUrl) return '';
  
  // If image_url is available, use it directly
  if (typeof imageUrl === 'object' && imageUrl.image_url) {
    return imageUrl.image_url;
  }
  
  // If we have a properly formatted URL already, use it
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    // Make sure we're not accidentally using https when the server is on http
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    if (baseUrl.startsWith('http://') && imageUrl.startsWith('https://')) {
      return imageUrl.replace('https://', 'http://');
    }
    return imageUrl;
  }
  
  // Check if it's just a path without domain (like /media/...)
  if (imageUrl.startsWith('/media/')) {
    return `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}${imageUrl}`;
  }
  
  // Check if we need to add the /media/ prefix
  if (!imageUrl.startsWith('/media/') && !imageUrl.includes('/media/')) {
    return `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/media/${imageUrl}`;
  }
  
  // Default case: add the API URL as base
  return `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}${imageUrl}`;
};

/**
 * Format a file URL (for PDFs, documents, etc.)
 * @param {string} fileUrl - The file URL from the API
 * @returns {string} - The formatted URL
 */
export const formatFileUrl = (fileUrl) => {
  if (!fileUrl) return '';
  
  // If file_url is available, use it directly
  if (typeof fileUrl === 'object' && fileUrl.file_url) {
    return fileUrl.file_url;
  }
  
  return formatImageUrl(fileUrl); // Reuse the image URL formatting logic
}; 
