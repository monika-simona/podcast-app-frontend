import { useState, useEffect } from 'react';
import api from '../api';

function usePagination(endpoint, initialPage = 1, itemsPerPage = 5) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPage = async (page = currentPage, params = {}) => {
    setLoading(true);
    try {
      const response = await api.get(endpoint, { params: { ...params, page, per_page: itemsPerPage } });
      setData(response.data.data || response.data); // Laravel paginate vraća data
      setTotalPages(response.data.last_page || 1);
      setCurrentPage(page);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage(currentPage);
  }, [currentPage]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    data,
    loading,
    error,
    currentPage,
    totalPages,
    goToPage,
    fetchPage
  };
}

export default usePagination;
