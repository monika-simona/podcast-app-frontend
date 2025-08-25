import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function EpisodesByTagChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/api/stats/episodes-by-tag")
      .then((res) => {
        const labels = res.data.map(item => item.name);
        const values = res.data.map(item => item.total_episodes);

        setChartData({
          labels,
          datasets: [
            {
              label: "Broj epizoda po tagu",
              data: values,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
          ],
        });
      })
      .catch((err) => console.error("Greška pri učitavanju statistike:", err));
  }, []);

  if (!chartData) return <p>Učitavanje grafikona...</p>;

  return (
    <div style={{ width: "600px", margin: "auto" }}>
      <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
    </div>
  );
}

export default EpisodesByTagChart;
