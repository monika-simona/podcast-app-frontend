import { createContext, useState, useContext } from 'react';

//Kreiranje konteksta
const AudioPlayerContext = createContext();

//Provider komponente
export const AudioPlayerProvider = ({ children }) => {
  const [currentEpisode, setCurrentEpisode] = useState(null);

  const playEpisode = (episode) => {
    setCurrentEpisode(episode);
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

// Hook za lakše korišćenje
export const useAudioPlayer = () => useContext(AudioPlayerContext);
