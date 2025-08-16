import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PodcastsPage from './pages/PodcastsPage';
import PodcastDetailsPage from './pages/PodcastDetailsPage';
import './styles/components.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Kada odemo na root '/', preusmeri na /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login stranica */}
        <Route path="/login" element={<LoginPage />} />

        {/* Lista podkasta */}
        <Route path="/podcasts" element={<PodcastsPage />} />

        {/* Detalji podkasta */}
        <Route path="/podcasts/:id" element={<PodcastDetailsPage />} />

        {/* Ruta za nepostojeće stranice */}
        <Route path="*" element={<h2>404 – Stranica nije pronađena</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
