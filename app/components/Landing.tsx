/*'use client';
import React, { useEffect,useState } from 'react';
import './LandingStyle.css'; // Importa los estilos

const Landing: React.FC = () => {
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    useEffect(() => {
        const bankAccounts = document.getElementById('bank-accounts');

        const handleMouseDown = (e) => {
            setIsMouseDown(true);
            setStartX(e.pageX - bankAccounts.offsetLeft);
            setScrollLeft(bankAccounts.scrollLeft);
            bankAccounts.style.cursor = 'grabbing';
        };

        const handleMouseUp = () => {
            setIsMouseDown(false);
            bankAccounts.style.cursor = 'grab';
        };

        const handleMouseMove = (e) => {
            if (!isMouseDown) return;
            e.preventDefault();
            const x = e.pageX - bankAccounts.offsetLeft;
            const walkX = (x - startX) * 1;
            bankAccounts.scrollLeft = scrollLeft - walkX;
        };

        bankAccounts.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            bankAccounts.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isMouseDown, startX, scrollLeft]);
    
    return (
        <div className="containerHistory pt-5">
            <div className="action-buttons">
                <a href="#" className="action-button action-button--primary">
                    <svg width="16" height="16" fill="currentColor" focusable="false" viewBox="0 0 24 24"><path d="M21.343 10.543 12.77 1.972a.829.829 0 0 0-1.2 0L3 10.543l1.2 1.2 7.114-7.114v17.657h1.715V4.63l7.114 7.114 1.2-1.2Z"></path></svg>
                    Send
                </a>
                <a aria-expanded="false" href="#" className="action-button">
                    <svg width="16" height="16" fill="currentColor" focusable="false" viewBox="0 0 24 24"><path d="M22.286 11.143h-9.429V1.715h-1.714v9.428H1.714v1.715h9.429v9.428h1.714v-9.428h9.429v-1.715Z"></path></svg>
                    Add Money
                </a>
                <a aria-expanded="false" href="#" className="action-button">
                    <svg width="16" height="16" fill="currentColor" focusable="false" viewBox="0 0 24 24"><path d="m20.143 12.256-7.114 7.114V1.713h-1.715V19.37L4.2 12.256l-1.2 1.2 8.571 8.571a.847.847 0 0 0 .6.257.846.846 0 0 0 .6-.257l8.572-8.571-1.2-1.2Z"></path></svg>
                    Request
                </a>
                
            </div>
            <div id="bank-accounts">
                <a href="#uk" className="bank-account">   
                    
                    <div>
                        <h2 role="presentation">
                           12150.25
                        </h2>
                        <div className="currency">
                            British Pound
                        </div>
                    </div>          
                </a>
                <a href="#usa" className="bank-account">                    
                    
                    <div>
                        <h2 role="presentation">
                            15150.25
                        </h2>
                        <div className="currency">
                            US Dollar
                        </div>
                    </div>  
                </a>
                <a href="#eu" className="bank-account">                    
                    
                    <div>
                        <h2 role="presentation">
                            7250.15
                        </h2>
                        <div className="currency">
                            Euro
                        </div>  
                    </div>
                </a>
                <a href="#cz" className="bank-account">           
                    
                    <div>
                        <h2 role="presentation">
                            150055.25
                        </h2>
                        <div className="currency">
                            Czech Koruna
                        </div>
                    </div>         
                </a>
                <a href="#chf" className="bank-account">           
                    
                    <div>
                        <h2 role="presentation">
                            2456.88
                        </h2>
                        <div className="currency">
                            Swiss Franc
                        </div>
                    </div>         
                </a>
            </div>
        </div>
    );
};

export default Landing;*/
'use client';
import React, { useEffect, useState } from 'react';
import './LandingStyle.css'; // Importa los estilos
import useFetchTransactions from './useFetchAllTransactions';

const Landing: React.FC = () => {
    const [storedToken, setStoredToken] = useState<string | null>(null);
    const { transactions, loading, error, fetchTransactions } = useFetchTransactions(); 

    useEffect(() => {
        const fetchToken = () => {
            const savedToken = localStorage.getItem('token');
            if (savedToken) {
                console.log('Retrieved Token:', savedToken); // Print the retrieved token
                setStoredToken(savedToken);
            }
        };

        fetchToken();
        window.addEventListener('storage', fetchToken); // Listen to storage changes

        return () => {
            window.removeEventListener('storage', fetchToken);
        };
    }, []);
    
    useEffect(() => {
        if (storedToken && !transactions) {
            console.log('Using Token:', storedToken); // Print the token being used
            fetchTransactions(storedToken);
        }
    }, [storedToken, fetchTransactions, transactions]);

    return (
        <div className="containerHistory pt-5">
            <div id="bank-accounts">
                {/* Aquí renderiza las transacciones */}
                {loading ? (
                    <p>Loading transactions...</p>
                ) : error ? (
                    <p>Error loading transactions</p>
                ) : transactions ? (
                    transactions.map((tx, index) => (
                        <a key={index} href={`#${tx.description}`} className="bank-account">
                            <div>
                                <h2 role="presentation">{tx.amount}</h2>
                                <div className="currency">
                                    {tx.description} - {new Date(tx.date).toLocaleDateString()}
                                </div>
                            </div>
                        </a>
                    ))
                ) : (
                    <p>No transactions found</p>
                )}
            </div>
        </div>
    );
};

export default Landing;