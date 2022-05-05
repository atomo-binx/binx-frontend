import React from "react";

import { Button, Modal, Alert } from "react-bootstrap";

function ModalFalhaProspeccao(props) {
  const { show, setShow, mensagemFalha } = props;

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Falha na criação de nova prospecção</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Não foi possível realizar a prospecção, para mais detalhes, verifique a mensagem
          abaixo.
        </p>
        <Alert variant="secondary">{mensagemFalha}</Alert>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Voltar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalFalhaProspeccao;
