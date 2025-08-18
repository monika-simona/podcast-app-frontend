import React, { useState } from 'react';
import Button from './Button';
import InputField from './InputField';
import api from '../api';

function EditPodcastForm({ podcast, setPodcasts, onClose }) {
  const [title, setTitle] = useState(podcast.title);
  const [description, setDescription] = useState(podcast.description);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/podcasts/${podcast.id}`, { title, description });

      setPodcasts(prev => prev.map(p => p.id === podcast.id ? res.data : p));
      onClose();
    } catch (err) {
      console.error(err);
      setError('Došlo je do greške prilikom ažuriranja podkasta.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px', marginBottom: '20px' }}>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <InputField 
        label="Naziv podkasta"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <InputField 
        label="Opis podkasta"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <Button type="submit">Sačuvaj izmene</Button>
      <Button type="button" onClick={onClose}>Otkaži</Button>
    </form>
  );
}

export default EditPodcastForm;
