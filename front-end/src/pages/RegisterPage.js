import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../graphql/mutations';
import './css/RegisterPage.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        currentAddress: '',
        gender: '',
    });
    const [registerSuccess, setRegisterSuccess] = useState(false); // State to track registration success
    const [registerUser, { loading, error }] = useMutation(REGISTER_USER, {
        onCompleted: () => {
            setRegisterSuccess(true); // Set success to true when registration is complete
        }
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        setRegisterSuccess(false); // Reset success state on new submission

        try {
            const { name, email, password, currentAddress, gender } = formData;
            await registerUser({
                variables: {
                    name,
                    email,
                    password,
                    currentAddress,
                    gender,
                },
            });
            // Success handled by onCompleted callback
        } catch (err) {
            console.error('Registration error', err);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="container">
            <h1 style={{color: "#D24545"}}>Create an account</h1>
            <p style={{fontFamily: 'Inter, sans-serif', textAlign: 'center', color: "#D24545"}}>Create an account or <Link to='/Login' style={{color: "#D24545"}}>login</Link></p>
            <form onSubmit={handleSubmit}>
                <input
                    className="input-field"
                    name="name"
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    className="input-field"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    className="input-field"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <input
                    className="input-field"
                    name="currentAddress"
                    type="text"
                    placeholder="Current Address"
                    value={formData.currentAddress}
                    onChange={handleChange}
                    required
                />
                <select
                    className="input-field"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    {/* Add more gender options as necessary */}
                </select>
                <button className="submit-button" type="submit" disabled={loading}>
                    Register
                </button>
                <a href="#">Forgot password?</a>
            </form>
            {registerSuccess && <p className="success-message">Registration successful!</p>} {/* Display success message */}
            {error && <p className="error-message">Error registering: {error.message}</p>}
        </div>
    );
};

export default RegisterPage;
