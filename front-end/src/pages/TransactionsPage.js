import React from 'react';
import { jwtDecode } from 'jwt-decode';
import Transactions from '../components/Transactions';
import './css/TransactionsPage.css';
import Navbar from './Navbar.js';


const TransactionsPage = () => {
    const token = localStorage.getItem('token');
    let userId;

    <div>
        <h1>Transactions</h1>
    </div>

    if (token) {
        try {
            const decoded = jwtDecode(token);
            userId = decoded.userId;
        } catch (e) {
            console.error('Error decoding token:', e);
        }
    }

    if (!userId) {
        return <p>Please login to view your transactions.</p>;
    }

    return (
        <div>
            <h1>Transactions</h1>
            { <Transactions userId={userId} /> }
        </div>
    );
};

export default TransactionsPage;
