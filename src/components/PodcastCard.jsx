import React from 'react';
import Button from './Button';


function PodcastCard({ podcast,  userRole, onViewDetails, onEdit, onDelete }) {
  return (
    <div className="podcast-card">
      <h3>{podcast.title}</h3>
      <p>{podcast.author}</p>
      <p>{podcast.description}</p>
      <div className="podcast-actions">
        <Button onClick={() => onViewDetails(podcast.id)}>Detalji</Button>

        {(userRole === 'author' || userRole === 'admin') && (
          <>
            <Button onClick={() => onEdit(podcast)}>Edit</Button>
            <Button onClick={() => onDelete(podcast.id)}>Delete</Button>
          </>
        )}
      </div>
    </div>
  );
}

export default PodcastCard;