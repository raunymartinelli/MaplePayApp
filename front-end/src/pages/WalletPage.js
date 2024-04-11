import React from 'react';
import { jwtDecode } from 'jwt-decode';
import Wallet from '../components/Wallet';
import CardCarousel from '../components/CardCarousel';
import { useNavigate } from 'react-router-dom';
import './css/WalletPage.css';


const WalletPage = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook

    const token = localStorage.getItem('token');
    let userId;

    if (token) {
        try {
            const decoded = jwtDecode(token);
            userId = decoded.userId;
        } catch (e) {
            console.error('Error decoding token:', e);
        }
    }

    if (!userId) {
        navigate('/login'); // Redirect to login page if user is not authenticated
        return null;
    }

    const handleTransactionsClick = () => {
        navigate('/transactions'); // Navigate to Transactions page when button is clicked
    };

    return (
        <div>
            <h1>Wallet</h1>
            <CardCarousel />
            <div className="transactions-header">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Transactions</h2>
                <button onClick={handleTransactionsClick}>View All</button>
            </div>
            </div>
            <Wallet userId={userId} />
        </div>
    );
};

export default WalletPage;
