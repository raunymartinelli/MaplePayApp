import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { UPDATE_USER_FIELD_MUTATION, ADD_PROFILE_PICTURE_MUTATION } from '../graphql/mutations';
import { jwtDecode } from "jwt-decode";
import Header from "../components/Header";
import Footer from "../components/Footer";
import placeholderImage from './placeholder.jpeg';

const AccountView = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        let userId;
        if (token) {
            try {
                const decoded = jwtDecode(token);
                userId = decoded.userId;
                const user = {
                    name: "Gojo Satoru",
                    email: "honoredone@gmail.com",
                    address: "251 Shibuya, Tokyo, Japan",
                    phone: "902 123 4567"
                };
                setUserData(user);
            } catch (e) {
                console.error('Error decoding token:', e);
            }
        }

        if (!userId) {
            navigate('/loginpage'); // Validation fail
        }
    }, []);

    const [updateUserField] = useMutation(UPDATE_USER_FIELD_MUTATION);
    const [addProfilePicture] = useMutation(ADD_PROFILE_PICTURE_MUTATION);

    const handleAddPictureClick = (pictureFile) => {
        addProfilePicture({ variables: { _id: userData._id, picture: pictureFile } })
            .then(response => {
                console.log('Profile picture added:', response.data.addProfilePicture);
            })
            .catch(error => {
                console.error('Error adding profile picture:', error);
            });
    };

    const handleEditClick = (field, value) => {
        updateUserField({ variables: { _id: userData._id, field, value } })
            .then(response => {
                console.log('User field updated:', response.data.updateUserField);
            })
            .catch(error => {
                console.error('Error updating user field:', error);
            });
    };

    return (
        <div className="font-inter" style={{ backgroundColor: '' }}>
            <Header />
            <div className="flex flex-col sm:flex-row">
                {/* User Info */}
                <div className="flex-1 sm:w-1/8 bg-white mt-5 border border-gray-300 rounded-lg mx-auto p-4">
                    <div className="container mx-auto px-4 py-8">
                        <h1 className="text-2xl font-bold">User Information</h1>
                        <div className="mt-6">
                            <p className="text-lg">Name: {userData?.name}</p>
                            <p className="text-lg">Email: {userData?.email}</p>
                            <p className="text-lg">Address: {userData?.address}</p>
                            <p className="text-lg">Phone: {userData?.phone}</p>
                        </div>
                    </div>
                </div>
                {/* Profile Picture and Edit */}
                <div className="flex-1 sm:w-1/8 bg-white mt-5 border border-gray-300 rounded-lg mx-auto p-4">
                    <div className="container mx-auto px-4 py-8">
                        <div className="flex flex-col items-center">
                        <img src={placeholderImage} alt="Profile" className="w-32 h-32 object-cover rounded-full" />
                            <button className="rounded-3xl mt-4 p-2 bg-custom-maplered text-white px-4 py-2 rounded hover:bg-red-600" onClick={handleAddPictureClick}>Add Picture</button>
                        </div>
                        <div className="mt-6">
                            <h2 className="text-lg font-bold mb-2">Edit Information</h2>
                            <div className="flex flex-col">
                                <button className="rounded-3xl p-2 bg-custom-maplered text-white px-4 py-2 rounded hover:bg-red-600 mb-2" onClick={() => handleEditClick("name", "New Name")}>Edit Name</button>
                                <button className="rounded-3xl p-2 bg-custom-maplered text-white px-4 py-2 rounded hover:bg-red-600 mb-2" onClick={() => handleEditClick("email", "newemail@example.com")}>Edit Email</button>
                                <button className="rounded-3xl p-2 bg-custom-maplered text-white px-4 py-2 rounded hover:bg-red-600 mb-2" onClick={() => handleEditClick("address", "New Address")}>Edit Address</button>
                                <button className="rounded-3xl p-2 bg-custom-maplered text-white px-4 py-2 rounded hover:bg-red-600 mb-2" onClick={() => handleEditClick("phone", "987 654 3210")}>Edit Phone</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AccountView;
