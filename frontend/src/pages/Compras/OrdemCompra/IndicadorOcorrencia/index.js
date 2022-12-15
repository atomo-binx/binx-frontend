import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsClock } from "react-icons/bs";
import styled from "styled-components";

const Ocorrencia = styled.div`
  margin: 0;
  padding: 0;

  &:hover {
    cursor: pointer;
  }
`;

function IndicadorOcorrencia(props) {
  return (
    <OverlayTrigger placement="right" overlay={<Tooltip>Ocorrências</Tooltip>}>
      <Ocorrencia {...props}>
        <BsClock size={13} />
      </Ocorrencia>
    </OverlayTrigger>
  );
}

export default IndicadorOcorrencia;
