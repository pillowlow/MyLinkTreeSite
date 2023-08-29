import React from 'react';

const LinkButton = ({ iconUrl, text, color }) => {
  return (
    <div style={{ backgroundColor: color, padding: '10px', display: 'flex', alignItems: 'center',position:"relative",zIndex:"1" }}>
      <img src={iconUrl} alt="icon" style={{ width: '20px', height: '20px' ,position:"relative",zIndex:"1"}} />
      
      <span style={{ marginLeft: '10px' ,color: "white",position:"relative",zIndex:"1"}}>{text}</span>
      
    </div>
  );
};

export default LinkButton;