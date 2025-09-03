import React, { useEffect, useState } from "react";
import EpisodeCard from "../components/EpisodeCard";
import TagList from "../components/TagList";
import usePagination from "../hooks/usePagination";
import useFilters from "../hooks/useFilters";
import Layout from "../components/Layout";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import Breadcrumbs from "../components/Breadcrumbs";

function EpisodesPage() {
  const [selectedTag, setSelectedTag] = useState(null);
  const { filters, setFilter, clearFilters } = useFilters({
    title: "",
    sort_by: "created_at",
    sort_order: "desc",
    per_page: 5,
    page: 1,
  });
  const {
    data: episodes,
    loading,
    error,
    currentPage,
    totalPages,
    goToPage,
    fetchPage,
  } = usePagination("/episodes", 1, filters.per_page);

  useEffect(() => {
    const params = { ...filters };
    if (selectedTag) params.tag_id = selectedTag.id;
    fetchPage(filters.page, params);
  }, [selectedTag, filters]);

  const paths = [
    { label: "Početna", link: "/" },
    { label: "Epizode", link: "/episodes" },
  ];
  return (
    <Layout>
      <div style={{ width: "100%", maxWidth: "900px" }}>
        <Breadcrumbs paths={paths} />
        <h2>Epizode</h2>
        <TagList onTagClick={(tag) => setSelectedTag(tag)} />

        {selectedTag && (
          <p>
            Filtrirano po tagu: <strong>#{selectedTag.name}</strong>{" "}
            <button onClick={() => setSelectedTag(null)}>✖</button>
          </p>
        )}

        <div style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Pretraži po naslovu..."
            value={filters.title}
            onChange={(e) => setFilter("title", e.target.value)}
            style={{ marginRight: "1rem" }}
          />
          <select
            value={filters.sort_by}
            onChange={(e) => setFilter("sort_by", e.target.value)}
          >
            <option value="created_at">Datum kreiranja</option>
            <option value="release_date">Datum izlaska</option>
            <option value="title">Naslov</option>
          </select>
          <select
            value={filters.sort_order}
            onChange={(e) => setFilter("sort_order", e.target.value)}
            style={{ marginLeft: "0.5rem" }}
          >
            <option value="desc">Opadajuće</option>
            <option value="asc">Rastuće</option>
          </select>
          <button onClick={clearFilters} style={{ marginLeft: "1rem" }}>
            Reset filtera
          </button>
        </div>

        {loading && <p>Učitavanje...</p>}
        {error && <p>Greška pri učitavanju epizoda</p>}
        {episodes.length > 0
          ? episodes.map((ep) => (
              <EpisodeCard key={ep.id} episode={ep} podcast={ep.podcast} />
            ))
          : !loading && <p>Nema epizoda</p>}

        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => {
              setFilter("page", 1);
              goToPage(1, filters);
            }}
            disabled={currentPage === 1}
            style={{ marginRight: "0.5rem" }}
          >
            <FaAngleDoubleLeft />
          </button>

          <button
            onClick={() => {
              setFilter("page", currentPage - 1);
              goToPage(currentPage - 1, filters);
            }}
            disabled={currentPage === 1}
            style={{ marginRight: "0.5rem" }}
          >
            Prethodna
          </button>

          <span style={{ margin: "0 1rem" }}>
            Strana {currentPage} od {totalPages}
          </span>

          <button
            onClick={() => {
              setFilter("page", currentPage + 1);
              goToPage(currentPage + 1, filters);
            }}
            disabled={currentPage === totalPages}
            style={{ marginRight: "0.5rem" }}
          >
            Sledeća
          </button>

          <button
            onClick={() => {
              setFilter("page", totalPages);
              goToPage(totalPages, filters);
            }}
            disabled={currentPage === totalPages}
          >
            <FaAngleDoubleRight />
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default EpisodesPage;
