import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Breadcrumbs from "../components/Breadcrumbs";
import EpisodeCard from "../components/EpisodeCard";
import AddEpisodeForm from "../components/AddEpisodeForm";
import EditEpisodeForm from "../components/EditEpisodeForm";
import api from "../api";
import { useAudioPlayer } from "../context/AudioPlayerContext";
import { AuthContext } from "../context/AuthContext";
import Layout from "../components/Layout";

function PodcastDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { playEpisode } = useAudioPlayer();

  const [podcast, setPodcast] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const fetchPodcastDetails = async () => {
    setLoading(true);
    setError(null);

    try {
      const [podcastRes, episodesRes] = await Promise.all([
        api.get(`/podcasts/${id}`),
        api.get(`/podcasts/${id}/episodes`),
      ]);

      const episodesData = episodesRes.data.data || episodesRes.data;
      setPodcast(podcastRes.data);
      setEpisodes(episodesData);
    } catch (err) {
      console.error("Greška pri učitavanju podataka:", err);
      setError("Neuspešno učitavanje podataka. Pokušajte ponovo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPodcastDetails();
  }, [id]);

  const canManage =
    user && podcast && (user.role === "admin" || user.id === podcast.user_id);

  const handleDeleteEpisode = async (episodeId) => {
    if (!window.confirm("Da li ste sigurni da želite da obrišete epizodu?"))
      return;

    try {
      await api.delete(`/episodes/${episodeId}`);
      const updatedEpisodes = episodes.filter((ep) => ep.id !== episodeId);
      setEpisodes(updatedEpisodes);
    } catch (err) {
      console.error(err);
      alert("Greška prilikom brisanja epizode.");
    }
  };

  const handleEditEpisode = (episode) => {
    setSelectedEpisode(episode);
    setShowEditForm(true);
  };

  const paths = [
    { label: "Početna", link: "/" },
    { label: "Podkasti", link: "/podcasts" },
    { label: podcast?.title || `Podkast #${id}` },
  ];

  return (
    <Layout>
      <div className="podcast-details-page">
        <Breadcrumbs paths={paths} />

        {loading && <p>Učitavanje podataka...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && podcast && (
          <>
            <h1>{podcast.title}</h1>
            <p>
              <strong>Autor:</strong> {podcast.author || "Nepoznat"}
            </p>
            {podcast.cover_image_url && (
              <div>
                <img
                  src={podcast.cover_image_url}
                  alt={podcast.title}
                  style={{ maxWidth: "200px", borderRadius: "10px" }}
                />
              </div>
            )}
            <p>{podcast.description}</p>

            {canManage && (
              <div style={{ margin: "20px 0" }}>
                <Button onClick={() => setShowForm(!showForm)}>
                  {showForm ? "Zatvori formu" : "Dodaj epizodu"}
                </Button>
                {showForm && (
                  <AddEpisodeForm
                    podcastId={id}
                    setEpisodes={setEpisodes}
                    onClose={() => setShowForm(false)}
                  />
                )}
              </div>
            )}

            <div className="episodes-list">
              <h2>Epizode:</h2>
              {episodes.length > 0 ? (
                episodes.map((ep) => (
                  <EpisodeCard
                    key={ep.id}
                    episode={ep}
                    canManage={canManage}
                    setEpisodes={setEpisodes}
                    onDelete={() => handleDeleteEpisode(ep.id)}
                    onEdit={() => handleEditEpisode(ep)}
                    podcast={podcast}
                  />
                ))
              ) : (
                <p>Ovaj podkast nema epizoda.</p>
              )}
            </div>

            {showEditForm && selectedEpisode && (
              <EditEpisodeForm
                episode={selectedEpisode}
                setEpisodes={setEpisodes}
                onClose={() => setShowEditForm(false)}
              />
            )}
          </>
        )}
      </div>
    </Layout>
  );
}

export default PodcastDetailsPage;
