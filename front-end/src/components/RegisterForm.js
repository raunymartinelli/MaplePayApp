
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../graphql/mutations';

const RegisterForm = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER);

    const handleSubmit = (event) => {
        event.preventDefault();
        registerUser({
            variables: {
                name: formState.name,
                email: formState.email,
                password: formState.password,
            },
        })
            .then(response => {
                // Handle response, store the token, redirect user, etc.
                console.log(response.data.registerUser);
            })
            .catch(err => {
                // Handle registration error, display message, etc.
                console.error('Registration error', err);
            });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>An error occurred during registration: {error.message}</p>;

    // Replace the JSX below with your form structure
    return (
        <form onSubmit={handleSubmit}>
            <input
                name="name"
                type="text"
                placeholder="Name"
                value={formState.name}
                onChange={handleChange}
                required
            />
            <input
                name="email"
                type="email"
                placeholder="Email"
                value={formState.email}
                onChange={handleChange}
                required
            />
            <input
                name="password"
                type="password"
                placeholder="Password"
                value={formState.password}
                onChange={handleChange}
                required
            />
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterForm;
