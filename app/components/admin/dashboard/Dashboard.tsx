"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface TransactionVolume {
  day: number;
  total: number;
}

const Dashboard: React.FC = () => {
  const [totalMonthValue, setTotalMonthValue] = useState<number | null>(null);
  const [transactionVolume, setTransactionVolume] = useState<
    TransactionVolume[]
  >([]);
  const [recentPayments, setRecentPayments] = useState<any[]>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    // Fetch recent payments
    const fetchRecentPayments = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACK_URL}/dashboard/getRecentPayments`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*", // Permitir cualquier origen
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE", // Métodos HTTP permitidos
              "Access-Control-Allow-Headers": "Content-Type, Authorization", // Encabezados permitidos
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRecentPayments(response.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    // Fetch transaction volume
    const fetchTransactionsVolume = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACK_URL}/dashboard/getTransactionCountPerDay`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*", // Permitir cualquier origen
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE", // Métodos HTTP permitidos
              "Access-Control-Allow-Headers": "Content-Type, Authorization", // Encabezados permitidos
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const volumeData: TransactionVolume[] = response.data.map(
          (item: any) => ({
            day: item.day,
            total: parseInt(item.total, 10),
          })
        );
        setTransactionVolume(volumeData);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    // Fetch monthly total
    const fetchTotalMonthValue = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACK_URL}/dashboard/getTotalAmount`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*", // Permitir cualquier origen
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE", // Métodos HTTP permitidos
              "Access-Control-Allow-Headers": "Content-Type, Authorization", // Encabezados permitidos
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTotalMonthValue(response.data);
      } catch (error) {
        console.error("Error fetching total:", error);
      }
    };

    fetchRecentPayments();
    fetchTransactionsVolume();
    fetchTotalMonthValue();
  }, [token]);

  return (
    <div className="p-4">
      <div className="flex justify-between mb-8">
        <div className="w-1/2 p-4 bg-white shadow-md rounded-lg mr-4">
          <h2 className="text-xl font-bold mb-2">Total Month Value</h2>
          <p className="text-2xl">
            {totalMonthValue !== null ? totalMonthValue : "Loading..."}
          </p>
        </div>
        <div className="w-1/2 p-4 bg-white shadow-md rounded-lg ml-4">
          <h2 className="text-xl font-bold mb-2">Transaction Volume</h2>
          <div className="text-2xl">
            {transactionVolume.length > 0
              ? transactionVolume.map((vol) => (
                  <div key={vol.day}>{`Day ${vol.day}: ${vol.total}`}</div>
                ))
              : "Loading..."}
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Recent Payments</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentPayments.map((payment) => (
              <tr key={payment.transactionid}>
                <td className="py-2 px-4 border-b">{payment.transactionid}</td>
                <td className="py-2 px-4 border-b">{payment.description}</td>
                <td className="py-2 px-4 border-b">{payment.amount}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(payment.date).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
