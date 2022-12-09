import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsInfoCircleFill } from "react-icons/bs";

function BotaoInfo({ tooltip, size, ...props }) {
  return (
    <OverlayTrigger placement="right" overlay={<Tooltip>{tooltip}</Tooltip>}>
      <span {...props}>
        <BsInfoCircleFill color="#0dcaf0" role="button" size={size || 15} />
      </span>
    </OverlayTrigger>
  );
}

export default BotaoInfo;
