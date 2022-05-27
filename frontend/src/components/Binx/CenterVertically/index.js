import React from "react";
import styled from "styled-components";

const Center = styled.div`
  @media screen and (min-width: 600px) {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  width: 100%;
`;

function CenterVertically(props) {
  return <Center>{props.children}</Center>;
}

export default CenterVertically;
