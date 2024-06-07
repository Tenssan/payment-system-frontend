'use client';
import React, { useState } from 'react';
import './CrearSubStyle.css';

const CreateSubscription: React.FC = () => {
    const [remittentEmail, setRemittentEmail] = useState('');
    const [destinataryEmail, setDestinataryEmail] = useState('');
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [paymentMethodName, setPaymentMethodName] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [periodicity, setPeriodicity] = useState('daily');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const subscriptionData = {
            remittentEmail,
            destinataryEmail,
            projectName,
            description,
            paymentMethodName,
            amount: parseFloat(amount), // ensure amount is a number
            date, // ensure date is in YYYY-MM-DD format
            status: 'vigente', // status is always "vigente"
            periodicity
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/subscription`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(subscriptionData),
            });

            if (!response.ok) {
                throw new Error('Failed to create subscription');
            }

            const data = await response.json();
            console.log('Subscription created:', data);
        } catch (error) {
            console.error('Error creating subscription:', error);
        }
    };

    return (
        <div className="create-sub-container">
            <form onSubmit={handleSubmit} className="create-sub-form">
                <h2>Create Subscription</h2>
                <div className="form-group">
                    <label>Remittent Email</label>
                    <input
                        type="email"
                        value={remittentEmail}
                        onChange={(e) => setRemittentEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Destinatary Email</label>
                    <input
                        type="email"
                        value={destinataryEmail}
                        onChange={(e) => setDestinataryEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Project Name</label>
                    <input
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Payment Method Name</label>
                    <input
                        type="text"
                        value={paymentMethodName}
                        onChange={(e) => setPaymentMethodName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Periodicity</label>
                    <select
                        value={periodicity}
                        onChange={(e) => setPeriodicity(e.target.value)}
                        required
                    >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="semiannual">Semiannual</option>
                        <option value="yearly">Yearly</option>
                    </select>
                </div>
                <button type="submit" className="buttonchangepwd">Create Subscription</button>
            </form>
        </div>
    );
};

export default CreateSubscription;