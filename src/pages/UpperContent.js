import React from 'react';
import './PageContents.css';


const UpperPage = ({ title, description, imageUrl }) => {
    
  return (
    <div className="upperContainer">
      <h1 className="title">{title}</h1>
      <p className="description">{description}</p>
      <div class="marquee">
        <span>Hello World!</span>
      </div>
      <div class="vert-marquee">
        <span class="vertical-text">Hello World!</span>
      </div>
      
    </div>
  );
};

export default UpperPage;