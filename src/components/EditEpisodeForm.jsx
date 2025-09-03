import React, { useState } from "react";
import Button from "./Button";
import InputField from "./InputField";
import api from "../api";

function EditEpisodeForm({ episode, setEpisodes, onClose }) {
  const [title, setTitle] = useState(episode.title);
  const [description, setDescription] = useState(episode.description);
  const [releaseDate, setReleaseDate] = useState(episode.release_date);
  const [audio, setAudio] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("title", title);
    formData.append("description", description);
    formData.append("release_date", releaseDate);
    if (audio) formData.append("audio", audio);

    try {
      const res = await api.post(`/episodes/${episode.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setEpisodes((prev) =>
        prev.map((ep) => (ep.id === episode.id ? res.data : ep))
      );
      onClose();
    } catch (err) {
      console.error(err);
      setError("Došlo je do greške prilikom izmene epizode.");
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
      <h3 style={{ marginBottom: "15px" }}>Izmeni epizodu</h3>
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
          <Button type="submit">Sačuvaj izmene</Button>
          <Button type="button" onClick={onClose} className="cancel-btn">
            Otkaži
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditEpisodeForm;
