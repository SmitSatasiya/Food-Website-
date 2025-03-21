import React from 'react';
import './AppDownload.css';
import { assets } from '../../assets/assets';

const AppDownload = () => {
  const handlePlayStoreClick = () => {
    window.open('https://play.google.com/store/apps/details?id=com.tomatomxmobil&hl=en_IN&pli=1', '_blank');
  };

  const handleAppStoreClick = () => {
    window.open('https://apps.apple.com/us/app/tomato-mx-food-delivery/id1453730747', '_blank');
  };

  return (
    <div className="app-download" id="app-download">
      <p>For Better Experience Download <br /> Tomato App</p>
      <div className="app-download-platform">
        <img 
          src={assets.play_store} 
          alt="Google Play Store" 
          onClick={handlePlayStoreClick} 
          style={{ cursor: 'pointer' }} 
        />
        <img 
          src={assets.app_store} 
          alt="Apple App Store" 
          onClick={handleAppStoreClick} 
          style={{ cursor: 'pointer' }} 
        />
      </div>
    </div>
  );
};

export default AppDownload;
