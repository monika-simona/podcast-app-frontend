import React from "react";
import PodcastCard from "../components/PodcastCard";
import { useNavigate } from "react-router-dom";
import usePagination from "../hooks/usePagination";
import useFilters from "../hooks/useFilters";
import Layout from "../components/Layout";
import Breadcrumbs from "../components/Breadcrumbs";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

function PodcastsPage() {
  const navigate = useNavigate();
  const { filters, setFilter, clearFilters } = useFilters({
    query: "",
    filterBy: "title",
  });
  const {
    data: podcasts,
    loading,
    currentPage,
    totalPages,
    goToPage,
    fetchPage,
  } = usePagination("/podcasts", 1, 6);

  const handleSearch = () => {
    const searchParam =
      filters.filterBy === "title"
        ? { title: filters.query }
        : { user_name: filters.query };
    fetchPage(1, searchParam);
  };

  const handleClear = () => {
    clearFilters();
    fetchPage(1, {});
  };

  const paths = [
    { label: "Početna", link: "/" },
    { label: "Podkasti", link: "/podcasts" },
  ];

  return (
    <Layout>
      <div className="podcasts-page">
        <Breadcrumbs paths={paths} />
        <h1>Podkasti</h1>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder={
              filters.filterBy === "title"
                ? "Pretraži po nazivu"
                : "Pretraži po autoru"
            }
            value={filters.query}
            onChange={(e) => setFilter("query", e.target.value)}
            style={{ marginRight: "10px" }}
          />

          <select
            value={filters.filterBy}
            onChange={(e) => setFilter("filterBy", e.target.value)}
          >
            <option value="title">Naziv podkasta</option>
            <option value="user_name">Autor</option>
          </select>

          <button onClick={handleSearch} style={{ marginLeft: "10px" }}>
            Pretraži
          </button>
          <button onClick={handleClear} style={{ marginLeft: "5px" }}>
            Resetuj
          </button>
        </div>

        {loading ? (
          <p>Učitavanje...</p>
        ) : (
          <div className="podcast-list">
            {podcasts.map((podcast) => (
              <PodcastCard
                key={podcast.id}
                podcast={podcast}
                onViewDetails={(id) => navigate(`/podcasts/${id}`)}
              />
            ))}
          </div>
        )}

        {/* Paginacija */}
        <div
          className="pagination"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <button
            onClick={() => goToPage(1, filters)}
            disabled={currentPage === 1}
            title="Prva strana"
            style={{ padding: "5px 10px" }}
          >
            <FaAngleDoubleLeft />
          </button>
          <button
            onClick={() => goToPage(currentPage - 1, filters)}
            disabled={currentPage === 1}
            style={{ padding: "5px 10px" }}
          >
            Prethodna
          </button>

          <span style={{ margin: "0 10px" }}>
            Strana {currentPage} od {totalPages}
          </span>

          <button
            onClick={() => goToPage(currentPage + 1, filters)}
            disabled={currentPage === totalPages}
            style={{ padding: "5px 10px" }}
          >
            Sledeća
          </button>
          <button
            onClick={() => goToPage(totalPages, filters)}
            disabled={currentPage === totalPages}
            title="Poslednja strana"
            style={{ padding: "5px 10px" }}
          >
            <FaAngleDoubleRight />
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default PodcastsPage;
