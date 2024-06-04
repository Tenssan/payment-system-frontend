import React, { useState } from 'react';

import './CrearSubStyle.css';
const CreateSubscription: React.FC = () => {
    const [project, setProject] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [startDate, setStartDate] = useState('');
    const [paymentPeriod, setPaymentPeriod] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const subscriptionData = {
            project,
            name,
            description,
            amount,
            startDate,
            paymentPeriod,
            paymentMethod,
        };
        console.log('Subscription Data:', subscriptionData);
    };

    return (
        <div className="create-sub-container">
            <form onSubmit={handleSubmit} className="create-sub-form">
                <h2>Create Subscription</h2>
                <div className="form-group">
                    <label>Project</label>
                    <input
                        type="text"
                        value={project}
                        onChange={(e) => setProject(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                    <label>Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Payment Period</label>
                    <input
                        type="text"
                        value={paymentPeriod}
                        onChange={(e) => setPaymentPeriod(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Payment Method</label>
                    <input
                        type="text"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="buttonchangepwd">Create Subscription</button>
            </form>
        </div>
    );
};

export default CreateSubscription;