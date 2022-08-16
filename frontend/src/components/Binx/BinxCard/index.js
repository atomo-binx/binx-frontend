import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background-color: white;
  border-radius: 17px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);

  width: ${(props) => (props.width ? props.width : "auto")};
`;

function BinxCard(props) {
  return (
    <Card className="p-4" {...props}>
      {props.children}
    </Card>
  );
}

export default BinxCard;
