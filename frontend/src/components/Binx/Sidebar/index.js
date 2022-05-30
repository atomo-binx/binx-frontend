import React, { useState } from "react";
import styled from "styled-components";

import { BsFillBackspaceFill } from "react-icons/bs";
import GridFillWhite from "../../../assets/grid-fill.svg";

import { Container, Image, Col } from "react-bootstrap";

const Drawer = styled(Container)`
  position: ${(props) => (props.open ? "fixed" : "fixed")};
  background-color: white;
  min-height: 100vh;
  border-top-right-radius: 17px;
  z-index: 100;
  transition: 0.5s;

  left: ${(props) => (props.open ? "0px" : "-500px")};
`;

const CloseIcon = styled.div`
  &:hover {
    cursor: pointer;
  }

  position: absolute;
  right: -5px;
  top: 10px;
`;

const OpenIcon = styled.div`
  &:hover {
    cursor: pointer;
  }

  position: fixed;
  background-color: #343a40;
  border-radius: 0px 10px 10px 0px;
  width: 105px;
  height: 35px;
  left: -60px;
  top: 80px;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
`;

const ClosedSpace = styled.div`
  width: 60px !important;
`;

const OpenedSpace = styled(Col)`
  margin-right: 20px;
`;

function Sidebar(props) {
  const [open, setOpen] = useState(props.startOpen || false);

  return (
    <>
      {open ? <OpenedSpace xl={2} /> : <ClosedSpace />}

      <OpenIcon onClick={() => setOpen(true)}>
        <Image src={GridFillWhite} width="16px" />
      </OpenIcon>

      <Drawer as={Col} xs={10} sm={4} lg={3} xl={2} open={open}>
        <CloseIcon>
          <BsFillBackspaceFill size={25} onClick={() => setOpen(false)} />
        </CloseIcon>
        {props.children}
      </Drawer>
    </>
  );
}

export default Sidebar;
