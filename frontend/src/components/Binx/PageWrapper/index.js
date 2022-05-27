import React from "react";
import styled from "styled-components";

const PageWapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

function PageWrapper(props) {
  return <PageWapper>{props.children}</PageWapper>;
}

export default PageWrapper;
