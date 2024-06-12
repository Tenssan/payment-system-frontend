"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

interface ReceiptProps {
  transactionId: string;
}

const Receipt: React.FC<ReceiptProps> = ({ transactionId }) => {
  const [transaction, setTransaction] = useState<any>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (transactionId) {
      fetchTransactionDetails(transactionId);
    }
  }, [transactionId]);

  const fetchTransactionDetails = async (id: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_URL}/transactions/${id}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*", // Allow any origin
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE", // Allowed HTTP methods
            "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allowed headers
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTransaction(response.data);
    } catch (error) {
      console.error("Error fetching transaction details:", error);
    }
  };

  if (!transaction) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Receipt</h1>
      <div className="bg-white p-4 shadow rounded-lg">
        <p>
          <strong>Transaction ID:</strong> {transaction.transactionid}
        </p>
        <p>
          <strong>Status:</strong> {transaction.status}
        </p>
        <p>
          <strong>Amount:</strong> ${transaction.amount}
        </p>
        <p>
          <strong>Date:</strong> {new Date(transaction.date).toLocaleString()}
        </p>
        <p>
          <strong>Description:</strong> {transaction.description}
        </p>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Project</h2>
          <p>
            <strong>Project ID:</strong> {transaction.project.projectid}
          </p>
          <p>
            <strong>Name:</strong> {transaction.project.name}
          </p>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Payment Method</h2>
          <p>
            <strong>Payment Method ID:</strong>{" "}
            {transaction.paymentMethod.paymentmethodid}
          </p>
          <p>
            <strong>Name:</strong> {transaction.paymentMethod.name}
          </p>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Remittent</h2>
          <p>
            <strong>User ID:</strong> {transaction.remittent.userid}
          </p>
          <p>
            <strong>Email:</strong> {transaction.remittent.email}
          </p>
          <p>
            <strong>RUT:</strong> {transaction.remittent.rut}
          </p>
          <p>
            <strong>First Name:</strong> {transaction.remittent.firstname}
          </p>
          <p>
            <strong>Last Name:</strong> {transaction.remittent.lastname}
          </p>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Destinatary</h2>
          <p>
            <strong>User ID:</strong> {transaction.destinatary.userid}
          </p>
          <p>
            <strong>Email:</strong> {transaction.destinatary.email}
          </p>
          <p>
            <strong>RUT:</strong> {transaction.destinatary.rut}
          </p>
          <p>
            <strong>First Name:</strong> {transaction.destinatary.firstname}
          </p>
          <p>
            <strong>Last Name:</strong> {transaction.destinatary.lastname}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
