import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './button.css';
import '../../text.css';
import { colorPallette } from '../../languages/colorPallette';

const ButtonComponent = ({ text, currentPage ,customColor, onClick }) => {

  let actualColor = customColor;
  let backgroundColor =0x000000;
  let opacityValue = 1;  
  let textcolor = 0x000000;
  //red
  if (currentPage === 'Homepage' && customColor === 'red') {
    actualColor = colorPallette.red.red;
    opacityValue = 1;
    backgroundColor = actualColor;
  }
  if (currentPage === 'Homepage' && customColor === 'blue') {
    actualColor = colorPallette.red.blue;  
    opacityValue = 0.6;
    backgroundColor = 0x000000;
  }
  if (currentPage === 'Homepage' && customColor === 'yellow') {
    actualColor = colorPallette.red.yellow; 
    opacityValue = 0.6;
    backgroundColor =0x000000;
  }
  //blue
  if (currentPage === 'Linkpage' && customColor === 'red') {
    actualColor = colorPallette.blue.red;
    opacityValue = 0.6; 
    backgroundColor =0x000000;
  }
  if (currentPage === 'Linkpage' && customColor === 'blue') {
    actualColor = colorPallette.blue.blue;
    opacityValue = 1; 
    backgroundColor = actualColor;
    
  }
  if (currentPage === 'Linkpage' && customColor === 'yellow') {
    actualColor = colorPallette.blue.yellow;
    opacityValue = 0.6; 
    backgroundColor =0x000000;
  }
  //yellow
  if (currentPage === 'Projectpage' && customColor === 'red') {
    actualColor = colorPallette.yellow.red;
    opacityValue = 0.6; 
    backgroundColor =0x000000;
  }
  if (currentPage === 'Projectpage' && customColor === 'blue') {
    actualColor = colorPallette.yellow.blue;
    opacityValue = 0.6; 
    backgroundColor =0x000000;
  }
  if (currentPage === 'Projectpage' && customColor === 'yellow') {
    actualColor = colorPallette.yellow.yellow;
    opacityValue = 1; 
    backgroundColor = actualColor;
  }
  
  const toHexColor = (decimalColor) => {
    let hexColor = decimalColor.toString(16);
    while (hexColor.length < 6) {
      hexColor = '0' + hexColor;
    }
    return '#' + hexColor;
  };

  textcolor = (backgroundColor === actualColor) ? 0x000000 : actualColor;
  backgroundColor = toHexColor(backgroundColor);
  actualColor = toHexColor(actualColor);
  textcolor = toHexColor(textcolor);
  



  const handleClick = () => {
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className="button-regular button-text"
      style={{
        border: `1px solid ${actualColor}`,
        opacity: opacityValue,
        backgroundColor: backgroundColor,
        color: textcolor,
        filter: `drop-shadow(0 0 10px ${actualColor}) drop-shadow(0 0 20px ${actualColor})`
      }}
      

    >
      {text}
    </button>
  );
};

ButtonComponent.propTypes = {
  text: PropTypes.string.isRequired,
  customColor: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  currentPage: PropTypes.string.isRequired,
};

export default ButtonComponent;
