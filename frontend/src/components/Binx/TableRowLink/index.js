import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Link = styled.tr`
  &:hover {
    cursor: pointer;
  }
`;

function TableRowLink(props) {
  const navigate = useNavigate();

  return (
    <Link onClick={() => navigate("../../" + props.to)}>{props.children}</Link>
  );
}

export default TableRowLink;
