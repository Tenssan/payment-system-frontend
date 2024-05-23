'use client';
import React, { useState } from 'react';
import Container from "../Container";
import FormWrap from "../misc/FormWrap";
import Heading from "../misc/Heading";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faBan } from '@fortawesome/free-solid-svg-icons';
require('dotenv').config()

const PaymentForm: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [projects, setProjects] = useState<string[]>([]);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [selectedProject, setSelectedProject] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        fetchProjects(newEmail);
    };

    const fetchProjects = async (email: string) => {
        if (!email) return;

        //fetch userId from email
        //const response = await axios.get(`${process.env.API_URL}/users?email=${email}`);
        //const userId = response.data.userId;

        //fetch projects from userId with axios
        //const response2 = await axios.get(`${process.env.API_URL}/projects?userId=${userId}`);
        //const fetchedProjects = response2.data.projects;

        // Simulated data
        const fetchedProjectsExample = ['Project 1', 'Project 2', 'Project 3'];
        setProjects(fetchedProjectsExample);
    };

    const handleConfirm = () => {
        toast.info(
            <div className=''>
                <h1 className='mb-2 font-bold'>Confirm the transaction details:</h1>
                <p>Email: {email}</p>
                <hr />
                <p>Project: {selectedProject}</p>
                <hr />
                <p>Payment Method: {paymentMethod}</p>
                <hr />
                <p>Amount: {amount}</p>
                <hr />
                <p>Description: {description}</p>
                <div className="flex justify-center mt-2">
                    <button 
                        className="text-green-500 px-4 py-2 rounded mr-2" 
                        onClick={() => {
                            toast.dismiss();
                            handleSubmit();
                        }}>
                        <FontAwesomeIcon icon={faCheck} />
                    </button>
                    <button 
                        className= "text-red-500 px-4 py-2 rounded" 
                        onClick={() => toast.dismiss()}>
                        <FontAwesomeIcon icon={faBan} />
                    </button>
                </div>
            </div>, 
            { autoClose: false }
        );
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            /*const response = await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/transactions`, {
                email,
                project: selectedProject,
                paymentMethod,
                amount,
                description
            });*/
            const response = { status: 200, data: { transactionId: 1 } };

            if (response.status === 200) {
                const transactionId = response.data.transactionId;
                toast.success("Transaction completed successfully!");

                setTimeout(() => {
                    router.push(`payment/receipt/${transactionId}`);
                }, 2000);
            } else {
                toast.error("Transaction failed. Please try again.");
            }
        } catch (error) {
            toast.error("Transaction failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container>
            <FormWrap>
                <Heading title="Make a Payment" />
                <div className="space-y-4">
                    <input 
                        type="text" 
                        placeholder="Remitent email" 
                        value={email}
                        onChange={handleEmailChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select 
                        value={selectedProject} 
                        onChange={(e) => setSelectedProject(e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Project</option>
                        {projects.map((project, index) => (
                            <option key={index} value={project}>{project}</option>
                        ))}
                    </select>
                    <input 
                        type="text" 
                        placeholder="Amount" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea 
                        placeholder="Description" 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                    ></textarea>
                    <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:border-gray-600 dark:text-white">
                        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input id="gpay" type="radio" value="GPay" name="paymentMethod" onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"/>
                                <label htmlFor="gpay" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-black">GPay</label>
                            </div>
                        </li>
                        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input id="credit-card" type="radio" value="Credit Card" name="paymentMethod" onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"/>
                                <label htmlFor="credit-card" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-black">Credit Card</label>
                            </div>
                        </li>
                        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input id="debit-card" type="radio" value="Debit Card" name="paymentMethod" onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"/>
                                <label htmlFor="debit-card" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-black">Debit Card</label>
                            </div>
                        </li>
                        <li className="w-full dark:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input id="paypal" type="radio" value="Paypal" name="paymentMethod" onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"/>
                                <label htmlFor="paypal" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-black">Paypal</label>
                            </div>
                        </li>
                    </ul>
                </div>
                <button 
                    onClick={handleConfirm} 
                    disabled={isLoading} 
                    className="disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition w-full bg-slate-500 text-white p-2 mt-4 flex items-center justify-center gap-2"
                >
                    {isLoading ? 'Processing...' : 'Confirm'}
                </button>
            </FormWrap>
            <ToastContainer />
        </Container>
    );
}

export default PaymentForm;
