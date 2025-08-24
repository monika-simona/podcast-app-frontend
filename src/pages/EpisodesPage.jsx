import React, { useEffect, useState } from "react";
import api from "../api";
import EpisodeCard from "../components/EpisodeCard";
import TagList from "../components/TagList";

function EpisodesPage() {
  const [episodes, setEpisodes] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        let url = "/episodes";
        if (selectedTag) {
          url = `/tags/${selectedTag.id}/episodes`; // nested ruta
        }
        const res = await api.get(url);
        setEpisodes(res.data);
      } catch (err) {
        console.error("Greška pri učitavanju epizoda:", err);
      }
    };
    fetchEpisodes();
  }, [selectedTag]);

  return (
    <div>
      <h2>Epizode</h2>

      {/* lista svih tagova */}
      <TagList onTagClick={(tag) => setSelectedTag(tag)} />

      {selectedTag && (
        <p>
          Filtrirano po tagu: <strong>#{selectedTag.name}</strong>{" "}
          <button onClick={() => setSelectedTag(null)}>✖ Ukloni filter</button>
        </p>
      )}

      <div>
        {episodes.length > 0 ? (
          episodes.map((ep) => (
            <EpisodeCard
              key={ep.id}
              episode={ep}
            />
          ))
        ) : (
          <p>Nema epizoda</p>
        )}
      </div>
    </div>
  );
}

export default EpisodesPage;
