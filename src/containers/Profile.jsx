import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackGround from '../assets/img/e03f5843a9e45ac45d45afb62caf7b85.png';
import Arrow from '../assets/img/Vector.svg';

const Profile = () => {
  const [user, setUser] = useState(null); // User details
  const [userPosts, setUserPosts] = useState([]); // User's posts
  const [profilePicture, setProfilePicture] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from localStorage
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
    } else {
      // If no user is logged in, redirect to login
      navigate('/login');
    }

    // Fetch posts created by the user
    const allPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const filteredPosts = allPosts.filter((post) => post.username === userData?.username);
    setUserPosts(filteredPosts);
  }, [navigate]);

  if (!user) {
    return <p>Loading profile...</p>;
  }

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file)); // Set the new profile picture preview
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('posts');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="container" >
      {/* Profile Section */}
      <img
        src={profilePicture || BackGround}
        alt="Background or Profile"
        className="bg-profile"
        onChange={handleProfilePictureChange}
      />

      <div className="profile-details">
        <img
          src={user.profilePicture || 'https://via.placeholder.com/100'}
          alt="Profile"
          className='profile-img'
        />
        <h2>{user.username}</h2>
        <br />
        <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '15px' }}>{user.bio || 'No bio available.'}</p>
        <br />
        <Link to="/feed" style={{}}>
          <button className='profile-back like-btn'><img src={Arrow} alt="" /></button>
        </Link>
        <Link to="/editprofile" style={{}}>
          <button style={{}} className='profile-editbtn'>Edit Profile</button>
        </Link>

      </div>

      {/* User Posts */}
      <div className="user-posts" style={{ padding: "0 10px" }}>
        <h3>Your Posts</h3>
        {userPosts.length === 0 ? (
          <p>No posts to display.</p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '20px',
              marginTop: '20px',
            }}
          >
            {userPosts.map((post) => (
              <div
                key={post.id}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  textAlign: 'center',
                  padding: '10px',
                  background: '#f9f9f9',
                }}
              >
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt="Post"
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                )}
                <p style={{ margin: '10px 0', fontWeight: 'bold' }}>{post.content}</p>
                <p style={{ color: '#D95B7F', fontSize: '18px' }}>
                  ❤️ {post.likes || 0} Likes
                </p>
                <p style={{ fontStyle: 'italic', color: '#555' }}>
                  Posted on: {new Date(post.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        onClick={handleLogout}
        className="logout-btn"
      >
        LOG OUT
      </button>
    </div>
  );
};

export default Profile;
