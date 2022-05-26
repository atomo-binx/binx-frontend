import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Menu from "../../../components/Binx/Menu";

import api from "../../../services/api";
import AuthContext from "../../../contexts/auth";

import { Form, Row, Button, Spinner, Col, Container } from "react-bootstrap";

import "./styles.css";
import Background from "../../../components/Binx/Background";
import CenterVertically from "../../../components/Binx/CenterVertically";
import CenterHorizontally from "../../../components/Binx/CenterHorizontally";

function Etiquetas() {
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();

  const [token, setToken] = useState(null);

  const [sku, setSku] = useState("");
  const [pedido, setPedido] = useState("");
  const [quantidade, setQuantidade] = useState(0);
  const [etiquetaSimples, setEtiquetaSimples] = useState(true);

  const [carregandoPedido, setCarregandoPedido] = useState(false);
  const [carregandoProduto, setCarregandoProduto] = useState(false);

  const [erroPedido, setErroPedido] = useState(false);
  const [msgErroPedido, setMsgErroPedido] = useState("");

  const [erroProduto, setErroProduto] = useState(false);
  const [msgErroProduto, setMsgErroProduto] = useState("");

  useEffect(() => {
    if (userContext) {
      setToken(userContext["signInUserSession"]["accessToken"]["jwtToken"]);
    }
  }, [userContext]);

  const etiquetaProduto = async (event) => {
    event.preventDefault();

    setCarregandoProduto(true);
    setErroProduto(false);

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
        setSku("");
        setQuantidade("");

        const file = new Blob([response.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      })
      .catch((error) => {
        switch (error.response.status) {
          case 401:
            navigate("/");
            break;
          case 404:
            setErroProduto(true);
            setMsgErroProduto("O produto informado não foi encontrado.");
            break;
        }
      })
      .finally(() => {
        setCarregandoProduto(false);
      });
  };

  const etiquetaPedido = async (event) => {
    event.preventDefault();

    setCarregandoPedido(true);
    setErroPedido(false);

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
        setPedido("");

        const file = new Blob([response.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      })
      .catch((error) => {
        switch (error.response.status) {
          case 401:
            navigate("/");
            break;
          case 404:
            setErroPedido(true);
            setMsgErroPedido("O pedido de venda informado não foi encontrado.");
            break;
        }
      })
      .finally(() => {
        setCarregandoPedido(false);
      });
  };

  const inputNumerico = (value, setFunction) => {
    if (value.match("^[0-9]*$")) {
      setFunction(value);
    }
  };

  return (
    <>
      <Background>
        <Menu logged={true} />
        <CenterHorizontally>
          <CenterVertically>
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
                      className="text-center"
                      type="text"
                      placeholder="Número do pedido de venda"
                      value={pedido}
                      onChange={(e) => inputNumerico(e.target.value, setPedido)}
                      required
                    />
                  </Form.Group>
                  {erroPedido && (
                    <p className="text-danger text-center">{msgErroPedido}</p>
                  )}
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
                    Insira o SKU do produto e a quantidade de cópias desejada.
                  </p>
                )}

                {!etiquetaSimples && (
                  <p className="mt-3">
                    Insira o SKU e a quantidade do produto neste pedido de
                    venda.
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
                        onChange={(e) => inputNumerico(e.target.value, setSku)}
                        required
                      />
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3">
                      <Form.Control
                        type="number"
                        placeholder={etiquetaSimples ? "Cópias" : "Quantidade"}
                        className="text-center"
                        value={quantidade}
                        onChange={(e) =>
                          inputNumerico(e.target.value, setQuantidade)
                        }
                        required
                      />
                    </Form.Group>
                  </Row>
                  {erroProduto && (
                    <p className="text-danger text-center">{msgErroProduto}</p>
                  )}
                  <Form.Group className="mt-3">
                    <Form.Check
                      type="checkbox"
                      label="Imprimir como pedido de venda"
                      value={etiquetaSimples}
                      onChange={(e) => setEtiquetaSimples(!e.target.checked)}
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
          </CenterVertically>
        </CenterHorizontally>
      </Background>
    </>
  );
}

export default Etiquetas;
