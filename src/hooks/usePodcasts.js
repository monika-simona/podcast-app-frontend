import { useState } from 'react';

function usePodcasts(initialPodcasts = []) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  //Filtriranje podkasta
  const filteredPodcasts = initialPodcasts.filter(podcast => {
      const matchesTitle = podcast.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesAuthor = podcast.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesEpisode = podcast.episodes.some(ep =>
        ep.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return matchesTitle || matchesAuthor || matchesEpisode;
    });

  //Paginacija
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedPodcasts = filteredPodcasts.slice(start, end);

  const totalPages = Math.ceil(filteredPodcasts.length / itemsPerPage);

  return {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    totalPages,
    filteredPodcasts,
    paginatedPodcasts
  };
}

export default usePodcasts;
