import React, { useEffect, useState } from "react";
import { useQuery } from '@apollo/client';
import { GET_USER_BALANCE_QUERY } from '../graphql/queries'; 
import Navbar from '../components/Navbar';
import CardCarousel from '../components/CardCarousel';

const ManageCards = () => {
    const { loading, error, data } = useQuery(GET_USER_BALANCE_QUERY); 

    const [selectedCard, setSelectedCard] = useState("Card 1"); //Default Card

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="manage-cards-container">
            <Navbar /> 
            <div className="balance-container">
                <div className="profile-picture"></div>
                <div className="balance-text">MaplePay Balance</div>
                <div className="balance-amount">{data.getUserBalance}</div>
            </div>
            <div className="bank-accounts-and-cards-container">
                <div className="section-header">
                    <span>Bank accounts and Cards</span>
                    {/* Add and Edit Cards */}
                    <button className="add-edit-card-button">+</button>
                </div>
                <CardCarousel />
            </div>
            <div className="preferences-container">
                <div className="section-header">Preferences</div>
                <div className="preferences-item">Online Purchases</div>
                <div className="preferences-item">{selectedCard}</div>
                <button className="change-card-button" onClick={() => setSelectedCard("Card 2")}>{">"}</button>
            </div>
        </div>
    );
};

export default ManageCards;
