import React from "react";

import { Container } from "react-bootstrap";

function PageContent(props) {
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

export default PageContent;
