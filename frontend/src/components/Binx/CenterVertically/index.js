import React from "react";
import styled from "styled-components";

const Center = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

function CenterVertically(props) {
  return <Center>{props.children}</Center>;
}

export default CenterVertically;
