import React from 'react';
import Button from './Button';


function PodcastCard({ podcast, onViewDetails }) {
  return (
    <div className="podcast-card">
      <h3>{podcast.title}</h3>
      <p>{podcast.author}</p>
      <p>{podcast.description}</p>
      <Button onClick={() => onViewDetails(podcast.id)}>Pogledaj epizode</Button>
    </div>
  );
}

export default PodcastCard;