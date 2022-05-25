import React, { useState } from "react";
import styled from "styled-components";

import { BsFillBackspaceFill } from "react-icons/bs";
import GridFillWhite from "../../../assets/grid-fill.svg";

import { Container, Image, Col, Collapse } from "react-bootstrap";

const Drawer = styled(Container)`
  position: fixed;
  background-color: white;
  min-height: 100vh;
  border-top-right-radius: 17px;
  z-index: 100;
  transition: 0.5s;

  left: ${(props) => (props.open ? "0px;" : "-500px;")};
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
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  width: 105px;
  height: 35px;
  left: -60px;
  top: 80px;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
`;

function Sidebar(props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Col>
        <OpenIcon onClick={() => setOpen(true)}>
          <Image src={GridFillWhite} width="16px" />
        </OpenIcon>
        <Drawer as={Col} xs={10} sm={4} lg={3} xl={2} open={open}>
          <CloseIcon>
            <BsFillBackspaceFill size={25} onClick={() => setOpen(false)} />
          </CloseIcon>
          {props.children}
        </Drawer>
      </Col>
    </>
  );
}

export default Sidebar;
