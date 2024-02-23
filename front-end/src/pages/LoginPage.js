import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom'; 
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './css/LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginUser, { loading, error }] = useMutation(LOGIN_USER);
    const navigate = useNavigate(); 
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await loginUser({ variables: { email, password } });
            localStorage.setItem('token', data.loginUser.token); 
            navigate('/wallet'); 
        } catch (err) {
            console.error('Login error', err);
        }
    };

    return (
        <div className="login-container">
        <h1 style={{fontFamily: 'Inter, sans-serif', textAlign: 'center', color: "#D24545"}}>Welcome back!</h1>
        <p style={{fontFamily: 'Inter, sans-serif', textAlign: 'center', color: "#D24545"}}>Login below or <Link to='/Register' style={{color: "#D24545"}} >create an account</Link></p>
        <form onSubmit={handleSubmit} className="login-form">
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit" disabled={loading}>Login</button>
            <a href="#">Forgot password?</a>
        </form>
        {error && <p className="error-message">Error logging in: {error.message}</p>}
    </div>
    );
};

export default LoginPage;
