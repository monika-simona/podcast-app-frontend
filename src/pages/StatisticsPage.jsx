import React from "react";
import EpisodesByTagChart from "../components/EpisodesByTagChart";
import EpisodesByMonthChart from "../components/EpisodesByMonthChart";
import TopEpisodesChart from "../components/TopEpisodesChart";
import TopPodcastsChart from "../components/TopPodcastsChart";


function StatisticsPage() {
  return (
    <div>
      <h1>Statistika</h1>
      <h1></h1>

      <TopEpisodesChart />

      <h1></h1>

      <TopPodcastsChart />

      <h1></h1>
      <EpisodesByTagChart />

      <h1></h1>
      <EpisodesByMonthChart />



    </div>
  );
}

export default StatisticsPage;
