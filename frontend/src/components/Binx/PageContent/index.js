import React from "react";

import { Container, Row, Col } from "react-bootstrap";

function PageContent(props) {
  return (
    <Col id="COLUNA" as={Container} fluid {...props}>
      <Row>{props.children}</Row>
    </Col>
  );
}

export default PageContent;
