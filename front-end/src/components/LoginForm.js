
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await loginUser({
                variables: {
                    email: email,
                    password: password,
                },
            });
            // Save the token to local storage or context for further requests
            localStorage.setItem('token', data.loginUser.token);
            // Redirect user or do something with the login data
            console.log('Login successful:', data.loginUser.user);
        } catch (e) {
            // Handle login error
            console.error('Login error', e);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error during login: {error.message}</p>;

    return (
        <div className="login-container">
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {data && data.loginUser && (
                <p>Welcome, {data.loginUser.user.name}!</p>
            )}
        </div>
    );
};

export default LoginPage;
