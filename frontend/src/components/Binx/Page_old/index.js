import React from "react";
import styled from "styled-components";

import { Row } from "react-bootstrap";

const PageWapper = styled(Row)`
  width: 100%;
  max-width: 1920px;
  /* max-width: 2560px; */
`;

function Page(props) {
  return (
    <PageWapper {...props} className="m-0 pt-4">
      {props.children}
    </PageWapper>
  );
}

export default Page;
