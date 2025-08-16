import React from 'react';
import PodcastCard from '../components/PodcastCard';
import { useNavigate } from 'react-router-dom';

function PodcastsPage() {

  const navigate = useNavigate();

  const podcasts = [
    { id: 1, title: 'Tech Talks', description: 'Razgovori o tehnologiji', coverUrl: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Health Matters', description: 'Zdravlje i fitnes', coverUrl: 'https://via.placeholder.com/150' },
    { id: 3, title: 'History Hour', description: 'Zanimljivi istorijski događaji', coverUrl: 'https://via.placeholder.com/150' },
  ];

  const handleViewDetails = (id) => {
    navigate(`/podcasts/${id}`);
  };


  return (
    <div className="podcasts-page">
      <h1>Podkasti</h1>
      <div className="podcast-list">
        {podcasts.map(podcast => (
          <PodcastCard
            key={podcast.id}
            podcast={podcast}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>
    </div>
  );
}

export default PodcastsPage;
