import React from 'react';
import { jwtDecode } from 'jwt-decode';
import Wallet from '../components/Wallet';

const WalletPage = () => {
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
        return <p>Please login to view your wallet.</p>;
    }

    return (
        <div>
            <h1>Wallet</h1>
            <Wallet userId={userId} />
        </div>
    );
};

export default WalletPage;
