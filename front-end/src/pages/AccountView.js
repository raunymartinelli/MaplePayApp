import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { UPDATE_USER_FIELD_MUTATION, ADD_PROFILE_PICTURE_MUTATION } from '../graphql/mutations'; // Import mutations from GraphQL mutations file
import { jwtDecode } from "jwt-decode";
import Navbar from '../components/Navbar';

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
                // Handle error
                console.error('Error adding profile picture:', error);
            });
    };

    const handleEditClick = (field, value) => {
        updateUserField({ variables: { _id: userData._id, field, value } })
            .then(response => {
                console.log('User field updated:', response.data.updateUserField);
            })
            .catch(error => {
                // Handle error
                console.error('Error updating user field:', error);
            });
    };

    return (
        <div className="account-view-container">
            <Navbar />
            <div className="profile-picture-container">
                {/* Display profile picture */}
                <button className="add-picture-button" onClick={handleAddPictureClick}>Add Picture</button>
            </div>
            <div className="user-info-container">
                <div className="user-info-item">
                    <div className="label">Name</div>
                    <div className="text">{userData?.name}</div>
                    <div className="edit" onClick={() => handleEditClick("name", "New Name")}></div>
                </div>
                <div className="user-info-item">
                    <div className="label">Email</div>
                    <div className="text">{userData?.email}</div>
                    <div className="edit" onClick={() => handleEditClick("email", "newemail@example.com")}></div>
                </div>
                <div className="user-info-item">
                    <div className="label">Address</div>
                    <div className="text">{userData?.address}</div>
                    <div className="edit" onClick={() => handleEditClick("address", "New Address")}></div>
                </div>
                <div className="user-info-item">
                    <div className="label">Phone #</div>
                    <div className="text">{userData?.phone}</div>
                    <div className="edit" onClick={() => handleEditClick("phone", "987 654 3210")}></div>
                </div>
            </div>
        </div>
    );
};

export default AccountView;
