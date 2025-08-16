import React from 'react';
import { useParams } from 'react-router-dom';

function PodcastDetailsPage() {
  const { id } = useParams(); // čita ID iz URL-a

  return (
    <div>
      <h1>Detalji Podkasta</h1>
    </div>
  );
}

export default PodcastDetailsPage;
