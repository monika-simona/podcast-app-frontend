import { useState, useEffect } from "react";
import api from "../api";

function usePagination(
  endpoint,
  initialPage = 1,
  itemsPerPage = 5,
  cacheTime = 120000
) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPage = async (page = currentPage, params = {}) => {
    setLoading(true);
    setError(null);

    const cacheKey = `${endpoint}_page_${page}_filter_${JSON.stringify(
      params
    )}`;
    const cached = sessionStorage.getItem(cacheKey);

    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        const now = Date.now();

        if (now - parsed.timestamp < cacheTime) {
          setData(parsed.data);
          setTotalPages(parsed.totalPages);
          setCurrentPage(page);
          setLoading(false);
          return;
        } else {
          sessionStorage.removeItem(cacheKey);
        }
      } catch (e) {
        console.warn("Cache parse error, fetching from API");
      }
    }

    try {
      const response = await api.get(endpoint, {
        params: { ...params, page, per_page: itemsPerPage },
      });

      let responseData = [];
      let lastPage = 1;
      let current = page;

      if (response.data.data) {
        // Laravel paginate sa meta
        responseData = response.data.data.map((item) => ({
          ...item,
          cover_image_url: item.cover_image || item.cover_image_url || null,
        }));

        lastPage = response.data.meta?.last_page || 1;
        current = response.data.meta?.current_page || page;
      } else {
        // Plain array (fallback)
        responseData = Array.isArray(response.data)
          ? response.data.map((item) => ({
              ...item,
              cover_image_url: item.cover_image || item.cover_image_url || null,
            }))
          : [];
        lastPage = 1;
      }

      setData(responseData);
      setTotalPages(lastPage);
      setCurrentPage(current);

      sessionStorage.setItem(
        cacheKey,
        JSON.stringify({
          data: responseData,
          totalPages: lastPage,
          timestamp: Date.now(),
        })
      );
    } catch (err) {
      console.error("Greška u usePagination:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage(initialPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
