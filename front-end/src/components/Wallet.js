
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_WALLET } from '../graphql/queries';

const Wallet = ({ userId }) => {
    const { data, loading, error } = useQuery(GET_USER_WALLET, {
        variables: { userId },
    });

    if (loading) return <p>Loading wallet information...</p>;
    if (error) return <p>An error occurred: {error.message}</p>;

    return (
        <div>
            <h2>Wallet</h2>
            <p>Balance: ${data.getUserWallet.balance.toFixed(2)}</p>
            <h3>Transactions</h3>
            <ul>
                {data.getUserWallet.transactions.map((transaction) => (
                    <li key={transaction._id}>
                        {transaction.operationType} of ${transaction.amount.toFixed(2)} on {new Date(transaction.date).toLocaleDateString()} - {transaction.message}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Wallet;
