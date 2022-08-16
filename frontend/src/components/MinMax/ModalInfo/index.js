import React from "react";

import { Modal, Button } from "react-bootstrap";

function ModalInfo(props) {
  const { showInfo, handleClose, setShowInfo } = props;

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
