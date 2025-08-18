import React, { useEffect, useState } from 'react';
import api from '../api';

function AdminUsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/admin/users').then(res => setUsers(res.data));
  }, []);

  return (
    <div>
      <h2>Korisnici</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Ime</th><th>Email</th><th>Uloga</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsersPage;
