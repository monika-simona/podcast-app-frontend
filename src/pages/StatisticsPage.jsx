import React from "react";
import EpisodesByTagChart from "../components/EpisodesByTagChart";
import EpisodesByMonthChart from "../components/EpisodesByMonthChart";
import TopEpisodesChart from "../components/TopEpisodesChart";
import TopPodcastsChart from "../components/TopPodcastsChart";
import Layout from "../components/Layout";

function StatisticsPage() {
  return (
    <Layout>
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
          Statistika
        </h1>

        {/* Najslušanije epizode */}
        <div
          style={{
            background: "#fff",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "30px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ marginBottom: "15px", textAlign: "center" }}>
            Top epizode
          </h2>
          <TopEpisodesChart />
        </div>

        {/* Najslušaniji podkasti */}
        <div
          style={{
            background: "#fff",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "30px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ marginBottom: "15px", textAlign: "center" }}>
            Top podkasti
          </h2>
          <TopPodcastsChart />
        </div>

        {/* Epizode po tagu */}
        <div
          style={{
            background: "#fff",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "30px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ marginBottom: "15px", textAlign: "center" }}>
            Epizode po tagu
          </h2>
          <EpisodesByTagChart />
        </div>

        {/* Epizode po mesecima */}
        <div
          style={{
            background: "#fff",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "30px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ marginBottom: "15px", textAlign: "center" }}>
            Aktivnost epizoda po mesecima
          </h2>
          <EpisodesByMonthChart />
        </div>
      </div>
    </Layout>
  );
}

export default StatisticsPage;
