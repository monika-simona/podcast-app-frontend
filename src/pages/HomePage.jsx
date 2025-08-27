import React, { useEffect, useState } from "react";
import api from "../api";
import PodcastCardMini from "../components/PodcastCardMini";
import EpisodeCardMini from "../components/EpisodeCardMini";
import useCarousel from "../hooks/useCarousel";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

function HomePage() {
  const navigate = useNavigate();
  const [popularPodcasts, setPopularPodcasts] = useState([]);
  const [popularEpisodes, setPopularEpisodes] = useState([]);

  // Ucitavanje popularnih podkasta i epizoda
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [podcastRes, episodeRes] = await Promise.all([
          api.get("/top-podcasts"),
          api.get("/top-episodes"),
        ]);

        setPopularPodcasts(podcastRes.data.data || podcastRes.data || []);
        setPopularEpisodes(episodeRes.data.data || episodeRes.data || []);
      } catch (err) {
        console.error("Greška pri učitavanju popularnih podkasta i epizoda", err);
      }
    };
    fetchData();
  }, []);

  // Koristimo responsive carousel sa maksimalno 10 kartica
  const podcastsCarousel = useCarousel(popularPodcasts, 10);
  const episodesCarousel = useCarousel(popularEpisodes, 10);

  return (
    <div style={{ padding: "20px" }}>
      {/* Najpopularniji podkasti */}
      <h2>Najpopularniji podkasti</h2>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button onClick={podcastsCarousel.prev}>◀</Button>
        <div style={{ display: "flex", gap: "10px", overflow: "hidden", flex: 1 }}>
          {podcastsCarousel.visibleItems
            .filter(podcast => podcast && podcast.id)
            .map((podcast) => (
              <PodcastCardMini
                key={podcast.id}
                podcast={podcast}
                onClick={() => navigate(`/podcasts/${podcast.id}`)}
              />
            ))}
        </div>
        <Button onClick={podcastsCarousel.next}>▶</Button>
      </div>

      {/* Najpopularnije epizode */}
      <h2 style={{ marginTop: "40px" }}>Najpopularnije epizode</h2>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button onClick={episodesCarousel.prev}>◀</Button>
        <div style={{ display: "flex", gap: "10px", overflow: "hidden", flex: 1 }}>
          {episodesCarousel.visibleItems
            .filter(ep => ep && ep.id)
            .map((ep) => (
              <EpisodeCardMini
                key={ep.id}
                episode={ep}
                onClick={() => navigate(`/episodes/${ep.id}`)}
              />
            ))}
        </div>
        <Button onClick={episodesCarousel.next}>▶</Button>
      </div>

      {/* News i iTunes search deo */}
      <div
        style={{
          marginTop: "50px",
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        <div style={{ flex: 1, border: "1px solid #ddd", borderRadius: "8px", padding: "15px" }}>
          <h3>News</h3>
          <a href="/news">Pogledaj novosti</a>
        </div>

        <div style={{ flex: 1, border: "1px solid #ddd", borderRadius: "8px", padding: "15px" }}>
          <h3>🎵 iTunes Search</h3>
          <a href="/itunes-search">Pretraži iTunes</a>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
