import React, { useState } from "react";

import Menu from "../../components/Menu";
import ButtonBlock from "../../components/ButtonBlock";

import api from "../../services/api";

import { Form, Card, Badge, Container, Row, Button, Spinner, Col } from "react-bootstrap";

export default function Etiquetas() {
  const [carregando, setCarregando] = useState(false);
  const [sku, setSku] = useState("");
  const [pedido, setPedido] = useState("");

  const etiquetaProduto = async (event) => {
    event.preventDefault();

    await api
      .get("/expedicao/etiqueta/produto", {
        params: {
          sku,
        },
        responseType: "blob",
      })
      .then((response) => {
        const file = new Blob([response.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
        URL.revokeObjectURL();
      })
      .catch((error) => {
        console.log("Erro:", error.message);
      });
  };

  const etiquetaPedido = async (event) => {
    event.preventDefault();

    await api
      .get("/expedicao/etiqueta/pedido", {
        params: {
          pedido,
        },
        responseType: "blob",
      })
      .then((response) => {
        const file = new Blob([response.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
        URL.revokeObjectURL();
      })
      .catch((error) => {
        console.log("Erro:", error.message);
      });
  }

  return (
    <>
      <Menu logged={true} />

      <h3>Produto</h3>
      <Form onSubmit={etiquetaProduto}>
        <Row className="align-items-center">
          <Col xs="6">
            <Form.Group>
              <Form.Control
                type="text"
                onChange={(e) => setSku(e.target.value)}
                placeholder="SKU"
              />
            </Form.Group>
          </Col>
          <Col>
            <ButtonBlock>
              <Button variant="primary" type="submit">
                {carregando && (
                  <Spinner
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                )}
                {!carregando && <>Enviar</>}
              </Button>
            </ButtonBlock>
          </Col>
        </Row>
      </Form>

      <h3>Pedido</h3>
      <Form onSubmit={etiquetaPedido}>
        <Row className="align-items-center">
          <Col xs="6">
            <Form.Group>
              <Form.Control
                type="text"
                onChange={(e) => setPedido(e.target.value)}
                placeholder="Pedido"
              />
            </Form.Group>
          </Col>
          <Col>
            <ButtonBlock>
              <Button variant="primary" type="submit">
                {carregando && (
                  <Spinner
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                )}
                {!carregando && <>Enviar</>}
              </Button>
            </ButtonBlock>
          </Col>
        </Row>
      </Form>
    </>
  );
}
