import React, { useEffect, useState } from "react";
import api from "../api";
import PodcastCardMini from "../components/PodcastCardMini";
import EpisodeCardMini from "../components/EpisodeCardMini";
import useCarousel from "../hooks/useCarousel";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

function HomePage() {
  const navigate = useNavigate();
  const [popularPodcasts, setPopularPodcasts] = useState([]);
  const [popularEpisodes, setPopularEpisodes] = useState([]);

  // Učitavanje popularnih podkasta i epizoda
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
        console.error(
          "Greška pri učitavanju popularnih podkasta i epizoda",
          err
        );
      }
    };
    fetchData();
  }, []);

  const podcastsCarousel = useCarousel(popularPodcasts, 10);
  const episodesCarousel = useCarousel(popularEpisodes, 10);

  const arrowStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
  };

  const cardBoxStyle = {
    flex: 1,
    borderRadius: "8px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s",
  };

  return (
    <Layout>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* Najpopularniji podkasti */}
        <h2>Najpopularniji podkasti</h2>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            onClick={podcastsCarousel.prev}
            style={{ ...arrowStyle, marginRight: "10px" }}
          >
            <MdNavigateBefore size={24} />
          </button>

          <div
            style={{
              display: "flex",
              gap: "10px",
              overflow: "hidden",
              flex: 1,
            }}
          >
            {podcastsCarousel.visibleItems
              .filter((podcast) => podcast && podcast.id)
              .map((podcast) => (
                <PodcastCardMini
                  key={podcast.id}
                  podcast={podcast}
                  onClick={() => navigate(`/podcasts/${podcast.id}`)}
                />
              ))}
          </div>

          <button
            onClick={podcastsCarousel.next}
            style={{ ...arrowStyle, marginLeft: "10px" }}
          >
            <MdNavigateNext size={24} />
          </button>
        </div>

        {/* Najpopularnije epizode */}
        <h2 style={{ marginTop: "40px" }}>Najpopularnije epizode</h2>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            onClick={episodesCarousel.prev}
            style={{ ...arrowStyle, marginRight: "10px" }}
          >
            <MdNavigateBefore size={24} />
          </button>

          <div
            style={{
              display: "flex",
              gap: "10px",
              overflow: "hidden",
              flex: 1,
            }}
          >
            {episodesCarousel.visibleItems
              .filter((ep) => ep && ep.id)
              .map((ep) => (
                <EpisodeCardMini
                  key={ep.id}
                  episode={ep}
                  onClick={() => navigate(`/episodes/${ep.id}`)}
                />
              ))}
          </div>

          <button
            onClick={episodesCarousel.next}
            style={{ ...arrowStyle, marginLeft: "10px" }}
          >
            <MdNavigateNext size={24} />
          </button>
        </div>

        {/* News i iTunes search */}
        <div
          style={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <div
            style={cardBoxStyle}
            onClick={() => navigate("/news")}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#f1f1f1")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#f9f9f9")
            }
          >
            <h3>📰 News</h3>
            <p style={{ marginTop: "10px", color: "#555" }}>
              Pogledaj najnovije vesti o podcastima
            </p>
          </div>

          <div
            style={cardBoxStyle}
            onClick={() => navigate("/itunes-search")}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#f1f1f1")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#f9f9f9")
            }
          >
            <h3>🎵 iTunes Search</h3>
            <p style={{ marginTop: "10px", color: "#555" }}>
              Pretraži podkaste sa iTunes-a
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
