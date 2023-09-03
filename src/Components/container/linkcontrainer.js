// LinkButtonContainer.js
import React from 'react';
import LinkButton from '../button/linkbutton';
import './linkcontainer.css'


const LinkButtonContainer = ({ links }) => {
  return (
    <div className="Fixer">
        <div className="FixerInner">
            <div className="linkContainer">
            
            {links.map((link, index) => (
                <LinkButton key={index} {...link} />
            ))}
            </div>
        </div>

    </div>
    
  );
};

export default LinkButtonContainer;
