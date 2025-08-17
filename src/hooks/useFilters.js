import { useState } from 'react';

function useFilters(initialFilters = {}) {
  const [filters, setFilters] = useState(initialFilters);

  const setFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => setFilters({});

  return { filters, setFilter, clearFilters };
}

export default useFilters;

