import React from "react";
import { Container } from "react-bootstrap";

function Background(props) {
  return (
    <>
      <Container fluid className="bg-gray binx-container">
        {props.children}
      </Container>
    </>
  );
}

export default Background;
