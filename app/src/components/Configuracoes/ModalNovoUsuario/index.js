import { React, useState } from "react";

import { Modal, Button, Form, Spinner } from "react-bootstrap";

function ModalNovoUsuario(props) {
  const { showModal, handleClose, setShowModal } = props;

  const [carregando, setCarregando] = useState(false);

  const [erro, setErro] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  const criarUsuario = async () => {

  };

  return (
    <>
      <Modal
        Modal
        show={showModal}
        onHide={handleClose}
        centered
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>Criar novo usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Criar novo usuário.
          </p>
          <Form onSubmit={criarUsuario}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="password"
                placeholder="Nova senha"
                // onChange={(e) => setPrimeiraSenha(e.target.value)}
                isInvalid={erro}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="my-4">
              <Form.Control
                type="password"
                placeholder="Confirmar senha"
                // onChange={(e) => setSegundaSenha(e.target.value)}
                isInvalid={erro}
              />
              <Form.Control.Feedback type="invalid" className="my-4">
                {mensagemErro}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" block>
              {carregando && (
                <Spinner
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              {!carregando && <>Confirmar</>}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalNovoUsuario;
