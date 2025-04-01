import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import DataProvider from './store/Data.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './contexts/AuthContext';
import { GalleryProvider } from './context/GalleryContext';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <DataProvider>
                <AuthProvider>
                    <GalleryProvider>
                        <App />
                    </GalleryProvider>
                </AuthProvider>
            </DataProvider>
        </BrowserRouter>
    </StrictMode>
)
