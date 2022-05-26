import React from "react";

import { Container, Row, Col } from "react-bootstrap";

function PageContent(props) {
  return (
    <Col as={Container} fluid>
      <Row className="p-3">{props.children}</Row>
    </Col>
  );
}

export default PageContent;
