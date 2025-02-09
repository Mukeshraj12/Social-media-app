import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackGround from '../assets/img/e03f5843a9e45ac45d45afb62caf7b85.png';
import Arrow from '../assets/img/Vector.svg';

const EditProfile = () => {
    const [user, setUser] = useState(null); // User details
    const [profilePicture, setProfilePicture] = useState(''); // Profile picture preview
    const [username, setUsername] = useState(''); // Editable username
    const [bio, setBio] = useState(''); // Editable bio

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user data from localStorage
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setUser(userData);
            setProfilePicture(userData.profilePicture || '');
            setUsername(userData.username || '');
            setBio(userData.bio || '');
        } else {
            // If no user is logged in, redirect to login
            navigate('/login');
        }
    }, [navigate]);

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setProfilePicture(previewUrl);
        }
    };

    const handleSaveChanges = () => {
        if (!username.trim()) {
            alert('Username cannot be empty.');
            return;
        }

        // Update user details in localStorage
        const updatedUser = { ...user, profilePicture, username, bio };
        localStorage.setItem('user', JSON.stringify(updatedUser));

        // Show a success message and navigate back to the profile page
        navigate('/profile');
    };

    return (
        <div className="container" id="profile-container">
            {/* Background Section */}
            <img src={BackGround} className="bg-profile" alt="Background" />
            <p className='newpost-p'><Link to="/profile"><img src={Arrow} alt="" /></Link>Edit Profile</p>
            {/* Editable Profile Details */}
            <div className="edit-profile-details">
                <label htmlFor="profilePicture" className="edit-profile-picture-label">
                    <img
                        src={profilePicture || 'https://via.placeholder.com/100'}
                        alt="Profile"
                        className="profile-img"
                    />
                    <input
                        type="file"
                        id="profilePicture"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleProfilePictureChange}
                    />
                </label>

                <label>
                    <p style={{ color: 'grey' }}>Name</p>
                    <br />
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="edit-profile-input"
                    />
                </label>
                <br />
                <br />
                <label>
                    <p style={{ color: 'grey' }}>Bio</p>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="edit-profile-textarea"
                        placeholder=""
                    />
                </label>

                {/* Buttons */}
                <button onClick={handleSaveChanges} className="newpost-button" >
                    SAVE
                </button>

            </div>
        </div>
    );
};

export default EditProfile;
