import React, { useState } from "react";
import Button from "./Button";
import InputField from "./InputField";
import api from "../api";

function AddEpisodeForm({ podcastId, setEpisodes, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [audio, setAudio] = useState(null);
  const [releaseDate, setReleaseDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!audio) {
      setError("Audio fajl je obavezan.");
      return;
    }

    const allowedTypes = ["audio/mpeg", "audio/wav"];
    if (!allowedTypes.includes(audio.type)) {
      setError("Dozvoljeni formati fajla su mp3 i wav.");
      return;
    }

    const maxSize = 40 * 1024 * 1024; // 40MB
    if (audio.size > maxSize) {
      setError("Audio fajl ne može biti veći od 40MB.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("podcast_id", podcastId);
    formData.append("release_date", releaseDate);
    formData.append("audio", audio);

    try {
      const res = await api.post("/episodes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setEpisodes((prev) => [...prev, res.data.data]);
      onClose();
    } catch (err) {
      console.error(err);
      setError("Došlo je do greške prilikom kreiranja epizode.");
    }
  };

  return (
    <div
      className="episode-card-form"
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        marginBottom: "20px",
        maxWidth: "500px",
      }}
    >
      <h3 style={{ marginBottom: "15px" }}>Dodaj novu epizodu</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <InputField
          label="Naziv epizode"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <InputField
          label="Opis epizode"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <InputField
          label="Datum izlaska"
          type="date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
        />
        <InputField
          label="Audio fajl"
          type="file"
          onChange={(e) => setAudio(e.target.files[0])}
        />

        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "flex-end",
            marginTop: "15px",
            flexWrap: "wrap",
          }}
        >
          <Button type="submit">Dodaj epizodu</Button>
          <Button type="button" onClick={onClose} className="cancel-btn">
            Otkaži
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddEpisodeForm;
