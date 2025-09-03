import React, { useState, useEffect } from "react";
import { useAudioPlayer } from "../context/AudioPlayerContext";
import EditEpisodeForm from "./EditEpisodeForm";
import api from "../api";
import { CiPlay1 } from "react-icons/ci";
import { FaPlay } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

function EpisodeCard({ episode, canManage, onDelete, setEpisodes, podcast }) {
  const { playEpisode, loadingAudio, currentEpisode } = useAudioPlayer();
  const [showEdit, setShowEdit] = useState(false);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [expanded, setExpanded] = useState(false);

  const isPlaying = currentEpisode?.id === episode.id;

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

  const handleDeleteTag = async (tagId) => {
    try {
      await api.delete(`/episodes/${episode.id}/tags/${tagId}`);
      setTags(tags.filter((t) => t.id !== tagId));
    } catch (err) {
      console.error("Greška pri brisanju taga:", err);
    }
  };

  const maxDescriptionLength = 120;
  const isLongDescription = episode.description?.length > maxDescriptionLength;
  const displayDescription =
    !expanded && isLongDescription
      ? episode.description.slice(0, maxDescriptionLength) + "..."
      : episode.description;

  return (
    <div
      className="card mb-3 shadow-sm"
      style={{ width: "100%", maxWidth: "1000px" }}
    >
      <div className="card-body d-flex">
        {/* Leva kolona: opis i info */}
        <div style={{ flex: 1, paddingRight: "10px" }}>
          <h5 className="card-title">{episode.title}</h5>
          <p className="card-text mb-1">
            {displayDescription}{" "}
            {isLongDescription && (
              <span
                style={{ color: '#4336d6', cursor: "pointer" }}
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "Collapse" : "Read more"}
              </span>
            )}
          </p>
          <p className="mb-1">
            <strong>Trajanje:</strong> {episode.duration} min
          </p>
          <p className="mb-2">
            <strong>Datum:</strong> {episode.release_date}
          </p>

          {/* TAGOVI */}
          <div className="mb-2">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="badge bg-light text-dark me-2"
                style={{ fontSize: "0.8rem" }}
              >
                #{tag.name}
                {canManage && (
                  <button
                    className="btn btn-sm text-danger p-0 ms-1"
                    onClick={() => handleDeleteTag(tag.id)}
                  >
                    ✖
                  </button>
                )}
              </span>
            ))}
          </div>

          {/* Dodavanje taga */}
          {canManage && (
            <div className="d-flex align-items-center mb-2">
              <input
                type="text"
                value={newTag}
                placeholder="Dodaj tag..."
                onChange={(e) => setNewTag(e.target.value)}
                className="form-control me-2"
                style={{ maxWidth: "150px", fontSize: "0.85rem" }}
              />
              <button
                className="btn d-flex align-items-center justify-content-center"
                onClick={handleAddTag}
                style={{ width: "36px", height: "36px", padding: 0 }}
              >
                <IoSendSharp />
              </button>
            </div>
          )}
        </div>

        {/* Desna kolona: dugmad */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <button
            className="btn btn-primary d-flex align-items-center justify-content-center"
            style={{ width: "48px", height: "48px", borderRadius: "50%" }}
            onClick={() =>
              playEpisode({
                ...episode,
                podcast: { cover_image_url: podcast?.cover_image_url },
              })
            }
            disabled={loadingAudio && !isPlaying}
          >
            {loadingAudio && !isPlaying ? (
              <div className="spinner-border spinner-border-sm text-light" />
            ) : isPlaying ? (
              <FaPlay size={20} />
            ) : (
              <CiPlay1 size={22} />
            )}
          </button>

          {canManage && (
            <div className="d-flex gap-2">
              <button
                className="btn p-1"
                onClick={() => setShowEdit(true)}
              >
                <CiEdit size={18} />
              </button>
              <button className="btn p-1" onClick={onDelete}>
                <MdOutlineDelete size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      {showEdit && (
        <EditEpisodeForm
          episode={episode}
          setEpisodes={setEpisodes}
          onClose={() => setShowEdit(false)}
        />
      )}
    </div>
  );
}

export default EpisodeCard;
