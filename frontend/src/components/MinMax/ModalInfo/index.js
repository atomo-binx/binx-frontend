import React, { useState, useEffect } from "react";

import { Modal, Button, Badge, Alert } from "react-bootstrap";

function ModalInfo(props) {
  const { showInfo, handleClose, setShowInfo, estatisticas } = props;

  return (
    <>
      <Modal Modal show={showInfo} onHide={handleClose} centered size="md">
        <Modal.Header closeButton>
          <Modal.Title>Informações sobre a análise realizada</Modal.Title>
        </Modal.Header>

        <Modal.Body>...</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowInfo(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalInfo;
