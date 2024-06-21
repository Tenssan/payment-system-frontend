"use client";

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useTranslation } from "react-i18next";
import { SelectedValueContext } from "../context/SelectedValueContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TransactionVolume {
  day: number;
  total: number;
}

const MonthlyTransactionsGraph: React.FC = () => {
  const { t } = useTranslation();
  const [transactionVolume, setTransactionVolume] = useState<TransactionVolume[]>([]);
  const token = localStorage.getItem("token");
  const { selectedValue } = useContext(SelectedValueContext);

  /*useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);*/

  useEffect(() => {
    if (!token) return;

    const fetchTransactionsVolume = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACK_URL}/dashboard/getTransactionCountPerDay`,
          {
            projectid: selectedValue,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*", // Allow any origin
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE", // Allowed HTTP methods
              "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allowed headers
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const volumeData: TransactionVolume[] = response.data.map(
          (item: any) => ({
            day: parseInt(item.day, 10),
            total: parseInt(item.total, 10),
          })
        );
        setTransactionVolume(volumeData);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    setTimeout(() => {
      fetchTransactionsVolume();
    }, 2000);
  }, [token, selectedValue]);

  const daysInMonth = new Date().getDate();
  const labels = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
  const data = labels.map((label) => {
    const volume = transactionVolume.find((v) => v.day.toString() === label);
    return volume ? volume.total : 0;
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: t("transactionsPerDay"),
        data,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: t("monthlyTransactions"),
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: t("day"),
        },
      },
      y: {
        title: {
          display: true,
          text: t("transactions"),
        },
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">{t("transactionsPerDay")}</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default MonthlyTransactionsGraph;
