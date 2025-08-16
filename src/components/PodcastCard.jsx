import React from 'react';
import Button from './Button';


function PodcastCard({ podcast, onViewDetails }) {
  return (
    <div className="podcast-card">
      <img src={podcast.coverUrl} alt={podcast.title} className="podcast-cover" />
      <h3>{podcast.title}</h3>
      <p>{podcast.description}</p>
      <Button onClick={() => onViewDetails(podcast.id)}>Pogledaj epizode</Button>
    </div>
  );
}

export default PodcastCard;