import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditPost = () => {
  const { postId } = useParams(); // Get the post ID from the route parameter
  const navigate = useNavigate();
  const [postContent, setPostContent] = useState('');
  const [postImage, setPostImage] = useState('');
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Retrieve posts from localStorage
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const currentPost = storedPosts.find((post) => post.id === parseInt(postId));
    if (currentPost) {
      setPost(currentPost);
      setPostContent(currentPost.content);
      setPostImage(currentPost.imageUrl);
    }
  }, [postId]);

  const handleSaveChanges = () => {
    if (!post) return;

    // Retrieve posts from localStorage
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];

    // Update the post with new content and image
    const updatedPosts = storedPosts.map((p) =>
      p.id === post.id ? { ...p, content: postContent, imageUrl: postImage } : p
    );

    // Save updated posts back to localStorage
    localStorage.setItem('posts', JSON.stringify(updatedPosts));

    // Redirect to the feed page
    navigate('/feed');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostImage(URL.createObjectURL(file)); // Preview the selected image
    }
  };

  return (
    <div className='container'>
      <h2>Edit Post</h2>
      {post ? (
        <>
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Edit your post content..."
            style={{ width: '100%', height: '100px', marginBottom: '10px' }}
          />
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            style={{ marginBottom: '10px' }}
          />
          {postImage && (
            <img
              src={postImage}
              alt="Selected"
              style={{ Width: '300px', height: '300px', marginBottom: '10px' }}
            />
          )}
          <br />
          <button
            onClick={handleSaveChanges}
            style={{
              backgroundColor: 'green',
              color: 'white',
              padding: '10px 15px',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Save Changes
          </button>
        </>
      ) : (
        <p>Loading post...</p>
      )}
    </div>
  );
};

export default EditPost;
