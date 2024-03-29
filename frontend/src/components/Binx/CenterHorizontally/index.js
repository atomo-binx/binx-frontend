import React from "react";
import styled from "styled-components";

const Center = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0px;
  padding: 0px;
  width: 100%;
`;

function CenterHorizontally(props) {
  return <Center {...props}>{props.children}</Center>;
}

export default CenterHorizontally;
