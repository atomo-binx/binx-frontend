import React, { useState, useEffect } from "react";

import ModalNovoUsuario from "../ModalNovoUsuario";

import {
  Card,
  Badge,
  Container,
  Row,
  Button,
  Tab,
  Col,
  Nav,
  Accordion,
  Collapse,
} from "react-bootstrap";

export default function Usuarios() {
  const [showNovoUsuario, setShowNovoUsuario] = useState(false);

  const handleClose = () => {
    setShowNovoUsuario(false);
  }
  
  return (
    <>
      {/* Modal de Criação de Novo Usuário */}
      <ModalNovoUsuario
        showModal={showNovoUsuario}
        handleClose={handleClose}
        setShowNovoUsuario={setShowNovoUsuario}
      />

      <Container>
        <Row>
          <Button variant="success" onClick={() => setShowNovoUsuario(true)}>
            Novo Usuário
          </Button>
        </Row>
      </Container>
    </>
  );
}
