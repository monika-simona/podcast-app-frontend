import React from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import EpisodeCard from '../components/EpisodeCard';


function PodcastDetailsPage() {

  const { id } = useParams(); // uzimamo ID podkasta iz URL-a
  const [currentEpisode, setCurrentEpisode] = useState(null); // trenutno izabrana epizoda

  // Primer podataka o epizodama
  const episodes = [
    { id: 1, title: 'Uvod u tehnologiju', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { id: 2, title: 'Napredni JavaScript', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { id: 3, title: 'React u praksi', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  ];

  const handlePlayEpisode = (episode) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Morate biti ulogovani da biste slušali epizodu.");
      return;
    }
    setCurrentEpisode(episode);
  };

  const paths = [
    { label: 'Početna', link: '/' },
    { label: 'Podkasti', link: '/podcasts' },
    { label: `Podkast #${id}` }
  ];

  return (
    <div className="podcast-details-page">
      <Breadcrumbs paths={paths} />
      <h1>Detalji podkasta #{id}</h1>

      <div className="episodes-list">
        <h2>Epizode:</h2>
        {episodes.map(ep => (
          <EpisodeCard key={ep.id} episode={ep} onPlay={handlePlayEpisode} />
        ))}
      </div>

      {currentEpisode && (
        <div className="audio-player">
          <h3>{currentEpisode.title}</h3>
          <audio controls autoPlay src={currentEpisode.audioUrl}></audio>
        </div>
      )}
    </div>
  );
}

export default PodcastDetailsPage;
