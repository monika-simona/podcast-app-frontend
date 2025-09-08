import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import api from "../api";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function TopEpisodesChart() {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/top-episodes?limit=10");
        setEpisodes(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: episodes.map((ep) => ep.title),
    datasets: [
      {
        label: "Broj preslušavanja",
        data: episodes.map((ep) => ep.play_count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Top 10 najslušanijih epizoda",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default TopEpisodesChart;
