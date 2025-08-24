import { useState } from "react";
import api from "../api"; // ovo je tvoj axios instance za backend

function ITunesSearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await api.get("/itunes-search", { params: { term: query } });
      setResults(res.data);
    } catch (err) {
      console.error("Greška u pretrazi iTunes:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>iTunes Podcast Pretraga</h1>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Unesite pojam..."
      />
      <button onClick={handleSearch}>Pretraži</button>

      {loading && <p>Učitavanje...</p>}

      <ul>
        {results.map((podcast) => (
          <li key={podcast.collectionId}>
            <strong>{podcast.collectionName}</strong> - {podcast.artistName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ITunesSearchPage;
