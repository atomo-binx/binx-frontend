import React from "react";
import { Container } from "react-bootstrap";

function BinxPage(props) {
  return (
    <>
      <Container fluid className="bg-gray binx-container">
        {props.children}
      </Container>
    </>
  );
}

export default BinxPage;
