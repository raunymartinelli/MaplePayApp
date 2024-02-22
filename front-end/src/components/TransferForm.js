
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { TRANSFER_FUNDS } from '../graphql/mutations'; // Define this mutation in your mutations.js file

const TransferForm = () => {
    const [recipientId, setRecipientId] = useState('');
    const [amount, setAmount] = useState('');
    const [transferFunds, { data, loading, error }] = useMutation(TRANSFER_FUNDS);

    const handleTransfer = async (event) => {
        event.preventDefault();

        const amountToTransfer = parseFloat(amount);
        if (isNaN(amountToTransfer) || amountToTransfer <= 0) {
            alert('Please enter a valid amount to transfer.');
            return;
        }

        // Assuming recipientId is the ID of the user to whom funds are being transferred
        transferFunds({
            variables: {
                toUserId: recipientId,
                amount: amountToTransfer,
            },
        })
            .then(response => {
                console.log(response.data);
                setRecipientId('');
                setAmount('');
            })
            .catch(err => {
                console.error('Error during transfer:', err);
            });
    };

    return (
        <form onSubmit={handleTransfer}>
            <input
                type="text"
                value={recipientId}
                onChange={(e) => setRecipientId(e.target.value)}
                placeholder="Recipient ID"
            />
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount to transfer"
            />
            <button type="submit" disabled={loading}>
                Transfer
            </button>
            {loading && <p>Processing transfer...</p>}
            {error && <p>Error during transfer: {error.message}</p>}
            {data && <p>Transfer successful!</p>}
        </form>
    );
};

export default TransferForm;
