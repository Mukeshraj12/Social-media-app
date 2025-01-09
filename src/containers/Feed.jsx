import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import More from '../assets/img/more.png';
import Like from '../assets/img/HiHeart.png';
import ShareIcon from '../assets/img/navigation-2.png';
import Plus from '../assets/img/BsPlusLg.svg';

// Helper function to extract the dominant color from an image
const getDominantColor = (imageSrc, callback) => {
  if (!imageSrc) return;

  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = imageSrc;

  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    const r = data[0];
    const g = data[1];
    const b = data[2];
    const opacity = 0.1;

    callback(`rgba(${r}, ${g}, ${b}, ${opacity})`);
  };
};

const Feeds = ({ imageSrc }) => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [activeMenuPostId, setActiveMenuPostId] = useState(null);
  const [postBackgroundColors, setPostBackgroundColors] = useState({});
  const [buttonColor, setButtonColor] = useState("rgba(0, 0, 0, 0.3)");
  const [isShareOpen, setIsShareOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) setUser(userData);

    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(storedPosts);

    storedPosts.forEach((post) => {
      if (post.imageUrl) {
        getDominantColor(post.imageUrl, (color) => {
          setPostBackgroundColors((prevColors) => ({
            ...prevColors,
            [post.id]: color,
          }));
        });
      }
    });
  }, []);

  useEffect(() => {
    if (imageSrc) {
      getDominantColor(imageSrc, (color) => {
        setButtonColor(color);
      });
    }
  }, [imageSrc]);

  const handleToggleMenu = (postId) => {
    setActiveMenuPostId((prev) => (prev === postId ? null : postId));
  };

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
  };

  const handleLikePost = (postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, likes: (post.likes || 0) + 1 } : post
    );
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
  };

  const handleCloseShare = () => {
    setIsShareOpen(false);
  };

  return (
    <div className="feeds">
      {user ? (
        <div className="profile-header">
          <Link to="/profile">
            <img
              src={user.profilePicture || '/default-profile.png'}
              alt="User Profile"
              style={{ width: '50px', height: '50px', borderRadius: '50%' }}
            />
          </Link>
          <p>Welcome Back, <span>{user.username}</span></p>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}

      <div className="buttons">
        <Link to="/createpost">
          <button className="post-btn">
            <img src={Plus} alt="Create Post" style={{ width: '20px' }} />
          </button>
        </Link>
      </div>

      <h1>Feeds</h1>

      {posts.length === 0 ? (
        <p>Add your First Post!</p>
      ) : (
        posts
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((post) => (
            <div
              key={post.id}
              className="post"
              style={{
                marginBottom: '20px',
                backgroundColor: postBackgroundColors[post.id] || '#ffffff',
                padding: '20px',
                borderRadius: '20px',
              }}
            >
              <div className="post-header">
                <img
                  src={user.profilePicture || '/default-profile.png'}
                  alt="User"
                  style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                />
                <div>
                  <h4>{user.username}</h4>
                  <p>{new Date(post.createdAt).toLocaleString()}</p>
                </div>
                <button onClick={() => handleToggleMenu(post.id)} className='like-btn'>
                  <img src={More} alt="Options" style={{ width: '20px' }} />
                </button>
                {activeMenuPostId === post.id && (
                  <div className="menu">
                    <button onClick={() => navigate(`/editpost/${post.id}`)}>Edit</button>
                    <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                  </div>
                )}
              </div>
              <p>{post.content}</p>
              {post.imageUrl && (
                <img
                  src={post.imageUrl || '/default-image.png'}
                  alt="Post Content"
                  style={{ width: '100%', borderRadius: '10px' }}
                />
              )}
              <div className="post-actions">
                <button onClick={() => handleLikePost(post.id)} className='like-btn'>
                  <img src={Like} alt="Like" style={{ width: '20px' }} /> {post.likes || 0}
                </button>
                <button onClick={() => setIsShareOpen(true)} style={{background:postBackgroundColors[post.id]}} className=''>
                  <img src={ShareIcon} alt="Share" />
                  Share
                </button>
              </div>
            </div>
          ))
      )}

      {isShareOpen && (
        <div className="share-modal">
          <button onClick={handleCloseShare}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Feeds;
