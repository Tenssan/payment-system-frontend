import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

interface ReceiptProps {
    transactionId: string;
}
//TODO quitar la id hardcodeada y hacer la peticion a la api
const Receipt: React.FC<ReceiptProps> = ({transactionId}) => {
    const [transaction, setTransaction] = useState<any>(null);

    useEffect(() => {
        if (transactionId) {
            fetchTransactionDetails(transactionId as string);
            console.log(transactionId);
            setTransaction(transactionId);
        }
    }, [transactionId]);

    const fetchTransactionDetails = async (id: string) => {
        try {
            const response = await axios.get(`/api/transactions/${id}`);
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
                <p><strong>Transaction ID:</strong> {transaction.id}</p>
                <p><strong>Status:</strong> {transaction.status}</p>
                <p><strong>Amount:</strong> ${transaction.amount}</p>
                <p><strong>Date:</strong> {transaction.date}</p>
                <p><strong>Project:</strong> {transaction.project}</p>
                <p><strong>Payment Method:</strong> {transaction.paymentMethod}</p>
                <p><strong>Description:</strong> {transaction.description}</p>
            </div>
        </div>
    );
};

export default Receipt;
