
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_FUNDS } from '../graphql/mutations'; // Make sure the mutation is correctly defined in your mutations.js file

const DepositForm = () => {
    const [amount, setAmount] = useState('');
    const [addFunds, { data, loading, error }] = useMutation(ADD_FUNDS);

    const handleDeposit = (event) => {
        event.preventDefault();
        const amountToDeposit = parseFloat(amount); // Ensure the amount is a float
        if (isNaN(amountToDeposit) || amountToDeposit <= 0) {
            alert('Please enter a valid amount to deposit.');
            return;
        }

        addFunds({ variables: { amount: amountToDeposit } })
            .then(response => {
                // Success! You may want to clear the form or give user feedback
                console.log(response.data);
                setAmount(''); // Clear the amount
            })
            .catch(err => {
                // Handle errors here, such as displaying a notification to the user
                console.error('Error during deposit:', err);
            });
    };

    return (
        <form onSubmit={handleDeposit}>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount to deposit"
            />
            <button type="submit" disabled={loading}>
                Deposit
            </button>
            {loading && <p>Processing deposit...</p>}
            {error && <p>Error during deposit: {error.message}</p>}
            {data && <p>Deposit successful!</p>}
        </form>
    );
};

export default DepositForm;
