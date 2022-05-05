import React from "react";

import { Button, Modal, Alert } from "react-bootstrap";

function ModalValidarProspeccao(props) {
  const { show, setShow, mensagemValidacao } = props;

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Validação de Prospecção</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {mensagemValidacao === "A prospecção informada é válida, e pode ser criada." && (
          <Alert variant="success">
            A prospecção informada é válida e pode ser criada normalmente.
          </Alert>
        )}

        {mensagemValidacao !== "A prospecção informada é válida, e pode ser criada." && (
          <>
            <Alert variant="warning">
              A prospecação informada não é válida para criação, para mais detalhes,
              verificar a mensagem a seguir
            </Alert>
            <Alert variant="secondary">{mensagemValidacao}</Alert>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Voltar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalValidarProspeccao;
