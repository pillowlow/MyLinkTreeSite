import React from 'react';
import './PageContents.css';


const HomePage = ({ title, description, imageUrl }) => {
    
  return (
    <div className="homeContainer">
      <h1 className="title">{title}</h1>
      <p className="description">{description}</p>
      <img src={imageUrl} alt={title} />
    </div>
  );
};

export default HomePage;
