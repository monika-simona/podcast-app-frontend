import React, { useEffect, useState } from 'react';
import api from '../api';

function UserProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get('/user/me').then(res => setUser(res.data));
  }, []);

  if(!user) return <p>Učitavanje...</p>;

  return (
    <div>
      <h2>Profil korisnika</h2>
      <p>Ime: {user.name}</p>
      <p>Email: {user.email}</p>
      <h3>Vaši podkasti</h3>
      <ul>
        {user.podcasts?.map(p => <li key={p.id}>{p.title}</li>)}
      </ul>
    </div>
  );
}

export default UserProfilePage;
