import React from "react";

import { Col, Container } from "react-bootstrap";

import "./styles.css";

export default function PageContent(props) {
  return (
    <Container
    as={Col}
      md={props.open ? 10 : 11}
      className={`
      page-content-drawer-${props.open ? "opened" : "closed"}
      mb-5
      `}
      fluid
    >
      {props.children}
    </Container>
  );
}
