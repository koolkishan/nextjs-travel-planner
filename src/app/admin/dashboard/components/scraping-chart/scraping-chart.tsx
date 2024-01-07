import { apiClient } from "@/lib";

import { ADMIN_API_ROUTES } from "@/utils/api-routes";
import dynamic from "next/dynamic";
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
import { Card, CardBody, CardHeader } from "@nextui-org/react";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const ScrapingChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Hotels",
        data: [],
        backgroundColor: "red",
      },
      {
        label: "Flights",
        data: [],
        backgroundColor: "blue",
      },
      {
        label: "Trips",
        data: [],
        backgroundColor: "green",
      },
    ],
  });
  const processData = (data) => {
    const aggregation = {};

    data.hotels.forEach((item) => {
      const date = item.scrappedOn.split("T")[0];
      if (!aggregation[date]) {
        aggregation[date] = { hotels: 0, flights: 0, trips: 0 };
      }
      aggregation[date].hotels += item._count;
    });

    data.flights.forEach((item) => {
      const date = item.scrappedOn.split("T")[0];
      if (!aggregation[date]) {
        aggregation[date] = { hotels: 0, flights: 0, trips: 0 };
      }
      aggregation[date].flights += item._count;
    });

    data.trips.forEach((item) => {
      const date = item.scrapedOn.split("T")[0];
      if (!aggregation[date]) {
        aggregation[date] = { hotels: 0, flights: 0, trips: 0 };
      }
      aggregation[date].trips += item._count;
    });

    const dates = Object.keys(aggregation);
    const hotels = dates.map((date) => aggregation[date].hotels);
    const flights = dates.map((date) => aggregation[date].flights);
    const trips = dates.map((date) => aggregation[date].trips);

    return { dates, hotels, flights, trips };
  };

  useEffect(() => {
    const getData = async () => {
      const response = await apiClient.get(
        ADMIN_API_ROUTES.DASHBOARD_SCRAPING_CHART_DATA
      );
      console.log({ response });
      const { dates, hotels, flights, trips } = processData(response.data);
      setChartData({
        labels: dates,
        datasets: [
          { ...chartData.datasets[0], data: hotels },
          { ...chartData.datasets[1], data: flights },
          { ...chartData.datasets[2], data: trips },
        ],
      });
    };
    getData();
  }, []);

  return (
    <Card className="h-[400px]">
      <CardHeader>Scraping Logs</CardHeader>
      <CardBody className="flex items-center justify-center">
        {" "}
        <Bar data={chartData} height={400} width={1000} />
      </CardBody>
    </Card>
  );
};

export default dynamic(() => Promise.resolve(ScrapingChart), {
  ssr: false,
});
