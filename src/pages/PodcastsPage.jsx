import React from 'react';
import PodcastCard from '../components/PodcastCard';
import { useNavigate } from 'react-router-dom';
import usePodcasts from '../hooks/usePodcasts';

function PodcastsPage() {
  const navigate = useNavigate();

  const podcasts = [
    { 
      id: 1, 
      title: 'Tech Talks', 
      author: 'Marko Marković',
      description: 'Razgovori o tehnologiji', 
      coverUrl: 'https://via.placeholder.com/150',
      episodes: [
        { id: 1, title: 'Uvod u tehnologiju' },
        { id: 2, title: 'Napredni JavaScript' }
      ]
    },
    { 
      id: 2, 
      title: 'Health Matters', 
      author: 'Jelena Jovanović',
      description: 'Zdravlje i fitnes', 
      coverUrl: 'https://via.placeholder.com/150',
      episodes: [
        { id: 1, title: 'Zdrava ishrana' },
        { id: 2, title: 'Vežbanje kod kuće' }
      ]
    },
  ];

  const {
    searchTerm,
    setSearchTerm,
    paginatedPodcasts,
    currentPage,
    setCurrentPage,
    totalPages
  } = usePodcasts(podcasts);

  const handleViewDetails = (id) => {
    navigate(`/podcasts/${id}`);
  };

  return (
    <div className="podcasts-page">
      <h1>Podkasti</h1>
      <input
        type="text"
        placeholder="Pretraži podkaste, autore ili epizode..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="podcast-list">
        {paginatedPodcasts.map(podcast => (
          <PodcastCard
            key={podcast.id}
            podcast={podcast}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      <div className="pagination">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
           Prethodna
        </button>

        <span style={{ margin: '0 10px' }}>
          Strana {currentPage} od {totalPages}
        </span>

        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Sledeća
        </button>
      </div>
    </div>
  );
}

export default PodcastsPage;
