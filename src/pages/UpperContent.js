import React from 'react';
import './PageContents.css';
import '../text.css';


const UpperPage = ({ title, description,description2, marquee,vertMarquee }) => {
    
  return (
    <div className="upperContainer">
        <div className="upperContainerInner">
            <div className="upperText">
                <div>
                    <h1 className="title">{title}</h1>
                    <div className="leftText">
                        <p className="description">{description}</p>
                        <p className="subTitle">{description2}</p>
                    </div>
                    
                </div>
                
                <div className="vert-marquee">
                    <span className="vertical-text subTitle">{vertMarquee}</span>
                </div>
            </div>
            <div className="marquee">
                <span className="subTitle">{marquee}</span>
            </div>
        </div>
    </div>

  );
};

export default UpperPage;