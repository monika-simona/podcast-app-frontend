import React from 'react';
import Button from './Button';
import { useAudioPlayer } from '../context/AudioPlayerContext';

function EpisodeCard({ episode, onPlay }) {
  const { playEpisode } = useAudioPlayer();

  return (
    <div className="episode-card">
      <h4>{episode.title}</h4>
      <p>{episode.description}</p>
      <p>{episode.duration}</p>
      <p>{episode.date}</p>

      {episode.audio_path && (
        <audio controls style={{ width: '100%' }}>
          <source src={episode.audio_path} type="audio/mpeg" />
          Vaš browser ne podržava audio plejere.
        </audio>
      )}

      <Button onClick={() => onPlay(episode)}>Play</Button>
    </div>
  );
}

export default EpisodeCard;
