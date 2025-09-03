import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Layout from "../components/Layout";
import EpisodeCard from "../components/EpisodeCard";
import Breadcrumbs from "../components/Breadcrumbs";

function NewsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
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

  useEffect(() => {
    fetchNews();
  }, []);

  const goToEpisode = (episode) => {
    navigate(`/podcasts/${episode.podcast_id}`);
  };

  const paths = [
    { label: "Početna", link: "/" },
    { label: "News", link: "/news" },
  ];

  return (
    <Layout>
      <div style={{ padding: "20px" }}>
        <Breadcrumbs paths={paths} />
        <h1> Pretraga Vesti</h1>

        {/* Filter polja */}
        <div style={{ marginBottom: "15px" }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Unesite pojam za pretragu"
            style={{ marginRight: "10px" }}
          />

          <button onClick={fetchNews}>Pretraži</button>
        </div>

        {loading && <p> Učitavanje...</p>}

        {!loading && (
          <>
            {/* Vesti */}
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
                      background: "#fafafa",
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

            {/* Povezane epizode */}
            <h2>Povezane epizode:</h2>
            {relatedEpisodes.length === 0 ? (
              <p>Nema povezanih epizoda.</p>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {relatedEpisodes.map((ep) => (
                  <div key={ep.id} style={{ cursor: "pointer" }}>
                    <EpisodeCard
                      episode={ep}
                      canManage={false} // na news stranici nema edit opcija
                      podcast={ep.podcast}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}

export default NewsPage;
