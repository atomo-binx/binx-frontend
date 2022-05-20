import React from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";

const Center = styled(Container)`
  @media screen and (min-width: 600px) {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
`;

function CenterVertically(props) {
  return <Center fluid>{props.children}</Center>;
}

export default CenterVertically;
