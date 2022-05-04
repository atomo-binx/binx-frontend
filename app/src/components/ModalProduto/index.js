import React, { useState } from "react";

import { Modal, Button, Row, Col, Form, InputGroup } from "react-bootstrap";

function ModalProduto(props) {
  const {
    nome,
    idsku,
    cobertura,
    idcategoria,
    curva,
    precovenda,
    custo,
    estoque,
  } = props.product;

  const { showProduct, handleClose, setShowProduct } = props;

  // Em um cenário de produção o status de fixação devem ser puxados do cadastro do produto no banco
  const [fixedCobertura, setFixedCobertura] = useState(false);
  const [fixedidcategoria, setFixedidcategoria] = useState(false);
  const [fixedCurva, setFixedCurva] = useState(false);

  return (
    <>
      <Modal Modal show={showProduct} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{nome}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col sm={2}>
              <Form.Group>
                <Form.Label muted>SKU</Form.Label>
                <Form.Control value={idsku} readOnly />
              </Form.Group>
            </Col>
            <Col sm={2}>
              <Form.Group>
                <Form.Label muted>Situação</Form.Label>
                <Form.Control as="select" custom>
                  <option>Ativo</option>
                  <option>Inativo</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Descrição</Form.Label>
                <Form.Control value={nome} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Cobertura</Form.Label>
                <Form.Control value={cobertura} />
                <Form.Check
                  className="mt-1"
                  type="switch"
                  id="fixar-cobertura"
                  label="Fixar"
                  readOnly={fixedCobertura}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>idcategoria</Form.Label>
                <Form.Control value={idcategoria} />
                <Form.Check
                  className="mt-1"
                  type="switch"
                  id="fixar-idcategoria"
                  label="Fixar"
                  readOnly={fixedidcategoria}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Curva</Form.Label>
                <Form.Control as="select" custom>
                  <option>Curva A</option>
                  <option>Curva B</option>
                  <option>Curva C</option>
                  <option>Curva D</option>
                  <option>Curva E</option>
                </Form.Control>
                <Form.Check
                  className="mt-1"
                  type="switch"
                  id="fixar-curva"
                  label="Fixar"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Preço de Venda</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>R$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control value={precovenda} />
              </InputGroup>
            </Col>
            <Col>
              <Form.Label>Preço de Custo</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>R$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control value={custo} />
              </InputGroup>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Form.Group>
                <Form.Label>Estoque Mínimo</Form.Label>
                <Form.Control value={1} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Estoque Atual</Form.Label>
                <Form.Control value={estoque} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Estoque Máximo</Form.Label>
                <Form.Control value={1} />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-success" >
            Abrir em uma Guia Separada
          </Button>
          <Button variant="secondary" onClick={() => setShowProduct(false)}>
            Fechar
          </Button>
          <Button variant="primary">Salvar Alterações</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalProduto;
