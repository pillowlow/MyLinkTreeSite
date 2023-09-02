import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './button.css';
import { colorPallette } from '../../languages/colorPallette';

const ButtonComponent = ({ text, currentPage ,customColor, onClick }) => {

  let actualColor = customColor;
  //red
  if (currentPage === 'Homepage' && customColor === 'red') {
    actualColor = colorPallette.red.red; 
  }
  if (currentPage === 'Homepage' && customColor === 'blue') {
    actualColor = colorPallette.red.blue;  
  }
  if (currentPage === 'Homepage' && customColor === 'yellow') {
    actualColor = colorPallette.red.yellow;  
  }
  //blue
  if (currentPage === 'Linkpage' && customColor === 'red') {
    actualColor = colorPallette.blue.red;
  }
  if (currentPage === 'Linkpage' && customColor === 'blue') {
    actualColor = colorPallette.blue.blue;
  }
  if (currentPage === 'Linkpage' && customColor === 'yellow') {
    actualColor = colorPallette.blue.yellow;
  }
  //yellow
  if (currentPage === 'Projectpage' && customColor === 'red') {
    actualColor = colorPallette.yellow.red;
  }
  if (currentPage === 'Projectpage' && customColor === 'blue') {
    actualColor = colorPallette.yellow.blue;
  }
  if (currentPage === 'Projectpage' && customColor === 'yellow') {
    actualColor = colorPallette.yellow.yellow;
  }
  
  const toHexColor = (decimalColor) => {
    let hexColor = decimalColor.toString(16);
    while (hexColor.length < 6) {
      hexColor = '0' + hexColor;
    }
    return '#' + hexColor;
  };

  actualColor = toHexColor(actualColor);


  const handleClick = () => {
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className="button-regular"
      style={{ backgroundColor: actualColor }}
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
