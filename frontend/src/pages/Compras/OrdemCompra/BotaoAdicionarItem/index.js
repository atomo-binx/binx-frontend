import React from "react";
import { BsPlus } from "react-icons/bs";
import styled from "styled-components";

const Adicionar = styled.div`
  &:hover {
    cursor: pointer;
    text-decoration: underline;
    text-decoration-color: #198754;
  }
`;

function BotaoAdicionarItem() {
  return (
    <Adicionar fluid className="p-0 m-0">
      <BsPlus color="#198754" size={25} className="me-1" />
      <strong className="text-success">Adicionar outro item</strong>
    </Adicionar>
  );
}

export default BotaoAdicionarItem;
