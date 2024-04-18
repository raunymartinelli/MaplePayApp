import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import WalletPage from '../pages/WalletPage';
import HomePage from '../pages/HomePage';
import TransactionsPage from '../pages/TransactionsPage'
import './app.css';
import SendMoney from '../components/SendMoney';
import Request from '../components/request';
const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/wallet" element={<WalletPage />} />
                    <Route path="/transactions" element={<TransactionsPage />} />
                    <Route path="home" element={<HomePage />} />
                    <Route path="/sendMoney" element={<SendMoney/>}/>
                    <Route path="/request" element={<Request/>}/>
                    <Route path="/" element={<HomePage />} /> {/* Default route */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
