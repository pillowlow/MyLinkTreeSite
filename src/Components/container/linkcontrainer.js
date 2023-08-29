// LinkButtonContainer.js
import React from 'react';
import LinkButton from '../button/linkbutton';

const LinkButtonContainer = ({ links }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {links.map((link, index) => (
        <LinkButton key={index} {...link} />
      ))}
    </div>
  );
};

export default LinkButtonContainer;
