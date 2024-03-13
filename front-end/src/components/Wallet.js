import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../graphql/queries';

const Wallet = ({ userId }) => {
    const { data, loading, error } = useQuery(GET_USER_BY_ID, {
        variables: { _id: userId }, 
    });

    if (loading) return <p>Loading wallet information...</p>;
    if (error) return <p>An error occurred: {error.message}</p>;

    return (
        <div>
            <h2>Wallet</h2>
            {data && data.getUserById && (
                <>
                    <p>Balance: ${data.getUserById.amount.toFixed(2)}</p>
                    <h3>Transactions</h3>
                    <ul>
                        {data.getUserById.transactions.map((transaction) => (
                            <li key={transaction._id}>
                                {transaction.operationType} of ${transaction.amount.toFixed(2)} on {new Date(transaction.date).toLocaleDateString()} - {transaction.message}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default Wallet;
