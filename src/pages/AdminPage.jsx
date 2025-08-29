import React, { useState } from 'react';
import usePagination from '../hooks/usePagination';
import useFilters from '../hooks/useFilters';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function AdminPage() {
  const [activeTab, setActiveTab] = useState('users');
  const navigate = useNavigate();

  // USERS HOOKOVI
  const { filters: userFilters, setFilter: setUserFilter, clearFilters: clearUserFilters } = useFilters({ query: '' });
  const {
    data: users,
    loading: loadingUsers,
    currentPage: userPage,
    totalPages: userTotalPages,
    goToPage: goToUserPage,
    fetchPage: fetchUsers,
  } = usePagination('users', 1, 5);

  // PODCASTS HOOKOVI
  const { filters: podcastFilters, setFilter: setPodcastFilter, clearFilters: clearPodcastFilters } = useFilters({ query: '' });
  const {
    data: podcasts,
    loading: loadingPodcasts,
    currentPage: podcastPage,
    totalPages: podcastTotalPages,
    goToPage: goToPodcastPage,
    fetchPage: fetchPodcasts,
  } = usePagination('podcasts', 1, 5);

  // DELETE USER
  const handleDeleteUser = async (id) => {
    if (!window.confirm('Da li sigurno želiš da obrišeš ovog korisnika?')) return;
    try {
      const token = sessionStorage.getItem('access_token');
      await api.delete(`users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchUsers(userPage, userFilters.query ? { user_name: userFilters.query } : {});
    } catch (err) {
      alert('Greška pri brisanju korisnika.');
    }
  };


  const handleDeletePodcast = async (id) => {
    if (!window.confirm('Da li sigurno želiš da obrišeš ovaj podkast?')) return;
    try {
      const token = sessionStorage.getItem('access_token');
      await api.delete(`podcasts/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchPodcasts(podcastPage, podcastFilters.query ? { title: podcastFilters.query } : {});
    } catch (err) {
      alert('Greška pri brisanju podkasta.');
    }
  };

  const handleEditPodcast = async (id, newTitle, newDescription) => {
    try {
      const token = sessionStorage.getItem('access_token');
      await api.put(
        `podcasts/${id}`,
        { title: newTitle, description: newDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPodcasts(podcastPage, podcastFilters.query ? { title: podcastFilters.query } : {});
    } catch (err) {
      alert('Greška pri izmeni podkasta.');
    }
  };

  return (
    <div className="admin-page">
      <h1>Administracija</h1>

      {/* TAB NAVIGACIJA */}
      <div style={{ marginBottom: '15px' }}>
        <button onClick={() => setActiveTab('users')} disabled={activeTab === 'users'}>
          Korisnici
        </button>
        <button onClick={() => setActiveTab('podcasts')} disabled={activeTab === 'podcasts'}>
          Podkasti
        </button>
      </div>

      {/* USERS TAB */}
      {activeTab === 'users' && (
        <div>
          <h2>Administracija korisnika</h2>
          <input
            type="text"
            placeholder="Pretraži po imenu"
            value={userFilters.query}
            onChange={(e) => setUserFilter('query', e.target.value)}
          />
          <button onClick={() => fetchUsers(1, { user_name: userFilters.query })}>Pretraži</button>
          <button onClick={() => { clearUserFilters(); fetchUsers(1, {}); }}>Resetuj</button>

          {loadingUsers ? (
            <p>Učitavanje...</p>
          ) : (
            <table border="1" cellPadding="10" style={{ width: '100%', marginTop: '10px' }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Ime</th>
                  <th>Email</th>
                  <th>Uloga</th>
                  <th>Akcije</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <button onClick={() => handleDeleteUser(user.id)}>Obriši</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="5">Nema korisnika</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* PODCASTS TAB */}
      {activeTab === 'podcasts' && (
        <div>
          <h2>Administracija podkasta</h2>
          <input
            type="text"
            placeholder="Pretraži po nazivu"
            value={podcastFilters.query}
            onChange={(e) => setPodcastFilter('query', e.target.value)}
          />
          <button onClick={() => fetchPodcasts(1, { title: podcastFilters.query })}>Pretraži</button>
          <button onClick={() => { clearPodcastFilters(); fetchPodcasts(1, {}); }}>Resetuj</button>

          {loadingPodcasts ? (
            <p>Učitavanje...</p>
          ) : (
            <table border="1" cellPadding="10" style={{ width: '100%', marginTop: '10px' }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Naziv</th>
                  <th>Opis</th>
                  <th>Kreator</th>
                  <th>Akcije</th>
                </tr>
              </thead>
              <tbody>
                {podcasts.length > 0 ? (
                  podcasts.map((podcast) => (
                    <tr key={podcast.id}>
                      <td>{podcast.id}</td>
                      <td>
                        <input
                          type="text"
                          defaultValue={podcast.title}
                          onBlur={(e) => handleEditPodcast(podcast.id, e.target.value, podcast.description)}
                        />
                      </td>
                      <td>
                        <textarea
                          defaultValue={podcast.description}
                          onBlur={(e) => handleEditPodcast(podcast.id, podcast.title, e.target.value)}
                        />
                      </td>
                      <td>{podcast.author || 'N/A'}</td>
                      <td>
                        <button onClick={() => handleDeletePodcast(podcast.id)}>Obriši</button>
                        <button onClick={() => navigate(`/podcasts/${podcast.id}`)} style={{ marginRight: '5px' }}>Detalji</button>                      
                    </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="5">Nema podkasta</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminPage;
