import { useState } from "react";
import api from "../api";
import Layout from "../components/Layout";
import { useAudioPlayer } from "../context/AudioPlayerContext";
import { CiPlay1 } from "react-icons/ci";
import Breadcrumbs from "../components/Breadcrumbs";

function ITunesSearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { playEpisode, loadingAudio, currentEpisode } = useAudioPlayer();

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await api.get("/itunes-search", { params: { term: query } });
      setResults(res.data);
    } catch (err) {
      console.error("Greška u pretrazi iTunes:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePlay = (podcast) => {
    playEpisode({
      id: podcast.collectionId,
      title: podcast.collectionName,
      description: `Preview iz iTunes-a od ${podcast.artistName}`,
      audio_url: podcast.feedUrl,
      podcast: { cover_image_url: podcast.artworkUrl100 },
    });
  };

  const paths = [
    { label: "Početna", link: "/" },
    { label: "iTunes", link: "/itunes-search" },
  ];

  return (
    <Layout>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <Breadcrumbs paths={paths} />
        <h1 style={{ marginBottom: "20px" }}>iTunes Podcast Pretraga</h1>

        {/* Polje za pretragu */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Unesite pojam..."
            style={{
              flex: 1,
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "1rem",
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              padding: "10px 20px",
              background: "#ae00ffff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Pretraži
          </button>
        </div>

        {loading && <p>Učitavanje...</p>}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          {results.map((podcast) => (
            <div
              key={podcast.collectionId}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "10px",
                background: "#f9f9f9",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                transition: "transform 0.2s",
              }}
            >
              <img
                src={podcast.artworkUrl100}
                alt={podcast.collectionName}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "10px",
                  marginBottom: "10px",
                }}
              />
              <h3
                style={{
                  fontSize: "1rem",
                  textAlign: "center",
                  marginBottom: "5px",
                }}
              >
                {podcast.collectionName}
              </h3>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#555",
                  marginBottom: "10px",
                  textAlign: "center",
                }}
              >
                {podcast.artistName}
              </p>

              {podcast.feedUrl && (
                <button
                  onClick={() => handlePlay(podcast)}
                  disabled={
                    loadingAudio && currentEpisode?.id === podcast.collectionId
                  }
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: "#b643f8ff",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "10px",
                  }}
                >
                  {loadingAudio &&
                  currentEpisode?.id === podcast.collectionId ? (
                    <div className="spinner-border spinner-border-sm text-light" />
                  ) : (
                    <CiPlay1 size={22} />
                  )}
                </button>
              )}

              <a
                href={podcast.collectionViewUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: "8px 12px",
                  background: "#5f28a7ff",
                  color: "white",
                  borderRadius: "6px",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                Pogledaj na iTunes
              </a>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default ITunesSearchPage;
