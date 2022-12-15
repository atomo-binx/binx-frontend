import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsPlusSquareFill } from "react-icons/bs";

function BotaoIncluirOrcamento(props) {
  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip>Incluir Orçamento</Tooltip>}
    >
      <span role="button" {...props}>
        <BsPlusSquareFill size={30} color={"#198754"} />
      </span>
    </OverlayTrigger>
  );
}

export default BotaoIncluirOrcamento;
