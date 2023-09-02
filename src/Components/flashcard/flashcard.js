import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const Flashcard = ({ image, title, description, link }) => {
  return (
    <Card className="mb-3">
      <Row className="g-0">
        <Col xs={5}>
          <Card.Img src={image} alt="Flashcard image" />
        </Col>
        <Col xs={7}>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{description}</Card.Text>
          </Card.Body>
        </Col>
      </Row>
      <Button variant="primary" href={link} block>
        Learn More
      </Button>
    </Card>
  );
};

export default Flashcard;
