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

  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);

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
  width: 50px !important;
`;

const OpenedSpace = styled(Col)`
  margin-right: 10px;
`;

function Sidebar(props) {
  const [open, setOpen] = useState(props.startOpen || false);

  return (
    <>
      {open ? <OpenedSpace xl={2} /> : <ClosedSpace />}

      <OpenIcon onClick={() => setOpen(true)}>
        <Image src={GridFillWhite} width="16px" />
      </OpenIcon>

      <Drawer
        as={Col}
        xs={10}
        sm={4}
        lg={3}
        xl={2}
        open={open}
        className="px-4"
      >
        <CloseIcon>
          <BsFillBackspaceFill size={25} onClick={() => setOpen(false)} />
        </CloseIcon>
        {props.children}
      </Drawer>
    </>
  );
}

Sidebar.Title = function Title(props) {
  return (
    <div className="text-center p-3 mt-3">
      <h5>{props.children}</h5>
    </div>
  );
};

Sidebar.Subtitle = function Subtitle(props) {
  return (
    <div className="mb-3">
      <h6 style={{ fontSize: "1rem" }}>{props.children}</h6>
    </div>
  );
};

Sidebar.Item = function Item(props) {
  return <div className="my-2">{props.children}</div>;
};

const ItemLink = styled.div`
  &:hover {
    cursor: pointer;
    background-color: #f3f3f3;
  }

  padding: 10px 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
`;

Sidebar.Link = function Link(props) {
  return (
    <div>
      <ItemLink>
        {props.icon && (
          <div className="d-flex text-muted">
            <div className="mx-3">{props.icon}</div>
            <div>
              <h6 className="m-0 p-0 text-center">{props.children}</h6>
            </div>
          </div>
        )}
        {!props.icon && (
          <h6 className="m-0 p-0 text-muted text-center">{props.children}</h6>
        )}
      </ItemLink>
    </div>
  );
};

export default Sidebar;
