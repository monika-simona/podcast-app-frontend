import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useAudioPlayer } from "../context/AudioPlayerContext";

function EpisodeCardMini({ episode }) {
  const { user } = useContext(AuthContext);
  const { playEpisode } = useAudioPlayer();

  const handleClick = () => {
    if (!user) {
      alert("Morate se prijaviti da biste slušali epizodu.");
      return;
    }
    playEpisode(episode);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        width: "120px",
        cursor: "pointer",
        textAlign: "center",
        margin: "5px",
      }}
    >
      <img
        src={episode.podcast?.cover_image_url || "/default-cover.png"}
        alt={episode.title}
        style={{
          width: "120px",
          height: "120px",
          objectFit: "cover",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        }}
      />
      <div
        style={{
          marginTop: "6px",
          fontSize: "14px",
          fontWeight: "500",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {episode.title}
      </div>
    </div>
  );
}

export default EpisodeCardMini;
