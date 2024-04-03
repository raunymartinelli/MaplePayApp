import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_MONETARY_OPERATIONS } from '../graphql/queries'; 
import { Bar } from 'react-chartjs-2';

const Insights = () => {
    const [monthlyTransactions, setMonthlyTransactions] = useState({});

    const { loading, error, data } = useQuery(GET_ALL_MONETARY_OPERATIONS);

    useEffect(() => {
        if (data && data.getAllMonetaryOperations) {
            const transactions = data.getAllMonetaryOperations;
            const monthlyTotals = {};

            transactions.forEach(operation => {
                const date = new Date(operation.date);
                const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;

                if (!monthlyTotals[monthYear]) {
                    monthlyTotals[monthYear] = 0;
                }

                monthlyTotals[monthYear] += operation.amount;
            });

            setMonthlyTransactions(monthlyTotals);
        }
    }, [data]);

    const chartData = {
        labels: Object.keys(monthlyTransactions),
        datasets: [
            {
                label: 'Total Transactions',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: Object.values(monthlyTransactions),
            },
        ],
    };

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <h2>Monthly Transactions</h2>
            <div>
                <Bar
                    data={chartData}
                    options={{
                        title: {
                            display: true,
                            text: 'Total Transactions Per Month',
                            fontSize: 20,
                        },
                        legend: {
                            display: true,
                            position: 'right',
                        },
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        beginAtZero: true,
                                    },
                                },
                            ],
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default Insights;
