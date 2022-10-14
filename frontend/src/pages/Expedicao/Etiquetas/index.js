import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import api from "../../../services/api";
import { AuthContext } from "../../../contexts/auth";

import Background from "../../../components/Binx/Background";
import Page from "../../../components/Binx/Page";
import LoadingButton from "../../../components/Binx/LoadingButton";
import Menu from "../../../components/Binx/Menu";
import BinxCard from "../../../components/Binx/BinxCard";

import { Form, Row, Button, Spinner, Col, Container } from "react-bootstrap";

const Card = styled(BinxCard)`
  max-width: 30%;
`;

function Etiquetas() {
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();

  const [sku, setSku] = useState("");
  const [pedido, setPedido] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [etiquetaSimples, setEtiquetaSimples] = useState(true);
  const [skuEstrutura, setSkuEstrutura] = useState("");

  const [carregandoPedido, setCarregandoPedido] = useState(false);
  const [carregandoProduto, setCarregandoProduto] = useState(false);
  const [carregandoEstrutura, setCarregandoEstrutura] = useState(false);

  const [erroPedido, setErroPedido] = useState(false);
  const [msgErroPedido, setMsgErroPedido] = useState("");

  const [erroProduto, setErroProduto] = useState(false);
  const [msgErroProduto, setMsgErroProduto] = useState("");

  const [erroEstrutura, setErroEstrutura] = useState(false);
  const [msgErroEstrutura, setMsgErroEstrutura] = useState("");

  const etiquetaProduto = async (event) => {
    event.preventDefault();

    setCarregandoProduto(true);
    setErroProduto(false);

    await api
      .get("/expedicao/etiqueta/produto", {
        params: {
          idsku: sku,
          quantidade: quantidade,
          etiquetaSimples: etiquetaSimples,
        },
        headers: {
          authorization: `Bearer ${userContext.accessToken}`,
        },
        responseType: "blob",
      })
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
          default:
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
      .get("/expedicao/etiqueta/pedido", {
        params: {
          pedido,
        },
        headers: {
          authorization: `Bearer ${userContext.accessToken}`,
        },
        responseType: "blob",
      })
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
            setMsgErroPedido("O pedido de venda não foi encontrado.");
            break;
        }
      })
      .finally(() => {
        setCarregandoPedido(false);
      });
  };

  const etiquetaEstrutura = async (event) => {
    event.preventDefault();

    setCarregandoEstrutura(true);
    setErroEstrutura(false);

    await api
      .get("/expedicao/etiqueta/estrutura", {
        params: {
          idsku: skuEstrutura,
        },
        headers: {
          authorization: `Bearer ${userContext.accessToken}`,
        },
        responseType: "blob",
      })
      .then((response) => {
        setSkuEstrutura("");

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
            setErroEstrutura(true);
            setMsgErroEstrutura("A estrutura informada não foi encontrada.");
            break;
        }
      })
      .finally(() => {
        setCarregandoEstrutura(false);
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
        <Page>
          <Page.Body>
            <Page.Content noSidebar>
              <Row className="m-0 d-flex justify-content-around mt-5">
                <Card className="p-5">
                  <h5>Etiquetas por Pedido de Venda</h5>
                  <p className="mt-3">
                    Insira o número do pedido de venda para imprimir as
                    etiquetas dos produtos.
                  </p>
                  <Form className="mt-4" onSubmit={etiquetaPedido}>
                    <Form.Group className="mb-3">
                      <Form.Control
                        className="text-center"
                        type="text"
                        placeholder="Número do pedido de venda"
                        value={pedido}
                        onChange={(e) =>
                          inputNumerico(e.target.value, setPedido)
                        }
                        required
                      />
                    </Form.Group>
                    {erroPedido && (
                      <p className="text-danger">{msgErroPedido}</p>
                    )}
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
                </Card>
                <Card className="p-5">
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
                          onChange={(e) =>
                            inputNumerico(e.target.value, setSku)
                          }
                          required
                        />
                      </Form.Group>

                      <Form.Group as={Col} className="mb-3">
                        <Form.Control
                          type="number"
                          placeholder={
                            etiquetaSimples ? "Cópias" : "Quantidade"
                          }
                          className="text-center"
                          value={quantidade}
                          onChange={(e) =>
                            inputNumerico(e.target.value, setQuantidade)
                          }
                          required
                          min={1}
                        />
                      </Form.Group>
                    </Row>
                    {erroProduto && (
                      <p className="text-danger">{msgErroProduto}</p>
                    )}
                    <Form.Group className="mt-2">
                      <Form.Check
                        type="checkbox"
                        label="Imprimir como pedido de venda"
                        value={etiquetaSimples}
                        onChange={(e) => setEtiquetaSimples(!e.target.checked)}
                      />
                    </Form.Group>
                    <Container
                      fluid
                      className="mt-3 p-0 d-flex justify-content-end align-items-stretch"
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
                </Card>
                <Card className="p-5">
                  <h5>Etiqueta de Estrutura</h5>

                  <p className="mt-3">
                    Insira o SKU do produto que contém a estrutura para imprimir
                    as etiquetas presentes no kit.
                  </p>

                  <Form className="mt-4" onSubmit={etiquetaEstrutura}>
                    <Row>
                      <Form.Group as={Col}>
                        <Form.Control
                          type="text"
                          placeholder="SKU da Estrutura"
                          className="text-center"
                          value={skuEstrutura}
                          onChange={(e) =>
                            inputNumerico(e.target.value, setSkuEstrutura)
                          }
                          required
                        />
                      </Form.Group>
                    </Row>

                    {erroEstrutura && (
                      <p className="text-danger mt-3">{msgErroEstrutura}</p>
                    )}

                    <Container
                      fluid
                      className="mt-4 mb-0 p-0 d-flex justify-content-end"
                    >
                      <Button variant="primary" type="submit" className="px-5">
                        {carregandoEstrutura && (
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        )}
                        {!carregandoEstrutura && <>Imprimir</>}
                      </Button>
                    </Container>
                  </Form>
                </Card>
              </Row>
            </Page.Content>
          </Page.Body>
        </Page>
      </Background>
    </>
  );
}

export default Etiquetas;
