import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_MONETARY_OPERATIONS } from '../graphql/queries';
import Navbar from './Navbar';

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
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {currentTransactions && (
          <>
            <div className="bg-white rounded-xl shadow-md">
              <h2 className="text-lg font-bold mb-4 p-6">Recent Transactions</h2>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Operation Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentTransactions.map(operation => (
                    <tr key={operation._id}>
                      <td className="px-6 py-4 whitespace-nowrap">{operation.operationType}</td>
                      <td className="px-6 py-4 whitespace-nowrap">${operation.amount.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(operation.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              {/* Pagination buttons */}
              {data?.getAllMonetaryOperations && (
                <ul className="flex justify-center space-x-4">
                  {[...Array(Math.ceil(data.getAllMonetaryOperations.length / transactionsPerPage))].map((_, index) => (
                    <li key={index}>
                      <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => paginate(index + 1)}>{index + 1}</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Transactions;
