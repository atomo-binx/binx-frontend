import React from "react";
import styled from "styled-components";

const Footer = styled.div`
  position: relative;
  right: 0;
  bottom: 0;
  padding: 20px;
  background-color: white;
  width: 100%;
  margin: 0px;
`;

function OffcanvasFooter(props) {
  return <Footer {...props}>{props.children}</Footer>;
}

export default OffcanvasFooter;
