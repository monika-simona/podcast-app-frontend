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

    const cacheKey = `${endpoint}_page_${page}_filter_${JSON.stringify(params)}`;
    const cached = sessionStorage.getItem(cacheKey);

    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setData(parsed.data);
        setTotalPages(parsed.totalPages);
        setCurrentPage(page);
        setLoading(false);
        return;
      } catch (e) {
        console.warn("Cache parse error, fetching from API");
      }
    }

    try {
      const response = await api.get(endpoint, {
        params: { ...params, page, per_page: itemsPerPage },
      });

      let responseData, lastPage;
      if (response.data.data) {
        responseData = response.data.data;
        lastPage = response.data.last_page || 1;
      } else {
        responseData = response.data;
        lastPage = 1;
      }

      setData(responseData);
      setTotalPages(lastPage);
      setCurrentPage(page);

      sessionStorage.setItem(cacheKey, JSON.stringify({
        data: responseData,
        totalPages: lastPage
      }));
    } catch (err) {
      console.error("Greška u usePagination:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage(initialPage);
  }, [endpoint]);

  const goToPage = (page, params = {}) => {
    if (page >= 1 && page <= totalPages) {
      fetchPage(page, params);
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
