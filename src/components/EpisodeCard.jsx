import React, { useState, useEffect } from 'react';
import Button from './Button';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import EditEpisodeForm from './EditEpisodeForm';
import api from '../api';

function EpisodeCard({ episode, canManage, onDelete, setEpisodes, podcast }) {
  const { playEpisode, loadingAudio, currentEpisode } = useAudioPlayer();
  const [showEdit, setShowEdit] = useState(false);

  const isPlaying = currentEpisode?.id === episode.id;

  // --- TAGS state ---
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  // učitavanje tagova za epizodu
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await api.get(`/episodes/${episode.id}/tags`);
        setTags(res.data);
      } catch (err) {
        console.error("Greška pri učitavanju tagova:", err);
      }
    };
    fetchTags();
  }, [episode.id]);

  // dodavanje taga
  const handleAddTag = async () => {
    if (!newTag.trim()) return;
    try {
      const res = await api.post(`/episodes/${episode.id}/tags`, {
        tags: [newTag.trim()],
      });
      setTags(res.data.tags);
      setNewTag("");
    } catch (err) {
      console.error("Greška pri dodavanju taga:", err);
    }
  };

  // brisanje taga
  const handleDeleteTag = async (tagId) => {
    try {
      await api.delete(`/episodes/${episode.id}/tags/${tagId}`);
      setTags(tags.filter((t) => t.id !== tagId));
    } catch (err) {
      console.error("Greška pri brisanju taga:", err);
    }
  };

  return (
    <div 
      className="episode-card" 
      style={{ 
        border: "1px solid #ccc", 
        padding: "15px", 
        marginBottom: "15px", 
        borderRadius: "10px",
        display: "flex",
        alignItems: "flex-start",
        gap: "15px"
      }}
    >


      <div style={{ flex: 1 }}>
        <h4>{episode.title}</h4>
        <p>{episode.description}</p>
        <p><strong>Trajanje:</strong> {episode.duration} min</p>
        <p><strong>Datum:</strong> {episode.release_date}</p>

        <Button onClick={() => playEpisode({...episode, podcast: {cover_image_url: podcast?.cover_image_url,}})}>
          {loadingAudio && !isPlaying 
            ? "Učitavanje..." 
            : isPlaying 
              ? "▶ Trenutno svira" 
              : "► Pusti"}
        </Button>

        {/* TAGOVI */}
        <div style={{ marginTop: "10px" }}>
          <strong>Tagovi:</strong>{" "}
          {tags.length > 0 ? (
            tags.map((tag) => (
              <span
                key={tag.id}
                style={{
                  display: "inline-block",
                  background: "#f0f0f0",
                  borderRadius: "8px",
                  padding: "3px 8px",
                  margin: "3px",
                }}
              >
                #{tag.name}
                {canManage && (
                  <button
                    style={{ 
                      marginLeft: "5px", 
                      color: "red", 
                      border: "none", 
                      background: "transparent", 
                      cursor: "pointer" 
                    }}
                    onClick={() => handleDeleteTag(tag.id)}
                  >
                    ✖
                  </button>
                )}
              </span>
            ))
          ) : (
            <span>Nema tagova</span>
          )}
        </div>

        {/* Dodavanje taga */}
        {canManage && (
          <div style={{ marginTop: "10px" }}>
            <input
              type="text"
              value={newTag}
              placeholder="Dodaj tag..."
              onChange={(e) => setNewTag(e.target.value)}
              style={{ marginRight: "5px" }}
            />
            <Button onClick={handleAddTag}>Dodaj</Button>
          </div>
        )}

        {/* Dugmići za uređivanje epizode */}
        {canManage && (
          <div style={{ marginTop: "10px" }}>
            <Button onClick={() => setShowEdit(true)}>Edit</Button>
            <Button onClick={onDelete}>Delete</Button>
          </div>
        )}

        {/* Forma za edit epizode */}
        {showEdit && (
          <EditEpisodeForm
            episode={episode}
            setEpisodes={setEpisodes}
            onClose={() => setShowEdit(false)}
          />
        )}
      </div>
    </div>
  );
}

export default EpisodeCard;
