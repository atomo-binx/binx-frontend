import React from "react";
import styled from "styled-components";

import { Row } from "react-bootstrap";

const PageWapper = styled(Row)`
  max-width: 1440px;
`;

function Page(props) {
  return (
    <PageWapper {...props} className="m-0 pt-4">
      {props.children}
    </PageWapper>
  );
}

export default Page;
