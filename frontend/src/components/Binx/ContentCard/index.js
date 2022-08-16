import React from "react";
import styled from "styled-components";

import { Container } from "react-bootstrap";

const Card = styled(Container)`
  background-color: white;
  border-radius: 17px 17px 0px 0px;
  min-height: 100vh;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
`;

function ContentCard(props) {
  return (
    <Card fluid className="mt-3 p-4" {...props}>
      {props.children}
    </Card>
  );
}

export default ContentCard;
