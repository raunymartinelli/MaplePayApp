
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { WITHDRAW_FUNDS } from '../graphql/mutations'; // Ensure you have this mutation set up in your GraphQL schema

const WithdrawForm = () => {
    const [amount, setAmount] = useState('');
    const [withdrawFunds, { data, loading, error }] = useMutation(WITHDRAW_FUNDS);

    const handleWithdrawal = async (event) => {
        event.preventDefault();
        // Input validation
        const amountToWithdraw = parseFloat(amount);
        if (isNaN(amountToWithdraw) || amountToWithdraw <= 0) {
            alert('Please enter a valid amount to withdraw.');
            return;
        }

        try {
            const response = await withdrawFunds({
                variables: {
                    // Replace 'YourUserId' with the actual user ID from context or state management
                    _id: "YourUserId",
                    amount: amountToWithdraw,
                },
            });
            // Process the response here
            console.log(response.data);
            setAmount(''); // Reset the amount after successful withdrawal
        } catch (err) {
            // Handle the error case
            console.error('Error during withdrawal:', err);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error while making a withdrawal: {error.message}</p>;

    return (
        <div>
            <h3>Withdraw Funds</h3>
            <form onSubmit={handleWithdrawal}>
                <label htmlFor="amount">Amount:</label>
                <input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount to withdraw"
                />
                <button type="submit">Withdraw</button>
            </form>
        </div>
    );
};

export default WithdrawForm;
