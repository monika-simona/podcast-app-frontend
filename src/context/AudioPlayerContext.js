import { createContext, useContext, useState } from "react";
import api from "../api";

// Kreiramo context
const AudioPlayerContext = createContext();

// Provider
export const AudioPlayerProvider = ({ children }) => {
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [loadingAudio, setLoadingAudio] = useState(false);


  const playEpisode = async (episode) => {
    const token = sessionStorage.getItem("access_token");
    if (!token) {
      alert("Morate biti ulogovani da biste slušali epizodu.");
      return;
    }

    setLoadingAudio(true);

    try {
      // pozivamo API da pustimo epizodu
      const res = await api.get(`/episodes/${episode.id}/play`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob", // OBAVEZNO za audio fajlove
      });

      // Napravimo URL iz blob fajla
      const audioUrl = URL.createObjectURL(res.data);

      // Sačuvamo epizodu i njen audio url
      setCurrentEpisode({ ...episode, audioUrl });
    } catch (err) {
      console.error("Neuspešno učitavanje audio fajla", err);
      alert("Neuspešno učitavanje audio fajla.");
    } finally {
      setLoadingAudio(false);
    }
  };

  const stopEpisode = () => {
    setCurrentEpisode(null);
  };

  return (
    <AudioPlayerContext.Provider
      value={{ currentEpisode, playEpisode, stopEpisode, loadingAudio }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

// Hook za lakše korišćenje context-a
export const useAudioPlayer = () => useContext(AudioPlayerContext);
