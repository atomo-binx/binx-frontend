import React from "react";
import styled from "styled-components";

const Center = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin: 0px;
  padding: 0px;
  max-width: 1920px;
  max-height: calc(100vh - 150px);
`;

function CenterVertically(props) {
  return <Center>{props.children}</Center>;
}

export default CenterVertically;
