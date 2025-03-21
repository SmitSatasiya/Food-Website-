import React from "react";
import "./Map.css"

const Map = () => {
  return (
    <div className="map1" style={{ textAlign: 'center' }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d246039.56480456443!2d73.46257249453127!3d15.51838000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfc183437c8095%3A0x9718f891cb564bff!2sTomato&#39;s%20Garden%20Kitchen%20And%20Bar!5e0!3m2!1sen!2sin!4v1725368621208!5m2!1sen!2sin"
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Embedded Map"
      ></iframe>
    </div>
  );
};


export default Map;
