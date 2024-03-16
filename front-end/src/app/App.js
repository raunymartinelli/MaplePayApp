import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import WalletPage from '../pages/WalletPage';
import HomePage from '../pages/HomePage';
import TransactionsPage from '../pages/TransactionsPage'

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/wallet" element={<WalletPage />} />
                    <Route path="/transactions" element={<TransactionsPage />} />
                    <Route path="/" element={<HomePage />} /> {/* Default route */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
