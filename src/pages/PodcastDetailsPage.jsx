import React from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';

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
          <div key={ep.id} className="episode-item">
            <p>{ep.title}</p>
            <Button onClick={() => handlePlayEpisode(ep)}>Slušaj</Button>
          </div>
        ))}
      </div>

      {currentEpisode && (
        <div className="audio-player">
          <h3>Sada slušaš: {currentEpisode.title}</h3>
          <audio controls autoPlay src={currentEpisode.audioUrl}></audio>
        </div>
      )}
    </div>
  );
}

export default PodcastDetailsPage;
