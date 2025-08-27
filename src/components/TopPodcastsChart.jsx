import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import api from "../api";

function TopPodcastsChart() {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/top-podcasts");
        setPodcasts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const data = {
    labels: podcasts.map(p => p.title),
    datasets: [
      {
        label: "Ukopan broj strimova po podkastu",
        data: podcasts.map(p => p.total_plays),
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };
  

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <Bar data={data} />
    </div>
  );
}

export default TopPodcastsChart;
