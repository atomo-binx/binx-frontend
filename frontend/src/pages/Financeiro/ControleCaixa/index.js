import React, { useState } from "react";

import Background from "../../../components/Binx/Background";
import Menu from "../../../components/Binx/Menu";
import Sidebar from "../../../components/Binx/Sidebar";
import PageContent from "../../../components/PageContent";

import { Row, Col, Container, Button, Collapse, Card } from "react-bootstrap";

function ControleCaixa() {
  const [open, setOpen] = useState(false);

  return (
    <Background>
      <Menu logged={true} />
      <Row className="m-0 pt-4">
        <Sidebar>
          <h3>Menu Menu</h3>
          <p>Texto Texto</p>
        </Sidebar>
        <Col as={Container} fluid>
          <Row>
            <Col>Coluna 1</Col>
            <Col>Coluna 2</Col>
            <Col>Coluna 3</Col>
            <Col>Coluna 4</Col>
            <Col>Coluna 5</Col>
            <Col>Coluna 6</Col>
            <Col>Coluna 7</Col>
            <Col>Coluna 7</Col>
            <Col>Coluna 7</Col>
            <Col>Coluna 7</Col>
          </Row>
          {/* <h1>Controle de caixa</h1>
          <p>Controle de caixa</p>
          <p>Controle de caixa</p>
          <p>Controle de caixa</p>
          <p>Controle de caixa</p>
          <p>Controle de caixa</p>
          <p>Controle de caixa</p>
          <p>Controle de caixa</p>
          <p>Controle de caixa</p>
          <p>Controle de caixa</p>
          <p>Controle de caixa</p>
          <p>Controle de caixa</p>
          <p>Controle de caixa</p>
          <p>Controle de caixa</p>
          <p>Controle de caixa</p>
          <p>Controle de caixa</p>
          <p>Controle de caixa</p>
          <p>Controle de caixa</p> */}
        </Col>
      </Row>
    </Background>
  );
}

export default ControleCaixa;
