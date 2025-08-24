import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function NewsPage() {
  const [query, setQuery] = useState("technology");
  const [category, setCategory] = useState("technology");
  const [articles, setArticles] = useState([]);
  const [relatedEpisodes, setRelatedEpisodes] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await api.get("/news", { params: { query, category } });
      console.log("Rezultat sa backenda:", res.data);
      setArticles(res.data.news);
      setRelatedEpisodes(res.data.related_episodes);
    } catch (err) {
      console.error("Greška pri učitavanju vesti:", err);
    } finally {
      setLoading(false);
    }
  };

  // Automatski učitaj početne vesti
  useEffect(() => {
    fetchNews();
  }, []);

  const goToEpisode = (episode) => {
    navigate(`/podcasts/${episode.podcast_id}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1> Pretraga Vesti</h1>

      <div style={{ marginBottom: "15px" }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Unesite pojam za pretragu"
          style={{ marginRight: "10px" }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ marginRight: "10px" }}
        >
          <option value="">Sve kategorije</option>
          <option value="technology">Tehnologija</option>
          <option value="sports">Sport</option>
          <option value="politics">Politika</option>
          <option value="business">Biznis</option>
        </select>

        <button onClick={fetchNews}>Pretraži</button>
      </div>

      {loading && <p> Učitavanje...</p>}

      {!loading && (
        <>
          <h2>Vesti:</h2>
          {articles.length === 0 ? (
            <p>Nema pronađenih vesti.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {articles.map((article, idx) => (
                <li
                  key={idx}
                  style={{
                    marginBottom: "15px",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                  }}
                >
                  {article.urlToImage && (
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      style={{
                        width: "100%",
                        maxHeight: "200px",
                        objectFit: "cover",
                        borderRadius: "6px",
                      }}
                    />
                  )}
                  <h3>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#007bff", textDecoration: "none" }}
                    >
                      {article.title}
                    </a>
                  </h3>
                  <p>{article.description}</p>
                  <small>
                    {article.source?.name} |{" "}
                    {new Date(article.publishedAt).toLocaleString("sr-RS")}
                  </small>
                </li>
              ))}
            </ul>
          )}

          <h2>Povezane epizode:</h2>
          {relatedEpisodes.length === 0 ? (
            <p>Nema povezanih epizoda.</p>
          ) : (
            <ul>
              {relatedEpisodes.map((ep) => (
                <li
                  key={ep.id}
                  style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
                  onClick={() => goToEpisode(ep)}
                >
                  <strong>{ep.title}</strong>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default NewsPage;
