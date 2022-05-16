import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Menu from "../../../components/Menu";

import api from "../../../services/api";
import AuthContext from "../../../contexts/auth";

import { Form, Row, Button, Spinner, Col, Container } from "react-bootstrap";

import "./styles.css";

function Etiquetas() {
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();

  const [token, setToken] = useState(null);

  const [sku, setSku] = useState("");
  const [pedido, setPedido] = useState("");
  const [quantidade, setQuantidade] = useState(null);
  const [etiquetaSimples, setEtiquetaSimples] = useState(false);

  const [carregandoPedido, setCarregandoPedido] = useState(false);
  const [carregandoProduto, setCarregandoProduto] = useState(false);

  useEffect(() => {
    if (userContext) {
      setToken(userContext["signInUserSession"]["accessToken"]["jwtToken"]);
    }
  }, [userContext]);

  const etiquetaProduto = async (event) => {
    event.preventDefault();

    setCarregandoProduto(true);

    await api
      .post(
        "/expedicao/etiqueta/produto",
        {
          idsku: sku,
          quantidade: quantidade,
          etiquetaSimples: etiquetaSimples,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      )
      .then((response) => {
        const file = new Blob([response.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
        URL.revokeObjectURL();
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate("/");
        }
      })
      .finally(() => {
        setCarregandoProduto(false);
        setSku("");
        setQuantidade("");
      });
  };

  const etiquetaPedido = async (event) => {
    event.preventDefault();

    setCarregandoPedido(true);

    await api
      .post(
        "/expedicao/etiqueta/pedido",
        {
          pedidos: [pedido],
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      )
      .then((response) => {
        const file = new Blob([response.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
        URL.revokeObjectURL();
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate("/");
        }
      })
      .finally(() => {
        setCarregandoPedido(false);
        setPedido("");
      });
  };

  return (
    <>
      <Container fluid className="bg-gray binx-container">
        <Menu logged={true} />

        <Container fluid className="center-vertically">
          <Row className="p-0 m-0 d-flex justify-content-around">
            <Col md={4} as={Container} className="p-5 binx-card bg-white">
              <h5>Etiquetas por Pedido de Venda</h5>
              <p className="mt-3">
                Insira o número do pedido de venda para imprimir as etiquetas
                dos produtos.
              </p>
              <Form className="mt-4" onSubmit={etiquetaPedido}>
                <Form.Group className="mb-3">
                  <Form.Control
                    id="number-input"
                    className="text-center"
                    type="text"
                    placeholder="Número do pedido de venda"
                    value={pedido}
                    onChange={(e) => setPedido(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Check
                    disabled
                    type="checkbox"
                    label="Imprimir múltiplos pedidos"
                  />
                </Form.Group>
                <Container
                  fluid
                  className="mt-4 p-0 d-flex justify-content-end"
                >
                  <Button variant="primary" type="submit" className="px-5">
                    {carregandoPedido && (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    )}
                    {!carregandoPedido && <>Imprimir</>}
                  </Button>
                </Container>
              </Form>
            </Col>
            <Col md={4} as={Container} className="p-5 binx-card bg-white">
              <h5>Etiqueta de Produto</h5>

              {etiquetaSimples && (
                <p className="mt-3">
                  Insira o SKU do produto e a quantidade de etiquetas a serem
                  impressas.
                </p>
              )}

              {!etiquetaSimples && (
                <p className="mt-3">
                  Insira o SKU do produto e a quantidade de produtos na
                  etiqueta.
                </p>
              )}
              <Form className="mt-4" onSubmit={etiquetaProduto}>
                <Row>
                  <Form.Group as={Col}>
                    <Form.Control
                      type="text"
                      placeholder="SKU"
                      className="text-center"
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Control
                      type="number"
                      placeholder="Quantidade"
                      className="text-center"
                      value={quantidade}
                      onChange={(e) => setQuantidade(e.target.value)}
                    />
                  </Form.Group>
                </Row>
                <Form.Group className="mt-3">
                  <Form.Check
                    type="checkbox"
                    label="Imprimir etiqueta simples de produto"
                    value={etiquetaSimples}
                    onChange={(e) => setEtiquetaSimples(e.target.checked)}
                  />
                </Form.Group>
                <Container
                  fluid
                  className="mt-2 p-0 d-flex justify-content-end align-items-stretch"
                >
                  <Button variant="primary" type="submit" className="px-5">
                    {carregandoProduto && (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    )}
                    {!carregandoProduto && <>Imprimir</>}
                  </Button>
                </Container>
              </Form>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default Etiquetas;
