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
import Insights from '../pages/Insights';
import AccountView from '../pages/AccountView';
const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/Insights" element={<Insights />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/wallet" element={<WalletPage />} />
                    <Route path="/transactions" element={<TransactionsPage />} />
                    <Route path="home" element={<HomePage />} />
                    <Route path="/sendMoney" element={<SendMoney/>}/>
                    <Route path="/request" element={<Request/>}/>
                    <Route path="/" element={<HomePage />} /> {/* Default route */}
                    <Route path="/AccountView" element={<AccountView/>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
