import React from 'react';
import Button from './Button';
import { useAudioPlayer } from '../context/AudioPlayerContext';

function EpisodeCard({ episode }) {
  const { playEpisode } = useAudioPlayer();

  return (
    <div className="episode-card">
      <h4>{episode.title}</h4>
      <p>Trajanje: {episode.duration}</p>
      <p>Datum: {episode.date}</p>
      <p>{episode.description}</p>

      <Button onClick={() => playEpisode(episode)}>Play</Button>
    </div>
  );
}

export default EpisodeCard;
