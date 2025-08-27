import React, { useState } from "react";
import { useAudioPlayer } from "../context/AudioPlayerContext";

function AudioPlayerPopup() {
  const { currentEpisode, stopEpisode } = useAudioPlayer();
  const [position, setPosition] = useState({ x: 20, y: 20 });

  if (!currentEpisode) return null;

  const startDrag = (e) => {
    const move = (moveEvent) =>
      setPosition({
        x: moveEvent.clientX - 100,
        y: moveEvent.clientY - 20,
      });

    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  const podcastCover = currentEpisode.podcast?.cover_image_url;

  return (
    <div
      className="audio-player-popup"
      style={{
        position: "fixed",
        top: position.y,
        left: position.x,
        background: "#fff",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        zIndex: 1000,
        width: "260px",
      }}
      onMouseDown={startDrag}
    >
      {/* Podcast cover */}
      <img
        src={podcastCover}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          borderRadius: "8px",
          marginBottom: "8px",
        }}
      />


      <strong style={{ display: "block", marginBottom: "5px" }}>
         {currentEpisode.title}
      </strong>

      <audio
        controls
        autoPlay
        src={currentEpisode.audioUrl}
        style={{ width: "100%" }}
      />

      <button
        onClick={stopEpisode}
        style={{
          marginTop: "10px",
          width: "100%",
          padding: "6px",
          background: "#594dffff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
         Zaustavi
      </button>
    </div>
  );
}

export default AudioPlayerPopup;
