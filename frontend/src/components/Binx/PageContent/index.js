import React from "react";

import { Container, Row, Col } from "react-bootstrap";

function PageContent(props) {
  return (
    <Col as={Container} fluid {...props} className="mx-3">
      <Row>{props.children}</Row>
    </Col>
  );
}

export default PageContent;
