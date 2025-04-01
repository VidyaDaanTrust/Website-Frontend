import React, { createContext, useState, useContext, useEffect } from 'react';
import { galleryService } from '../services/api';

// Create a context
const GalleryContext = createContext();

// Create a provider component
export const GalleryProvider = ({ children }) => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch gallery items
  const fetchGalleryItems = async (params = {}) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await galleryService.getAll(params);
      console.log('Gallery data fetched:', response);
      setGalleryItems(Array.isArray(response) ? response : []);
    } catch (err) {
      console.error('Error fetching gallery items:', err);
      setError('Failed to fetch gallery items');
      setGalleryItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Initially fetch all gallery items
  useEffect(() => {
    fetchGalleryItems();
  }, []);

  // Group gallery items by location
  const getGalleryByLocation = () => {
    if (!galleryItems.length) return {};
    
    const groupedGallery = {};
    galleryItems.forEach(item => {
      const location = item.location || 'Unknown';
      if (!groupedGallery[location]) {
        groupedGallery[location] = [];
      }
      groupedGallery[location].push(item);
    });
    
    return groupedGallery;
  };

  // Filter gallery items by location
  const getItemsByLocation = (location) => {
    if (!location) return galleryItems;
    return galleryItems.filter(item => item.location === location);
  };
  
  // Provide values to consumers
  const value = {
    galleryItems,
    isLoading,
    error,
    fetchGalleryItems,
    getGalleryByLocation,
    getItemsByLocation
  };

  return (
    <GalleryContext.Provider value={value}>
      {children}
    </GalleryContext.Provider>
  );
};

// Custom hook to use the gallery context
export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error('useGallery must be used within a GalleryProvider');
  }
  return context;
};

export default GalleryContext; 