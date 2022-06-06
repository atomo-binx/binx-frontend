import React, { useState } from "react";

import {
  Modal,
  Button,
  Row,
  Table,
  Form,
  Col,
  Container,
} from "react-bootstrap";

import { BsPlus, BsTrash } from "react-icons/bs";

function ModalFecharCaixa(props) {
  const { show, setShow, valores } = props;

  const [formasPagamento, setFormasPagamento] = useState([
    { select: null, valor: "20.00" },
  ]);

  const adicionarPagamento = () => {
    setFormasPagamento([...formasPagamento, { select: null, valor: null }]);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Fechar Caixa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="m-0">
          <h5 className="text-muted">Formas de Pagamento</h5>
          <Table>
            <thead>
              <tr>
                <th>Forma de Pagamento</th>
                <th>Valor</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {formasPagamento.map((pagamento) => (
                <tr>
                  <td>
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Select
                        size="sm"
                        aria-label="Default select example"
                      >
                        <option>Selecionar Forma de Pagamento</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </Form.Select>
                    </Form.Group>
                  </td>
                  <td>
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Control size="sm" type="text" placeholder="0,00" />
                    </Form.Group>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center pt-1">
                      <BsTrash color="red" size="20px" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Container fluid className="m-0 p-0 d-flex justify-content-end">
            <Button
              size="sm"
              variant="outline-success"
              onClick={adicionarPagamento}
            >
              <BsPlus />
              Adicionar forma de pagamento
            </Button>
          </Container>
        </Row>
        <div className="my-5"></div>
        <Row className="m-0">
          <h5 className="text-muted">Valores Registrados</h5>
          <Table hover>
            <thead>
              <tr>
                <th>Forma de Pagamento</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {valores.map((valor) => (
                <tr key={valor.formaPagamento}>
                  <td>{valor.formaPagamento}</td>
                  <td>R$ {valor.registrado}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalFecharCaixa;
