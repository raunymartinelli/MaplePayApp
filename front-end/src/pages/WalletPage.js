import React from 'react';
import { jwtDecode } from 'jwt-decode';
import Wallet from '../components/Wallet';
import CardCarousel from '../components/CardCarousel';
import Navbar from '../components/Navbar'; // Import NavBar component
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
        navigate('/loginpage'); // Redirect to login page if user is not authenticated
        return null;
    }

    const handleTransactionsClick = () => {
        navigate('/transactions'); // Navigate to Transactions page when button is clicked
    };

    return (
        <div className="wallet-page-container">
            <Navbar /> {/* Add Navbar component */}
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
