import React from 'react';
import TwitterIcon from '../assets/img/twitter.svg'; // Add appropriate icon paths
import FacebookIcon from '../assets/img/facebook.svg';
import RedditIcon from '../assets/img/reddit.svg';
import DiscordIcon from '../assets/img/discord.svg';
import WhatsAppIcon from '../assets/img/whatsapp.svg';
import MessengerIcon from '../assets/img/messenger.svg';
import TelegramIcon from '../assets/img/telegram.svg';
import InstagramIcon from '../assets/img/instagram.svg';

const Share = ({ onClose }) => {
  

  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* ✅ Clicking X will close the popup */}
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        <div className="share-icons">
          <a href="https://twitter.com/share" target="_blank" rel="noopener noreferrer">
            <img src={TwitterIcon} alt="Twitter" />
            Twitter
          </a>
          <a href="https://www.facebook.com/sharer/sharer.php" target="_blank" rel="noopener noreferrer">
            <img src={FacebookIcon} alt="Facebook" />
            Facebook
          </a>
          <a href="https://reddit.com/submit" target="_blank" rel="noopener noreferrer">
            <img src={RedditIcon} alt="Reddit" />
            Reddit
          </a>
          <a href="https://discord.com/share" target="_blank" rel="noopener noreferrer">
            <img src={DiscordIcon} alt="Discord" />
            Discord
          </a>
          <a href="https://wa.me" target="_blank" rel="noopener noreferrer">
            <img src={WhatsAppIcon} alt="WhatsApp" />
            WhatsApp
          </a>
          <a href="https://www.messenger.com/t" target="_blank" rel="noopener noreferrer">
            <img src={MessengerIcon} alt="Messenger" />
            Messenger
          </a>
          <a href="https://t.me/share/url" target="_blank" rel="noopener noreferrer">
            <img src={TelegramIcon} alt="Telegram" />
            Telegram
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={InstagramIcon} alt="Instagram" />
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
};

export default Share;
