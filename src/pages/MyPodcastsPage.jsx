import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import AddPodcastForm from '../components/AddPodcastForm';
import api from '../api';
import PodcastCard from '../components/PodcastCard';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import EditPodcastForm from '../components/EditPodcastForm';

function MyPodcastsPage() {
  const { user } = useContext(AuthContext);
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPodcast, setEditingPodcast] = useState(null);
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

  const handleDelete = async (id) => {
    if (!window.confirm("Da li ste sigurni da želite da obrišete ovaj podkast?")) return;

    try {
        await api.delete(`/podcasts/${id}`);
        // Uklonimo obrisani podkast iz liste
        setPodcasts(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            console.error(err);
            alert("Došlo je do greške prilikom brisanja podkasta.");
        }
    };

    const handleEdit = (podcast) => {
    setEditingPodcast(podcast);
    };

return (
    <div>
      <h2>Moji podkasti</h2>
      <Button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Zatvori formu' : 'Add New Podcast'}
      </Button>

      {showForm && <AddPodcastForm setPodcasts={setPodcasts} />}

      {editingPodcast && (
        <EditPodcastForm 
            podcast={editingPodcast} 
            setPodcasts={setPodcasts} 
            onClose={() => setEditingPodcast(null)}
        />
        )}


      <ul>
        {podcasts.map(podcast => (
            <PodcastCard
              key={podcast.id}
              podcast={podcast}
              userRole={user.role}
              onViewDetails={(id) => navigate(`/podcasts/${id}`)}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            
          ))}
      </ul>
    </div>
  );
}

export default MyPodcastsPage;
