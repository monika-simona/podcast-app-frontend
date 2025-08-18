import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import Breadcrumbs from '../components/Breadcrumbs';
import EpisodeCard from '../components/EpisodeCard';
import AddEpisodeForm from '../components/AddEpisodeForm';
import api from '../api';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { AuthContext } from '../context/AuthContext';

function PodcastDetailsPage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [podcast, setPodcast] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { playEpisode } = useAudioPlayer(); 

  const fetchData = async () => {
    try {
      const podcastRes = await api.get(`/podcasts/${id}`);
      const episodesRes = await api.get(`/podcasts/${id}/episodes`);

      setPodcast(podcastRes.data);
      setEpisodes(episodesRes.data);
    } catch (error) {
      console.error("Greška pri učitavanju podataka:", error);
    }
  };

  useEffect(() => { fetchData(); }, [id]);

  const canManage = user && podcast && (user.role === 'admin' || user.id === podcast.user_id);

  const handleDeleteEpisode = async (episodeId) => {
    if (!window.confirm("Da li ste sigurni da želite da obrišete epizodu?")) return;

    try {
      await api.delete(`/episodes/${episodeId}`);
      setEpisodes(prev => prev.filter(ep => ep.id !== episodeId));
    } catch (err) {
      console.error(err);
      alert("Greška prilikom brisanja epizode.");
    }
  };

  const handlePlayEpisode = (episode) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("Morate biti ulogovani da biste slušali epizodu.");
      return;
    }
    playEpisode(episode);
  };

  const paths = [
    { label: 'Početna', link: '/' },
    { label: 'Podkasti', link: '/podcasts' },
    { label: podcast?.title || `Podkast #${id}` }
  ];

  return (
    <div className="podcast-details-page">
      <Breadcrumbs paths={paths} />

      <h1>{podcast?.title}</h1>
      <p><strong>Autor:</strong> {podcast?.author || 'Nepoznat'}</p>
      <p>{podcast?.description}</p>

      {canManage && (
        <div style={{ margin: '20px 0' }}>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Zatvori formu' : 'Dodaj epizodu'}
          </Button>
          {showForm && (
            <AddEpisodeForm
              podcastId={id}
              setEpisodes={setEpisodes}
              onClose={() => setShowForm(false)}
            />
          )}
        </div>
      )}

      <div className="episodes-list">
        <h2>Epizode:</h2>
        {episodes.length > 0 ? (
          episodes.map(ep => (
            <EpisodeCard
              key={ep.id}
              episode={ep}
              canManage={canManage}
              onDelete={() => handleDeleteEpisode(ep.id)}
              setEpisodes={setEpisodes}
            />
          ))
        ) : (
          <p>Ovaj podkast nema epizoda.</p>
        )}
      </div>
    </div>
  );
}

export default PodcastDetailsPage;
