import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_MONETARY_OPERATIONS } from '../graphql/queries';

const Transactions = ({ userId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(5);

  // Query for monetary operations
  const { data, loading, error } = useQuery(GET_ALL_MONETARY_OPERATIONS, {
    variables: { _id: userId },
    fetchPolicy: 'cache-and-network',
    pollInterval: 10000,
  });

  // Calculate indexes of transactions to display on the current page
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = data?.getAllMonetaryOperations?.slice(indexOfFirstTransaction, indexOfLastTransaction);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p>Loading transactions information...</p>;
  if (error) return <p>An error occurred: {error.message}</p>;

  return (
    <div>
      {currentTransactions && (
        <>
          <table>
            <thead>
              <tr>
                <th>Operation Type</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map(operation => (
                <tr key={operation._id}>
                  <td>{operation.operationType}</td>
                  <td>${operation.amount.toFixed(2)}</td>
                  <td>{new Date(operation.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            {/* Pagination buttons */}
            {data?.getAllMonetaryOperations && (
              <ul>
                {[...Array(Math.ceil(data.getAllMonetaryOperations.length / transactionsPerPage))].map((_, index) => (
                  <li key={index}>
                    <button onClick={() => paginate(index + 1)}>{index + 1}</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Transactions;
