'use client';
import React, { useState } from 'react';
import Container from "../Container";
import FormWrap from "../misc/FormWrap";
import Heading from "../misc/Heading";
import ButtonBassa from "../misc/ButtonBassa";
import axios from 'axios';

const PaymentForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [projects, setProjects] = useState<string[]>([]);
    const [selectedProject, setSelectedProject] = useState('');
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

        const fetchedProjectsExample = ['Project 1', 'Project 2', 'Project 3'];
        setProjects(fetchedProjectsExample);
    };

    const onSubmit = () => {
        console.log('Payment submitted');
    };

    function handleSubmit(onSubmit: () => void): ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined {
        return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            setIsLoading(true);
            onSubmit();
            setIsLoading(false);
        }
    }

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
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea 
                        placeholder="Description" 
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                    ></textarea>
                </div>
                <button className='isabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80
        transition w-full border-slate-700 flex items-center justify-center gap-2'>Confirm</button>
            </FormWrap>
        </Container>
    );
}

export default PaymentForm;
