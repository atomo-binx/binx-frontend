import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import styled from "styled-components";

const Situacao = styled.div`
  display: inline-block; /* add this */
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background-color: ${(props) => props.colors[props.situacao]};

  &:hover {
    cursor: pointer;
  }
`;

Situacao.defaultProps = {
  colors: {
    "Em Aberto": "rgb(233, 220, 64)",
    "Em Orçamento": "rgb(0, 101, 249)",
    Cancelada: "rgb(203, 203, 203)",
    "Parcialmente Finalizada": "rgb(139, 252, 196)",
    Finalizada: "rgb(63, 181, 122)",
  },
};

function IndicadorSituacao(props) {
  return (
    <OverlayTrigger
      placement="right"
      overlay={<Tooltip>{props.situacao}</Tooltip>}
    >
      <Situacao {...props} />
    </OverlayTrigger>
  );
}

export default IndicadorSituacao;
