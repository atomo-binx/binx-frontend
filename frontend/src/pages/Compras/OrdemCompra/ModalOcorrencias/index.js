import React from "react";
import { Button, Modal } from "react-bootstrap";

function ModalOcorrencias({ show, closeFunction, idOrdemCompra }) {
  return (
    <Modal show={show} onHide={() => closeFunction(false)} centered size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Ocorrências</Modal.Title>
      </Modal.Header>
      <Modal.Body>{idOrdemCompra}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-secondary"
          onClick={() => closeFunction(false)}
        >
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalOcorrencias;
