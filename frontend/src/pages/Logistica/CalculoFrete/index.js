import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import Background from "../../../components/Binx/Background";
import Page from "../../../components/Binx/Page";
import Sidebar from "../../../components/Binx/Sidebar";
import ContentCard from "../../../components/Binx/ContentCard";
import Menu from "../../../components/Binx/Menu";
import LoadingButton from "../../../components/Binx/LoadingButton";

import api from "../../../services/api";

import { Form, Row, Col, Container } from "react-bootstrap";
import { AuthContext } from "../../../contexts/auth";
import { BRLString } from "../../../util/money";

import BootstrapTable from "react-bootstrap-table-next";

import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

import {
  BsFillCaretDownFill,
  BsFillCaretUpFill,
  BsCaretDown,
  BsCaretUp,
} from "react-icons/bs";

import LogoCorreios from "../../../assets/transportadoras/correios.png";
import LogoDlog from "../../../assets/transportadoras/dlog.png";

const GreyPill = styled.div`
  background-color: #e9e9e9;
  border-radius: 17px;
`;

const MoneyAmount = styled.span`
  color: #28a745;
`;

const LogoTransportadora = styled.img`
  width: 20px;
  border-radius: 20%;
  margin-right: 15px;
`;

function CalculoFrete() {
  const user = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [numero, setNumero] = useState("");
  const [tipo, setTipo] = useState("pedido");
  const [resultado, setResultado] = useState(null);

  const [columns, setColumns] = useState(null);

  const calcularFrete = (e) => {
    e.preventDefault();

    setLoading(true);

    api
      .get("/logistica/frete", {
        params: {
          numero,
          tipo,
        },
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setColumns([
          {
            dataField: "idsku",
            text: "SKU",
            headerStyle: {
              width: "4%",
            },
            filter: textFilter({
              placeholder: "SKU",
              style: {
                fontSize: "0.8rem",
              },
            }),
          },
          {
            dataField: "nome",
            text: "Produto",
            headerStyle: {
              width: "25%",
            },
            filter: textFilter({
              placeholder: "Produto",
              style: {
                fontSize: "0.8rem",
              },
            }),
          },
          {
            dataField: "quantidade",
            text: "Qntd",
            headerStyle: {
              width: "4%",
            },
            sort: true,
          },
          {
            dataField: "peso",
            text: "Peso",
            headerStyle: {
              width: "4%",
            },
            sort: true,
          },
          {
            dataField: "pesoTotal",
            text: "Total",
            headerStyle: {
              width: "4%",
            },
            sort: true,
          },
        ]);

        setResultado(res.data.response.logistica);

        console.log(res.data.response.logistica.metodosFrete);
      })
      .catch((error) => {
        console.log(error.message);
      })
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Background>
        <Menu logged={true} />
        <Page>
          <Page.Body>
            <Sidebar startOpen={true}>
              <Sidebar.Title>Opções</Sidebar.Title>

              {/* <Sidebar.Subtitle>Selecionar Modalidade</Sidebar.Subtitle> */}

              <Form onSubmit={calcularFrete}>
                <Sidebar.Item>
                  <Form.Label>Selecionar Modalidade</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    size="sm"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                  >
                    <option>Selecionar</option>
                    <option value="pedido">Pedido de Venda</option>
                    <option value="proposta">Proposta Comercial</option>
                  </Form.Select>
                </Sidebar.Item>

                <Sidebar.Item>
                  <Form.Group className="mb-3">
                    <Form.Label>Número</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Número"
                      size="sm"
                      value={numero}
                      onChange={(e) => setNumero(e.target.value)}
                    />
                  </Form.Group>
                </Sidebar.Item>

                <Sidebar.Item>
                  <LoadingButton
                    block={true}
                    size="sm"
                    type="submit"
                    loading={loading}
                  >
                    Calcular
                  </LoadingButton>
                </Sidebar.Item>
              </Form>
            </Sidebar>
            <Page.Content>
              <Page.Title>Cálculo de Frete</Page.Title>
              <Page.Subtitle className="text-muted">
                Calcular métodos de frete para um pedido de venda ou proposta
                comercial.
              </Page.Subtitle>
              <ContentCard>
                {resultado && (
                  <>
                    <Row>
                      <Col md={5} className="px-4">
                        <Row>
                          <Container fluid className="text-center mb-4">
                            <h6>
                              Dados{" "}
                              {tipo === "pedido" ? "do Pedido" : "da Proposta"}
                            </h6>
                          </Container>
                          <Container
                            fluid
                            className="d-flex justify-content-between mb-2"
                          >
                            <strong>
                              Número{" "}
                              {tipo === "pedido" ? "do Pedido" : "da Proposta"}:
                            </strong>
                            <strong>
                              {tipo === "pedido"
                                ? resultado.venda.idpedidovenda
                                : resultado.venda.numeroProposta}
                            </strong>
                          </Container>
                          <Container
                            fluid
                            className="d-flex justify-content-between mb-2"
                          >
                            <strong>Cliente:</strong>
                            <strong>{resultado.venda.cliente}</strong>
                          </Container>
                          <Row className="d-flex justify-content-between p-0 mb-2 mx-0">
                            <Col md={2}>
                              <span>Subtotal:</span>
                            </Col>

                            <Col>
                              <Form.Control
                                type="text"
                                disabled
                                size="sm"
                                className="d-flex flex-row-reverse"
                                value={BRLString(
                                  tipo === "pedido"
                                    ? resultado.venda.totalvenda
                                    : resultado.venda.total,
                                  "R$ "
                                )}
                              />
                            </Col>
                          </Row>
                          {resultado.venda.vendedor && (
                            <Row className="d-flex justify-content-between p-0 mb-2 mx-0">
                              <Col md={2}>
                                <span>Vendedor:</span>
                              </Col>

                              <Col>
                                <Form.Control
                                  type="text"
                                  disabled
                                  size="sm"
                                  className="d-flex flex-row-reverse"
                                  value={resultado.venda.vendedor}
                                />
                              </Col>
                            </Row>
                          )}
                          <Row className="d-flex justify-content-between p-0 mb-2 mx-0">
                            <Col md={2}>
                              <span>Endereço:</span>
                            </Col>

                            <Col>
                              <Form.Control
                                type="text"
                                disabled
                                size="sm"
                                className="d-flex flex-row-reverse"
                                value={resultado.venda.endereco}
                              />
                            </Col>
                          </Row>
                          <Row className="d-flex justify-content-between p-0 mb-2 mx-0">
                            <Col md={2}>
                              <span>CEP:</span>
                            </Col>

                            <Col>
                              <Form.Control
                                type="text"
                                disabled
                                size="sm"
                                className="d-flex flex-row-reverse"
                                value={resultado.venda.cep.replace(".", "")}
                              />
                            </Col>
                          </Row>
                          <Container fluid className="mt-4">
                            <GreyPill className="d-flex justify-content-between p-3">
                              <span>Peso Total</span>
                              <strong>
                                {resultado.pesoTotal.replace(".", ",")} kg
                              </strong>
                            </GreyPill>
                          </Container>
                          {tipo === "pedido" && (
                            <Container fluid className="mt-4">
                              <GreyPill className="d-flex justify-content-between p-3">
                                <span>Prazo Solicitado</span>
                                <strong>
                                  {resultado.prazoSolicitado} dias
                                </strong>
                              </GreyPill>
                            </Container>
                          )}
                        </Row>
                        <Row>
                          <Container fluid className="text-center mt-4">
                            <h6>Métodos de Frete Disponíveis</h6>
                          </Container>
                          <Container fluid className="mt-2">
                            {resultado.metodosFrete.map((metodo) => {
                              const prazo =
                                metodo.tipo === "pedido"
                                  ? metodo.prazoGordura
                                  : metodo.prazoOriginal;
                              const diasUteis =
                                prazo > 1 ? "dias úteis" : "dia útil";

                              return (
                                <GreyPill
                                  className="d-flex justify-content-between p-3 mb-2 align-items-center"
                                  key={metodo.servicoTraduzido}
                                >
                                  <div>
                                    <LogoTransportadora
                                      alt={"Logo Transportadora"}
                                      src={
                                        metodo.transportadora === "Correios"
                                          ? LogoCorreios
                                          : LogoDlog
                                      }
                                    />
                                    <span>
                                      {metodo.transportadora} - {metodo.servico}{" "}
                                      ({metodo.servicoTraduzido}) - {prazo}{" "}
                                      {diasUteis}
                                    </span>
                                  </div>
                                  <MoneyAmount>
                                    <strong>
                                      {BRLString(metodo.preco, "R$ ")}
                                    </strong>
                                  </MoneyAmount>
                                </GreyPill>
                              );
                            })}
                          </Container>
                        </Row>
                        <Row>
                          {tipo === "pedido" && (
                            <Container fluid>
                              <Container
                                fluid
                                className="text-center mt-4 mb-3"
                              >
                                <h6>Método de Frete Escolhido</h6>
                              </Container>
                              {resultado.metodoEscolhido && (
                                <GreyPill
                                  className="d-flex justify-content-between p-3 align-items-center"
                                  key={
                                    resultado.metodoEscolhido.servicoTraduzido
                                  }
                                >
                                  <div>
                                    <LogoTransportadora
                                      alt={"Logo Transportadora"}
                                      src={
                                        resultado.metodoEscolhido
                                          .transportadora === "Correios"
                                          ? LogoCorreios
                                          : LogoDlog
                                      }
                                    />
                                    <span>
                                      {resultado.metodoEscolhido.transportadora}{" "}
                                      - {resultado.metodoEscolhido.servico} (
                                      {
                                        resultado.metodoEscolhido
                                          .servicoTraduzido
                                      }
                                      )
                                    </span>
                                  </div>
                                  <MoneyAmount>
                                    <strong>
                                      {BRLString(
                                        resultado.metodoEscolhido.preco,
                                        "R$ "
                                      )}
                                    </strong>
                                  </MoneyAmount>
                                </GreyPill>
                              )}
                            </Container>
                          )}
                        </Row>
                      </Col>
                      <Col className="px-4">
                        <Container fluid className="text-center mb-4">
                          <h6>
                            Itens{" "}
                            {tipo === "pedido" ? "do Pedido" : "da Proposta"}
                          </h6>
                        </Container>
                        <BootstrapTable
                          classes="table-sm"
                          keyField="idsku"
                          data={resultado.itens}
                          columns={columns}
                          hover
                          bordered={false}
                          filter={filterFactory()}
                          filterPosition={"top"}
                          noDataIndication="Nenhum Resultado Encontrado"
                          rowStyle={{ cursor: "pointer" }}
                          sort={{
                            sortCaret: (order, column) => {
                              if (!order)
                                return (
                                  <>
                                    <BsCaretDown size={12} />
                                    <BsCaretUp size={12} />
                                  </>
                                );
                              else if (order === "asc")
                                return (
                                  <>
                                    <BsCaretDown size={12} />
                                    <BsFillCaretUpFill size={12} />
                                  </>
                                );
                              else if (order === "desc")
                                return (
                                  <>
                                    <BsFillCaretDownFill size={12} />
                                    <BsCaretUp size={12} />
                                  </>
                                );
                              return null;
                            },
                          }}
                        />
                      </Col>
                    </Row>
                  </>
                )}
              </ContentCard>
            </Page.Content>
          </Page.Body>
        </Page>
      </Background>
    </>
  );
}

export default CalculoFrete;
