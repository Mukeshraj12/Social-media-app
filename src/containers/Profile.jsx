import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackGround from '../assets/img/e03f5843a9e45ac45d45afb62caf7b85.png';
import Arrow from '../assets/img/Vector.svg';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [profilePicture, setProfilePicture] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
  
      // Fetch posts from localStorage
      const allPosts = JSON.parse(localStorage.getItem('posts')) || [];
      
      // Ensure the username is correctly referenced
      const filteredPosts = allPosts.filter((post) => post.userId === userData.id); 
      
      setUserPosts(filteredPosts);
    } else {
      navigate('/login'); // Redirect to login if no user
    }
  }, [navigate]);
  

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        const updatedUser = { ...user, profilePicture: reader.result };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('posts');
    setUser(null);
    navigate('/login');
  };

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="container" id="profile-container">
      <img src={profilePicture || BackGround} alt="Background" className="bg-profile" />
      <div className="profile-details">
        <label htmlFor="profile-upload" className="upload-btn">
          <img
            src={profilePicture || 'https://via.placeholder.com/100'}
            alt="Profile"
            className="profile-img"
          />
        </label>
        <input
          type="file"
          accept="image/*"
          id="profile-upload"
          style={{ display: 'none' }}
          onChange={handleProfilePictureChange}
        />
        <h2>{user.username}</h2>
        <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '15px' }}>{user.bio || 'No bio available.'}</p>
        <Link to="/feed">
          <button className='profile-back like-btn'><img src={Arrow} alt="" /></button>
        </Link>
        <Link to="/editprofile">
          <button className='profile-editbtn'>Edit Profile</button>
        </Link>
      </div>

      <div className="user-posts" style={{ padding: "0 10px" }}>
        <h3>Your Posts</h3>
        {userPosts.length === 0 ? (
          <p>No posts to display.</p>
        ) : (
          <div className="ga" id="gallery">
            {userPosts.map((post) => (
              <div key={post.id} className="gallery-item">
                {post.imageUrl && <img src={post.imageUrl} alt="Post" className="gallery-img" />}
                <p className="gallery-caption">❤️ {post.likes || 0} Likes</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <button onClick={handleLogout} className="logout-btn">LOG OUT</button>
    </div>
  );
};

export default Profile;
