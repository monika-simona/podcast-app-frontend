import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api';
import Button from './Button';
import InputField from './InputField';

function AddPodcastForm({ setPodcasts }) {
  const { user } = useContext(AuthContext); // trenutni autor
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/podcasts', {
        title,
        description,
        user_id: user.id // autor se automatski povezuje
      });

      setPodcasts(prev => [...prev, res.data]);
      setTitle('');
      setDescription('');
      setError('');
    } catch (err) {
      console.error(err);
      setError('Došlo je do greške prilikom kreiranja podkasta.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px', marginBottom: '20px' }}>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <InputField 
        label="Naziv podkasta"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Unesite naziv podkasta"
      />

      <InputField 
        label="Opis podkasta"
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Unesite opis podkasta"
      />

      {/* Polje koje prikazuje ime autora, ali je neizmenjivo */}
      <InputField type='hidden'
        value={user.name}
        onChange={() => {}}
        placeholder=""
      />
      
      <Button type="submit">Kreiraj podkast</Button>
    </form>
  );
}

export default AddPodcastForm;
