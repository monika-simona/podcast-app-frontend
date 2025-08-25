import React, { useEffect, useState } from "react";
import EpisodeCard from "../components/EpisodeCard";
import TagList from "../components/TagList";
import usePagination from "../hooks/usePagination";
import useFilters from "../hooks/useFilters";

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

  // povlači epizode kada se promeni filter ili tag
  useEffect(() => {
    const params = { ...filters };

    if (selectedTag) {
      params.tag_id = selectedTag.id;
    }

    fetchPage(filters.page, params);
  }, [selectedTag, filters]);

  return (
    <div>
      <h2>Epizode</h2>

      <TagList onTagClick={(tag) => setSelectedTag(tag)} />

      {selectedTag && (
        <p>
          Filtrirano po tagu: <strong>#{selectedTag.name}</strong>{" "}
          <button onClick={() => setSelectedTag(null)}>✖ Ukloni filter</button>
        </p>
      )}

      {/* 🔍 Filteri */}
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

      {/* 🎧 Lista epizoda */}
      <div>
        {loading && <p> Učitavanje...</p>}
        {error && <p>Greška pri učitavanju epizoda</p>}
        {episodes.length > 0 ? (
          episodes.map((ep) => <EpisodeCard key={ep.id} episode={ep} />)
        ) : (
          !loading && <p>Nema epizoda</p>
        )}
      </div>

      {/* ⏩ Paginacija */}
      <div style={{ marginTop: "1rem" }}>
        <button
          onClick={() => {
            setFilter("page", currentPage - 1);
            goToPage(currentPage - 1, filters);
          }}
          disabled={currentPage === 1}
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
        >
          Sledeća
        </button>
      </div>
    </div>
  );
}

export default EpisodesPage;
