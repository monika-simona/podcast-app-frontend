import { createContext, useState, useContext } from 'react';

//Kreiranje konteksta
const AudioPlayerContext = createContext();

//Provider komponente
export const AudioPlayerProvider = ({ children }) => {
  const [currentEpisode, setCurrentEpisode] = useState(null);

  const playEpisode = (episode) => {
    setCurrentEpisode({
      ...episode,
      audioUrl: `http://127.0.0.1:8000/api/episodes/${episode.id}/play`
    });
  };

  const stopEpisode = () => {
    setCurrentEpisode(null);
  };

  return (
    <AudioPlayerContext.Provider value={{ currentEpisode, playEpisode, stopEpisode }}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => useContext(AudioPlayerContext);
