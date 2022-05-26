import React from "react";
import styled from "styled-components";

import { Container } from "react-bootstrap";

const Card = styled(Container)`
  background-color: white;
  border-radius: 17px 17px 0px 0px;
  height: 100vh;
`;

function ContentCard(props) {
  return <Card {...props}>{props.children}</Card>;
}

export default ContentCard;
