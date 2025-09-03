import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import api from "../api";

function EpisodesByMonthChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/episodes-by-month");
        const labels = res.data.map((item) => item.month);
        const data = res.data.map((item) => item.total);

        setChartData({
          labels,
          datasets: [
            {
              label: "Broj epizoda po mesecu",
              data,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
          ],
        });
      } catch (err) {
        console.error("Greška pri učitavanju podataka za grafikon", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <Bar data={chartData} />
    </div>
  );
}

export default EpisodesByMonthChart;
