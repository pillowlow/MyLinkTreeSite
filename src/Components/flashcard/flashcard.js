import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import './flashcard.css';
import '../../text.css';
import { colorPallette } from '../../languages/colorPallette';


const Flashcard = ({ image, title, description, link }) => {
    
    const [isClicked, setIsClicked] = useState(false);
    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 1000);  // 3秒后重置
      };
    const toHexColor = (decimalColor) => {
        let hexColor = decimalColor.toString(16);
        while (hexColor.length < 6) {
          hexColor = '0' + hexColor;
        }
        return '#' + hexColor;
      };
  const buttonColor = toHexColor(colorPallette.yellow.yellow);
  const gradientBackground = `linear-gradient(to right, ${buttonColor}, black)`;


  return (
    <Card className="mb-3 my-card">
      <Row className="g-0">
        <Col xs={5}>
          <Card.Img src={image} alt="Flashcard image" />
        </Col>
        <Col xs={7}>
          <Card.Body>
            <Card.Title className="my-card-title">{title}</Card.Title>
            <Card.Text className="description">{description}</Card.Text>
          </Card.Body>
        </Col>
      </Row>
      <Button 
        variant="primary" 
        href={link} 
        block 
        onClick={handleClick} // 在这里设置按钮为“已点击”
        style={!isClicked ? { backgroundColor: buttonColor } : {}}
        className="my-button"
        >
        Learn More
        </Button>
    </Card>
  );
};

export default Flashcard;
