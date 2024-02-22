
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations';
import { useHistory } from 'react-router-dom'; // If you're using React Router for navigation

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginUser, { loading, error }] = useMutation(LOGIN_USER);
    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await loginUser({ variables: { email, password } });
            localStorage.setItem('token', data.loginUser.token); // Adjust according to your schema
            history.push('/wallet'); // Redirect to the wallet page after login
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
