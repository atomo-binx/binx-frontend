import React from "react";

import { Container, Row, Col } from "react-bootstrap";

function PageContent(props) {
  return (
    <Col as={Container} fluid>
      <Row>{props.children}</Row>
    </Col>
  );
}

export default PageContent;
