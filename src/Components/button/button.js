import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './button.css';

const ButtonComponent = ({ text, customColor, onClick }) => {

  const handleClick = () => {
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className="button-regular"
      style={{ backgroundColor: customColor }}
    >
      {text}
    </button>
  );
};

ButtonComponent.propTypes = {
  text: PropTypes.string.isRequired,
  customColor: PropTypes.string,
  onClick: PropTypes.func.isRequired, 
};

export default ButtonComponent;
