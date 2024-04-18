import React from 'react';
import { jwtDecode } from 'jwt-decode';
import Wallet from '../components/Wallet';
import CardCarousel from '../components/CardCarousel';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './css/WalletPage.css';
import Navbar from '../components/Navbar';


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
        navigate('/LoginPage'); // Redirect to login page if user is not authenticated
        return null;
    }

    const handleTransactionsClick = () => {
        navigate('/TransactionsPage'); // Navigate to Transactions page when button is clicked
    };

    return (
        <div className="wallet-page-container">
 {/* Add Navbar component */}
            <CardCarousel />
            <div className="transactions-container">
                <div className="transactions-header">
                    <div className="header-content">
                        <h2>Transactions</h2>
                        <button className="view-all-button" onClick={handleTransactionsClick}>View All</button>
                    </div>
                </div>
                <Wallet userId={userId} />
            </div>
            <div className="wallet-buttons-container">
                <button className="wallet-send-button">Send Money</button>
                <button className="wallet-add-button">Add Money</button>
            </div>
        </div>
    );
};

export default WalletPage;
