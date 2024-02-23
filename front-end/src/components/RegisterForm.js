import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../graphql/mutations';

const RegisterForm = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: '',
        currentAddress: '', // Added currentAddress
        gender: '', // Added gender
    });

    const [registerUser, { loading, error }] = useMutation(REGISTER_USER);

    const handleSubmit = (event) => {
        event.preventDefault();
        registerUser({
            variables: {
                name: formState.name,
                email: formState.email,
                password: formState.password,
                currentAddress: formState.currentAddress, // Added currentAddress
                gender: formState.gender, // Added gender
            },
        })
            .then(response => {
                // Handle successful registration
                console.log(response.data.registerUser);
                // Redirect user, store token, etc.
            })
            .catch(err => {
                // Handle registration error
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
    if (error) return <p>Error registering: {error.message}</p>;

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" type="text" placeholder="Name" value={formState.name} onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" value={formState.email} onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" value={formState.password} onChange={handleChange} required />
            <input name="currentAddress" type="text" placeholder="Current Address" value={formState.currentAddress} onChange={handleChange} required />
            <select name="gender" value={formState.gender} onChange={handleChange} required>
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                {/* Add more gender options as needed */}
            </select>
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterForm;
