import React from 'react';
import './PageContents.css';



const HomePage = ({ title, description,description2, imageUrl }) => {
    
  return (
    <div className="homeContainer">
        <div className="homeContainerInner">
        <h1 className="title">{title}</h1>
        <div className="row content no-wrap">
            <div className="col-md-4 col-sm-4 col-4">
                <div className="leftContainer">
                    <div className="pfpImageContainer">
                        <img src={imageUrl} alt={title} className="pfpImage"/>
                    </div>
                </div>
            </div>
            <div className="col-md-1 col-sm-1 col-1"></div>
            <div className="col-md-7 col-sm-7 col-7">
            
            <p className="description">{description}</p>
            </div>
        </div>
        <div className="row contentDown">
            <div className="col-md-12">
            {/* 這裡是下方的文字 */}
            <p className="description">{description2}</p>
            </div>
        </div>
    </div>
    </div>

  );
};

export default HomePage;
