import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import DataProvider from './store/Data.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GalleryProvider } from './context/GalleryContext';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <DataProvider>
            <GalleryProvider>
                <App />
            </GalleryProvider>
        </DataProvider>
    </StrictMode>
)
