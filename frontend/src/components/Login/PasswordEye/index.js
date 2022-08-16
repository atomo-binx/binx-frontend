import React from "react";
import styled from "styled-components";
import { InputGroup } from "react-bootstrap";

const Eye = styled(InputGroup.Text)`
  background-color: white;
  border-color: ${(props) => (props.$isInvalid ? "#dc3545" : "none")};
  &:hover {
    cursor: pointer;
  }
`;

function PasswordEye(props) {
  const { isInvalid, forwardRef, ...forwardProps } = props;

  return (
    <Eye $isInvalid={isInvalid} ref={forwardRef} {...forwardProps}>
      {props.children}
    </Eye>
  );
}

export default PasswordEye;
