import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useState, useEffect } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import EpisodeCard from '../components/EpisodeCard';
import api from '../api';
import { useAudioPlayer } from '../context/AudioPlayerContext';


function PodcastDetailsPage() {

  const { id } = useParams();     //uzima id iz url-a
  const navigate = useNavigate();

  const [podcast, setPodcast] = useState(null);
  const [episodes, setEpisodes] = useState([]);

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

  useEffect(() => {fetchData();}, [id]);


  const handlePlayEpisode = (episode) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("Morate biti ulogovani da biste slušali epizodu.");
      return;
    }
    playEpisode(episode);
  };

  //breadcrumbs putanja
  const paths = [
    { label: 'Početna', link: '/' },
    { label: 'Podkasti', link: '/podcasts' },
    { label:  podcast?.title || `Podkast #${id}` }
  ];

  return (
    <div className="podcast-details-page">
      <Breadcrumbs paths={paths} />

      {/* informacije o podcastu */}
      <h1>{podcast?.title}</h1>
          <p><strong>Autor:</strong> {podcast?.author || "Nepoznat"}</p>
          <p>{podcast?.description}</p>

      <div className="episodes-list">
        <h2>Epizode:</h2>
        {episodes.length > 0 ? (
              episodes.map(ep => (
                <EpisodeCard key={ep.id} episode={ep} onPlay={handlePlayEpisode} />
              ))
            ) : (
              <p>Ovaj podkast nema epizoda.</p>
            )}
      </div>

    </div>
  );
}

export default PodcastDetailsPage;
