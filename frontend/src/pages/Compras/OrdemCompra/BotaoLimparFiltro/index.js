import React from "react";
import styled from "styled-components";

const Limpar = styled.span`
  cursor: pointer;
  font-weight: "bold";
  margin-left: 8px;

  &:hover {
    text-decoration: underline;
  }
`;

function BotaoLimparFiltro(props) {
  const { limparFiltros } = props;

  return (
    <Limpar {...props} onClick={() => limparFiltros()}>
      {props.children}
    </Limpar>
  );
}

export default BotaoLimparFiltro;
