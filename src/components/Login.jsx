import React from 'react';
import Img1 from '../assets/img/1.png';
import Img2 from '../assets/img/2.png';
import Img3 from '../assets/img/3.png';
import Img4 from '../assets/img/4.png';
import Img5 from '../assets/img/5.png';
import Img6 from '../assets/img/6.png';
import Img7 from '../assets/img/7.png';
import Img8 from '../assets/img/8.png';
import Img9 from '../assets/img/9.png';
import CamIcon from '../assets/img/cam-icon.png';
import Gicon from '../assets/img/Google icon.png';
import '../assets/Style.css';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './FireBase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  let data = [
    { id: 1, imgSrc: Img1 },
    { id: 2, imgSrc: Img2 },
    { id: 3, imgSrc: Img3 },
    { id: 4, imgSrc: Img2 },
    { id: 5, imgSrc: Img4 },
    { id: 6, imgSrc: Img5 },
    { id: 7, imgSrc: Img7 },
    { id: 8, imgSrc: Img8 },
    { id: 9, imgSrc: Img9 },
    { id: 10, imgSrc: Img2 },
    { id: 11, imgSrc: Img5 },
    { id: 12, imgSrc: Img6 },
  ];

  const [loading, setLoading] = React.useState(false);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Logged in as:", user.displayName);
      
      // Save user data to localStorage
      localStorage.setItem('user', JSON.stringify({
        username: user.displayName,
        profilePicture: user.photoURL
      }));
  
      // Navigate to Home page
      navigate('/feed');
    } catch (error) {
      console.error("Google login error:", error);
      setLoading(false);
    }
  };

  
  

  

  return (
    <>
      <div className="gallery">
        {data.map((item, index) => (
          <div className="pics" key={index}>
            <img
              src={item.imgSrc}
              alt={`Gallery item ${index + 1}`}
              style={{ width: '100%', paddingBottom: '12px' }}
            />
          </div>
        ))}
      </div>
      <div className="login-btn">
        <div className="cam-icon">
          <img src={CamIcon} alt="Camera Icon" style={{margin:"0",}} />
          <h1 style={{margin:"0",}}>Vibesnap</h1>
          <br/>
        </div>
        <br/>
        <p className="login-p" >Moments That Matter, Shared Forever</p><br/>
        <br/>
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="bg-blue-500 text-white px-6 py-2 rounded shadow"
        >
          <img src={Gicon} alt="" />
          
          Continue with Google
        </button>
      </div>
    </>
  );
};

export default Login;
