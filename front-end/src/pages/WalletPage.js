import React from 'react';
import { jwtDecode } from 'jwt-decode';
import Wallet from '../components/Wallet';
import CardCarousel from '../components/CardCarousel';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'; // Import Header instead of Navbar
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
        navigate('/LoginPage'); // Redirect to login page if user is not authenticated
        return null;
    }

    const handleTransactionsClick = () => {
        navigate('/TransactionsPage'); // Navigate to Transactions page when button is clicked
    };

    return (
        <div className="wallet-page-container">
            <Header /> {/* Render Header component at the top */}
            <div className="content-container">
                <div className="wallet-container">
                    <div className="wallet-content">
                        <CardCarousel />
                        <Wallet userId={userId} />
                        <div className="wallet-buttons-container">
                            <button className="wallet-button mt-6 p-2 w-1/2 bg-custom-maplered hover:bg-red-500 transition duration-300 text-white font-bold rounded-2xl" onClick={() => navigate('/SendMoney')}>Transfer Money</button>
                            <button className="wallet-button mt-6 p-2 w-1/2 bg-custom-maplered hover:bg-red-500 transition duration-300 text-white font-bold rounded-2xl" onClick={() => navigate('/AddMoney')}>Add Money</button>
                        </div>
                    </div>
                </div>
                {/* <div className="transactions-container">
                    <div className="transactions-header">
                        <div className="">
                            <h1>Transactions</h1>
                            <button className="view-all-button" onClick={handleTransactionsClick}>View All</button>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default WalletPage;
