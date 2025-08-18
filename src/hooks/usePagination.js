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
    setError(null);

    try {
      const response = await api.get(endpoint, {
        params: { ...params, page, per_page: itemsPerPage },
      });

      // Laravel paginate response
      if (response.data.data) {
        setData(response.data.data);
        setTotalPages(response.data.last_page || 1);
      } else {
        // Ako nije paginate, nego obican array
        setData(response.data);
        setTotalPages(1);
      }

      setCurrentPage(page);
    } catch (err) {
      console.error("Greška u usePagination:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage(initialPage);
  }, [endpoint]); // ako endpoint promeni, da se refetchuje

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      fetchPage(page);
    }
  };

  return {
    data,
    loading,
    error,
    currentPage,
    totalPages,
    goToPage,
    fetchPage,
  };
}

export default usePagination;
