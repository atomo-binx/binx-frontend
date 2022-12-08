import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsPlusSquareFill } from "react-icons/bs";
import styled from "styled-components";

function BotaoIncluirOrcamento({ incluirOrcamento }) {
  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip>Incluir Orçamento</Tooltip>}
    >
      <span role="button">
        <BsPlusSquareFill
          size={30}
          color={"#198754"}
          onClick={() => incluirOrcamento()}
        />
      </span>
    </OverlayTrigger>
  );
}

export default BotaoIncluirOrcamento;
