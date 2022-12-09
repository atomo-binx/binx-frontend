import React from "react";
import styled from "styled-components";

const Number = styled.div`
  background-color: #f2f2f2;
  width: 20px;
  height: 20px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #343a40;
`;

function TableNumberIndex({ number }) {
  return <Number>{number}</Number>;
}

export default TableNumberIndex;
