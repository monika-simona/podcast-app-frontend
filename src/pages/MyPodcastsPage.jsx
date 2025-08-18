import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import AddPodcastForm from '../components/AddPodcastForm';
import api from '../api';
import PodcastCard from '../components/PodcastCard';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

function MyPodcastsPage() {
  const { user } = useContext(AuthContext);
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const res = await api.get('my-podcasts');
        setPodcasts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, [user]);

  if (loading) return <p>Učitavanje...</p>;

  return (
    <div>
      <h2>Moji podkasti</h2>
      <Button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Zatvori formu' : 'Add New Podcast'}
      </Button>

      {showForm && <AddPodcastForm setPodcasts={setPodcasts} />}

      <ul>
        {podcasts.map(podcast => (
            <PodcastCard
              key={podcast.id}
              podcast={podcast}
              onViewDetails={(id) => navigate(`/podcasts/${id}`)}
            />
          ))}
      </ul>
    </div>
  );
}

export default MyPodcastsPage;
