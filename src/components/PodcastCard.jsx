import React from 'react';
import Button from './Button';

function PodcastCard({ podcast, userRole, onViewDetails, onEdit, onDelete }) {
  // Placeholder slika
  const placeholder = podcast.cover_image;

  return (
    <div className="podcast-card">
      <div
        style={{
          width: "200px",
          height: "200px",
          overflow: "hidden",
          borderRadius: "8px",
          marginBottom: "10px"
        }}
      >
        <img
          src={podcast.cover_image_url || placeholder}
          alt={podcast.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
        />
      </div>

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
