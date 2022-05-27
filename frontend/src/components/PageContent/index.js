import React from "react";

import { Col, Container } from "react-bootstrap";

import "./styles.css";

export default function PageContent(props) {
  return (
    <Container as={Col} fluid>
      {props.children}
    </Container>
  );
}
