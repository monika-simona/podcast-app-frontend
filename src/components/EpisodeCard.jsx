import React, { useState } from 'react';
import Button from './Button';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import EditEpisodeForm from './EditEpisodeForm';

function EpisodeCard({ episode, canManage, onDelete, setEpisodes }) {
  const { playEpisode, loadingAudio, currentEpisode } = useAudioPlayer();
  const [showEdit, setShowEdit] = useState(false);

  const isPlaying = currentEpisode?.id === episode.id;

  return (
    <div className="episode-card" style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
      <h4>{episode.title}</h4>
      <p>Details: {episode.description}</p>
      <p>Duration: {episode.duration} min</p>
      <p>{episode.release_date}</p>

      <Button onClick={() => playEpisode(episode)}>
        {loadingAudio && !isPlaying 
          ? "Učitavanje..." 
          : isPlaying 
            ? "Pauzirano" 
            : "Play"}
      </Button>
      
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
