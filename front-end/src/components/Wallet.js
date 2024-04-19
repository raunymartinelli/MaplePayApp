import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_BY_ID, GET_ALL_MONETARY_OPERATIONS } from '../graphql/queries';
import './css/wallet.css';

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
        <div className='wallet-container'>
            <div className="flex flex-col sm:flex-row">
                {/* Left Column */}
                <div className="flex-1 sm:w-1/2 p-4">
                    {/* Remove CardCarousel from here */}
                    {userData && userData.getUserById && (
                        <p className="wallet-balance text-lg">Balance: ${userData.getUserById.amount.toFixed(2)}</p>
                    )}
                </div>
                {/* Right Column */}
                <div className="flex-1 sm:w-1/2 p-4">
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
            </div>
        </div>
    );
};

export default Wallet;
