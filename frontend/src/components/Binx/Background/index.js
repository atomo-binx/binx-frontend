import React from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";

const BackgroundContainer = styled(Container)`
  min-height: 100vh;
  margin: 0px;
  padding: 0px;
  background-color: #f2f2f2;
`;

function Background(props) {
  return (
    <>
      <BackgroundContainer fluid>{props.children}</BackgroundContainer>
    </>
  );
}

export default Background;
