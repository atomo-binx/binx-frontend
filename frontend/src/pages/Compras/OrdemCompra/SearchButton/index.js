import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import styled from "styled-components";

const Search = styled(BsSearch)`
  cursor: pointer;
`;

function SearchButton(props) {
  return (
    <OverlayTrigger
      placement="right"
      overlay={<Tooltip {...props}>Pesquisar</Tooltip>}
    >
      <div className="m-0 p-0 ms-3">
        <Search {...props} />
      </div>
    </OverlayTrigger>
  );
}

export default SearchButton;
