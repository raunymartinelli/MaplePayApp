import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom'; // Updated import for React Router v6

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginUser, { loading, error }] = useMutation(LOGIN_USER);
    const navigate = useNavigate(); // Updated to useNavigate for React Router v6

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await loginUser({ variables: { email, password } });
            localStorage.setItem('token', data.loginUser.token); // Adjust according to your schema
            navigate('/wallet'); // Updated to use navigate for redirection in React Router v6
        } catch (err) {
            console.error('Login error', err);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
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
            </form>
            {error && <p>Error logging in: {error.message}</p>}
        </div>
    );
};

export default LoginPage;
