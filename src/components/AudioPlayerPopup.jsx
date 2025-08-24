import React, { useState } from "react";
import { useAudioPlayer } from "../context/AudioPlayerContext";

function AudioPlayerPopup() {
  const { currentEpisode, stopEpisode } = useAudioPlayer();
  const [position, setPosition] = useState({ x: 20, y: 20 });

  if (!currentEpisode) return null;

  const startDrag = (e) => {
    const move = (moveEvent) => setPosition({
      x: moveEvent.clientX - 100,
      y: moveEvent.clientY - 20
    });

    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

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
        zIndex: 1000,
        width: "250px"
      }}
      onMouseDown={startDrag}
    >
      <h4>{currentEpisode.title}</h4>
      <audio controls autoPlay src={currentEpisode.audioUrl} style={{ width: "100%" }} />
      <button onClick={stopEpisode} style={{ marginTop: "5px" }}>Zaustavi</button>
    </div>
  );
}

export default AudioPlayerPopup;
