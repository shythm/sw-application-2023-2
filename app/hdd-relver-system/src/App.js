import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function App() {
  return (
    <Container>
      <Row>
        <Col>this is first column</Col>
        <Col>this is second column</Col>
      </Row>
    </Container>
  );
}
