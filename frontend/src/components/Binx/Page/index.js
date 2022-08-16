import React from "react";
import styled from "styled-components";

import { Row, Col, Container } from "react-bootstrap";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const BodyRow = styled(Row)`
  width: 100%;
  max-width: 1920px; // 2560px ?
`;

function Page(props) {
  return <Wrapper>{props.children}</Wrapper>;
}

Page.Body = function Body(props) {
  return (
    <BodyRow {...props} className="m-0 pt-4">
      {props.children}
    </BodyRow>
  );
};

Page.Content = function Content(props) {
  return (
    <Col as={Container} fluid {...props} className="mx-3">
      <Row>{props.children}</Row>
    </Col>
  );
};

Page.Title = function Title(props) {
  return <h4 {...props}>{props.children}</h4>;
};

Page.Subtitle = function Subtitle(props) {
  return (
    <h6 {...props} className="text-muted">
      {props.children}
    </h6>
  );
};

export default Page;
