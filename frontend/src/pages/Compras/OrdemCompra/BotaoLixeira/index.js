import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsTrashFill } from "react-icons/bs";

function BotaoLixeira({ tooltip, size, ...props }) {
  return (
    <OverlayTrigger placement="right" overlay={<Tooltip>{tooltip}</Tooltip>}>
      <span {...props}>
        <BsTrashFill color="#dc3545" role="button" size={size || 15} />
      </span>
    </OverlayTrigger>
  );
}

export default BotaoLixeira;
