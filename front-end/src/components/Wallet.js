import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_BY_ID, GET_ALL_MONETARY_OPERATIONS } from '../graphql/queries';

const Wallet = ({ userId }) => {
    // Query for user information
    const { data: userData, loading: userLoading, error: userError } = useQuery(GET_USER_BY_ID, {
        variables: { _id: userId },
        fetchPolicy: 'cache-and-network', // Ensure that the query is always executed
        pollInterval: 10000, // Refresh the query every 10 seconds
    });

    // Query for monetary operations (limit to last 3 transactions)
    const { data: operationsData, loading: operationsLoading, error: operationsError } = useQuery(GET_ALL_MONETARY_OPERATIONS, {
        variables: { _id: userId }, 
        fetchPolicy: 'cache-and-network', 
        pollInterval: 10000, 
    });

    if (userLoading || operationsLoading) return <p>Loading wallet information...</p>;
    if (userError || operationsError) return <p>An error occurred: {userError?.message || operationsError?.message}</p>;

    return (
        <div className="wallet-container">
            {userData && userData.getUserById && (
                <p className="wallet-balance">Balance: ${userData.getUserById.amount.toFixed(2)}</p>
            )}
            {operationsData && operationsData.getAllMonetaryOperations && (
                 <table className="wallet-table">
                    <thead>
                        <tr>
                            <th>Operation Type</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {operationsData.getAllMonetaryOperations.slice(0, 3).map(operation => (
                            <tr key={operation._id}>
                                <td>{operation.operationType}</td>
                                <td>${operation.amount.toFixed(2)}</td>
                                <td>{new Date(operation.date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Wallet;
