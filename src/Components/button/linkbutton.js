import React from 'react';
import './linkbutton.css';
import '../../text.css';

const LinkButton = ({ iconUrl, text, color, url }) => {
    const gradientBackground = `linear-gradient(to right, ${color}, white)`;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{padding:" 10px"}}>
      <div style={{ 
        borderColor: color,
        borderWidth: '1px',
        borderStyle: 'solid',
        background: gradientBackground,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        
        }} className="linkButton">
        <div>
        <img src={iconUrl} alt="icon"  style={{ padding:" 10px"}}/>
        <span className="subTitle" style={{ color:'black', textShadow:'none'}}>{text} </span >

        </div>
        
      </div>
    </a>
  );
};

export default LinkButton;


