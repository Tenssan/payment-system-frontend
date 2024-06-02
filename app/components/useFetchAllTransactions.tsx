import { useState } from 'react';
require('dotenv').config();

interface Transaction {
  transactionid: number;
  description: string;
  amount: number;
  date: string;
  status: string;
}

interface UseFetchTransactionsResult {
  transactions: Transaction[] | null;
  loading: boolean;
  error: boolean;
  fetchTransactions: (token: string) => void;
}

const useFetchTransactions = (): UseFetchTransactionsResult => {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchTransactions = async (token: string) => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/transactions`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }

      const data = await response.json();
      const allTransactions = [
        ...data.receivedTransactions,
        ...data.emittedTransactions
      ];

      setTransactions(allTransactions);
    } catch (error) {
      setError(true);
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    transactions,
    loading,
    error,
    fetchTransactions,
  };
};

export default useFetchTransactions;