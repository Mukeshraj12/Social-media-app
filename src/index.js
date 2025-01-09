import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Login from './components/Login';
import CreatePost from './containers/CreatePost';
import EditProfile from './containers/EditProfile';
import Feeds from './containers/Feed';
import EditPost from './components/EditPost';
import Profile from './containers/Profile';
import Share from './components/Share';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path='/feed' element={<Feeds/>} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/editpost/:postId" element={<EditPost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/share' element={<Share/>}/>
      </Routes>
    </Router>
    <App/>
  </React.StrictMode>
);


