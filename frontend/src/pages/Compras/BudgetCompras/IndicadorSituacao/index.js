import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import styled from "styled-components";

const Situacao = styled.div`
  display: inline-block; /* add this */
  width: 13px;
  height: 13px;
  border-radius: 50%;
  margin: 0px;
  padding: 0px;
  background-color: ${(props) => props.colors[props.situacao]};

  &:hover {
    cursor: pointer;
  }
`;

const situacoes = {
  0: "Em Aberto",
  1: "Atendido",
  2: "Cancelado",
  3: "Em Andamento",
};

Situacao.defaultProps = {
  colors: {
    0: "#e4dc00",
    1: "#34ad61",
    2: "#ababab",
    3: "#1160ff",
  },
};

function IndicadorSituacao(props) {
  return (
    <OverlayTrigger
      placement="right"
      overlay={<Tooltip>{situacoes[props.situacao]}</Tooltip>}
    >
      <Situacao {...props} />
    </OverlayTrigger>
  );
}

export default IndicadorSituacao;
