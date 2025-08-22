import React from 'react';
import usePagination from '../hooks/usePagination';
import useFilters from '../hooks/useFilters';
import api from '../api';

function AdminUsersPage() {
  const { filters, setFilter, clearFilters } = useFilters({ query: '' });
  const {
    data: users,
    loading,
    currentPage,
    totalPages,
    goToPage,
    fetchPage,
  } = usePagination('users', 1, 5);

  const handleSearch = () => {
    fetchPage(1, { user_name: filters.query });
  };

  const handleClear = () => {
    clearFilters();
    fetchPage(1, {});
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Da li sigurno želiš da obrišeš ovog korisnika?')) return;

    try {
      const token = sessionStorage.getItem('access_token');
      await api.delete(`users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchPage(currentPage, filters.query ? { user_name: filters.query } : {});
    } catch (err) {
      console.error('Greška pri brisanju korisnika:', err);
      alert('Došlo je do greške prilikom brisanja.');
    }
  };

  return (
    <div className="admin-users-page">
      <h1>Administracija korisnika</h1>

      {/* FILTER */}
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Pretraži po imenu"
          value={filters.query}
          onChange={(e) => setFilter('query', e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <button onClick={handleSearch} style={{ marginRight: '5px' }}>
          Pretraži
        </button>
        <button onClick={handleClear}>
          Resetuj
        </button>
      </div>

      {/* LISTA KORISNIKA */}
      {loading ? (
        <p>Učitavanje...</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
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
                    <button
                      onClick={() => handleDelete(user.id)}
                    >
                      Obriši
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Nema korisnika</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* PAGINACIJA */}
      <div className="pagination" style={{ marginTop: '15px' }}>
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          Prethodna
        </button>
        <span style={{ margin: '0 10px' }}>
          Strana {currentPage} od {totalPages}
        </span>
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Sledeća
        </button>
      </div>
    </div>
  );
}

export default AdminUsersPage;
