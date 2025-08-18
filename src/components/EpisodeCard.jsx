import React, { useState } from 'react';
import Button from './Button';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import EditEpisodeForm from './EditEpisodeForm';

function EpisodeCard({ episode, canManage, onDelete, setEpisodes }) {
  const { playEpisode } = useAudioPlayer();
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className="episode-card">
      <h4>{episode.title}</h4>
      <p>Details: {episode.description}</p>
      <p>Duration: {episode.duration} min</p>
      <p>{episode.release_date}</p>

      <Button onClick={() => playEpisode(episode)}>Play</Button>
      
      {canManage && (
        <div style={{ marginTop: "10px" }}>
          <Button onClick={() => setShowEdit(true)}>Edit</Button>
          <Button onClick={onDelete}>Delete</Button>
        </div>
      )}

      {showEdit && (
        <EditEpisodeForm
          episode={episode}
          setEpisodes={setEpisodes}
          onClose={() => setShowEdit(false)}
        />
      )}
    </div>
  );
}

export default EpisodeCard;
