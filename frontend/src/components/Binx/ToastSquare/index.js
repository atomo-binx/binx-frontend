import React from "react";
import styled from "styled-components";

const Square = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 5px;
  background-color: ${(props) =>
    props.variant === "success" ? "#198754" : "#dc3545"};
  margin: 0px 5px 0px 0px;
`;

function ToastSquare(props) {
  return <Square {...props} />;
}

export default ToastSquare;
