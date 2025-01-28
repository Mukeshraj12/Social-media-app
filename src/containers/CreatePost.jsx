import React, { useState, } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Back from '../assets/img/HiArrowSmLeft.svg';
import File from '../assets/img/folder-open-svgrepo-com 1.svg'

const CreatePost = () => {
  const [postContent, setPostContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [postImage, setPostImage] = useState('');

  const navigate = useNavigate(); // React Router hook for navigation




  const handleCreatePost = () => {
    // Retrieve existing posts from localStorage
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];

    // Generate a unique ID for the new post
    const newPostId = storedPosts.length > 0 ? storedPosts[storedPosts.length - 1].id + 1 : 1;

    // Create the new post object
    const newPost = {
      id: newPostId,
      content: postContent,
      imageUrl: postImage,
      createdAt: new Date().toISOString(), // Store timestamp in ISO format
    };

    // Add the new post to the posts array and save back to localStorage
    const updatedPosts = [...storedPosts, newPost];
    localStorage.setItem('posts', JSON.stringify(updatedPosts));

    // Reset the form fields
    setPostContent('');
    setPostImage('');

    // Show success message and redirect to feed page
    // alert('Post created successfully!');
    navigate('/feed'); // Navigate to the feed page


  };

  return (
    <div className='new-post'>

      <div className='newpost-div'><Link to="/feed"><img src={Back} alt=""/></Link>New Post</div>

      <textarea
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        placeholder="What's on your mind?"
        className='post-textarea'
      />
      <label htmlFor="file" style={{ cursor: "pointer" }}>
        <i>
          <img src={File} alt="Upload Icon" />
        </i>
        Choose the File
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            setPostImage(URL.createObjectURL(file));
            setFileName(file ? file.name : "No file chosen");
          }}
          accept="image/*"
          name="Choose the File"
          id="file"
          style={{ display: "none" }}
        />

      </label>
      <span style={{ color: "blue", marginLeft: "10px", Width: "400px",overflowWrap:"break-word" }}>
        <em>{fileName || "No file chosen"}</em>
      </span>



      <br />
      <button
        disabled={!fileName}
        className="newpost-button"
        onClick={handleCreatePost}
        style={{ cursor: !fileName ? "not-allowed" : "pointer", zIndex: 10 }}
      // Track mouse enter
      >
        {!fileName && (
          <span
            style={{
              color: 'red',
              position: 'absolute',
              top: '-30px', // Adjust based on your layout
              left: '10px', // Adjust position to show near button
              fontSize: '12px',
              visibility: !fileName ? 'visible' : 'hidden', // Initially hide error message
              zIndex: "20"
            }}
            className="error-message"
          >
            *No file selected
          </span>
        )}
        POST</button>

    </div>
  );
};

export default CreatePost;
