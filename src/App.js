import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PodcastsPage from './pages/PodcastsPage';
import PodcastDetailsPage from './pages/PodcastDetailsPage';
import './styles/components.css';
import { AudioPlayerProvider } from './context/AudioPlayerContext';
import AudioPlayerPopup from './components/AudioPlayerPopup';
import RegisterPage from './pages/RegisterPage';
import Navbar from "./components/Navbar";
import MyPodcastsPage from './pages/MyPodcastsPage';
import { AuthProvider } from './context/AuthContext';


function App() {
  return (
  <AuthProvider>
   <AudioPlayerProvider>
    <BrowserRouter>
     <Navbar />
      <Routes>
        {/* Kada odemo na root '/', preusmeri na /login */}
        <Route path="/" element={<Navigate to="/podcasts" replace />} />

        {/* Login stranica */}
        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        {/* Lista podkasta */}
        <Route path="/podcasts" element={<PodcastsPage />} />

        {/* Detalji podkasta */}
        <Route path="/podcasts/:id" element={<PodcastDetailsPage />} />

        <Route path="/my-podcasts" element={<MyPodcastsPage />} />

        {/* Ruta za nepostojeće stranice */}
        <Route path="*" element={<h2>404 – Stranica nije pronađena</h2>} />
      </Routes>
    </BrowserRouter>
    <AudioPlayerPopup />
   </AudioPlayerProvider> 
  </AuthProvider>
  );
}

export default App;
