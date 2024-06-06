'use client';
import React, { useState } from 'react';
import './CrearSubStyle.css';

const CreateSubscription: React.FC = () => {
  const [remittentEmail, setRemittentEmail] = useState('');
  const [destinataryEmail, setDestinataryEmail] = useState('');
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [periodicity, setPeriodicity] = useState('');
  const [paymentMethodName, setPaymentMethodName] = useState('');
  const status = 'vigente'; // Status is always 'vigente'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const subscriptionData = {
      remittentEmail,
      destinataryEmail,
      projectName,
      description,
      amount,
      date,
      status,
      periodicity,
      paymentMethodName,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(subscriptionData),
      });

      if (!response.ok) {
        throw new Error('Failed to create subscription');
      }

      const result = await response.json();
      console.log('Subscription created successfully:', result);
      // Handle successful subscription creation (e.g., show a success message or redirect)
    } catch (error) {
      console.error('Error creating subscription:', error);
      // Handle error (e.g., show an error message)
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
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Date (YYYY-MM-DD)</label>
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
            <option value="">Select Periodicity</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="semiannual">Semiannual</option>
            <option value="yearly">Yearly</option>
          </select>
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
        <button type="submit" className="buttonchangepwd">Create Subscription</button>
      </form>
    </div>
  );
};

export default CreateSubscription;