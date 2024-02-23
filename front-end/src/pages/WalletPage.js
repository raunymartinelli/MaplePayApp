// src/pages/WalletPage.js
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_WALLET } from '../graphql/queries';
import Wallet from '../components/Wallet'; // Assuming you have this component

const WalletPage = () => {
    // Assuming you have a way to get the current user's ID, e.g., from the context or local storage

    //commented out to work on the UI

    // const userId = "CurrentUser's ID here";
    // const { loading, error, data } = useQuery(GET_USER_WALLET, {
    //     variables: { userId },
    // });

    // if (loading) return <p>Loading wallet...</p>;
    // if (error) return <p>Error loading wallet: {error.message}</p>;

    return (
        <div>
            <h1>Wallet</h1>
            {/* {data && <Wallet walletData={data.getUserWallet} />} */} 
        </div>
    );
};

export default WalletPage;
