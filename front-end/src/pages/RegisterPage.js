
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../graphql/mutations';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registerUser, { loading, error }] = useMutation(REGISTER_USER);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await registerUser({ variables: { email, password } });
            // Handle registration success (e.g., redirect to login page)
        } catch (err) {
            console.error('Registration error', err);
        }
    };

    return (
        <div>
            <h1>Register</h1>
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
                <button type="submit" disabled={loading}>Register</button>
            </form>
            {error && <p>Error registering: {error.message}</p>}
        </div>
    );
};

export default RegisterPage;
