import React, { useState } from 'react';
import api from '../api';
import Button from './Button';
import InputField from './InputField';

function AddPodcastForm({ setPodcasts }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      if (coverImage) formData.append('cover_image', coverImage);

      const res = await api.post('/podcasts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setPodcasts(prev => [...prev, res.data.data]);
      setTitle('');
      setDescription('');
      setCoverImage(null);
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

      <InputField 
        label="Cover slika"
        type="file"
        accept="image/*"
        onChange={e => setCoverImage(e.target.files[0])}
      />
      
      <Button type="submit">Kreiraj podkast</Button>
    </form>
  );
}

export default AddPodcastForm;
