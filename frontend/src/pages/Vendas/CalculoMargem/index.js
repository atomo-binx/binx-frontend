import React, { useRef, useState, useEffect } from "react";
import Menu from "../../components/Binx/Menu";

import currency from "currency.js";

import api from "../../services/api";

import "react-bootstrap-drawer/lib/style.css";
import { Drawer } from "react-bootstrap-drawer";

import ButtonBlock from "../../components/ButtonBlock";

import {
  Card,
  Badge,
  Container,
  Row,
  Form,
  Button,
  Col,
  Table,
  Spinner,
  Alert,
  Collapse,
} from "react-bootstrap";

// Funções auxiliares para manuseio de valores monetários
const BRL = (value, precision) => currency(value, { precision });
const formatBRL = (currency, symbol) =>
  currency
    .format({ symbol })
    .replace(",", "+")
    .replace(".", ",")
    .replace("+", ".");

function CalculoMargem() {
  const [tipoCalculo, setTipoCalculo] = useState("proposta");
  const [identificador, setIdentificador] = useState("");

  const [dados, setDados] = useState([]);
  const [itens, setItens] = useState([]);

  const [qntdItens, setQntdItens] = useState(0);

  const [carregando, setCarregando] = useState(false);
  const [respostaCarregada, setRespostaCarregada] = useState(false);

  const [custos, setCustos] = useState([]);
  const [margens, setMargens] = useState([]);

  const [margemAtual, setMargemAtual] = useState(0);

  const formRef = useRef(null);

  const alterarMargem = (index, value) => {
    // Prepara o valor de value para ser trabalhado como número
    value = value.replace(",", ".");

    // Adquire valores atuais das arrays nos states
    let arrayCustos = [...custos];
    let arrayMargens = [...margens];

    // Atualiza valor de custo
    arrayCustos[index] = value;

    // Calcula nova margem
    let valorVenda = itens[index].valorUnidade;
    let valorCusto = arrayCustos[index];
    let margem = parseFloat(
      ((valorVenda - valorCusto) / valorVenda) * 100
    ).toFixed(2);

    // Margem = ( Custo / Venda ) - 1

    // Atualiza valor de margem
    arrayMargens[index] = margem;

    // Calcula margem atual do pedido completo

    // A margem total deve levar em consideração o pedido completo
    // Deve ser calculado custo * quantidade, e então calculado em relação ao valor subTotal

    // let custoTotal = arrayCustos.reduce(function (acc, val) {
    //   return BRL(acc, 3).add(val);
    // }, 0);

    // let margemTotal = parseFloat(
    //   ((dados.subTotal - custoTotal) / dados.subTotal) * 100
    // ).toFixed(2);

    // Atualiza os states
    setCustos(arrayCustos);
    setMargens(arrayMargens);
  };

  const carregarDados = async (event) => {
    event.preventDefault();

    // Configura flags de carregamento
    setCarregando(true);
    setRespostaCarregada(false);

    // Reseta valores prévios de margem e de custo
    setCustos([]);
    setMargens([]);

    // Realiza reset dos valores dos campos de custos:
    // Os campos de <Form.Control> criados programaticamente são reutilizados
    // Caso o usuario busque uma nova proposta após editar um custo, o valor anterior será mantido
    // É necessário encapsular a tabela de custos/margens em um <Form> e realizar o reset via useRef
    if (formRef.current != null) formRef.current.reset();

    // Define URL Alvo para disparo da API para proposta comercial ou pedido de venda
    const urlAlvo =
      tipoCalculo === "proposta" ? "margemproposta" : "margempedido";

    await api
      .post(`/${urlAlvo}/${identificador}`)
      .then((resposta) => {
        // Carrega todos os dados da proposta/pedido
        setDados(resposta.data);

        // Carrega itens
        setItens(resposta.data.itens);

        // Altera variavel de estado para contar a quantidade total de itens
        setQntdItens(resposta.data.itens.length);

        setRespostaCarregada(true);
      })
      .catch((error) => {
        console.log("Erro ao carregar proposta/pedido:", error.message);
      });

    setCarregando(false);
  };

  return (
    <>
      <Menu logged={true} />

      <Container fluid>
        <Row className="flex-xl-nowrap">
          {/* Drawer */}
          <Col xs={12} md={3} lg={2} className="p-0">
            <Drawer>
              <Drawer.Toggle />
              <Collapse>
                <Drawer.Overflow>
                  <Drawer.ToC>
                    <Drawer.Header className="text-center">
                      Cálculo de Margem
                    </Drawer.Header>

                    <Drawer.Nav>
                      <Drawer.Item>
                        <hr className="m-0 my-2" />
                      </Drawer.Item>
                      <Drawer.Item>
                        <p className="text-muted text-center">Dados:</p>

                        <Form onSubmit={carregarDados}>
                          <Form.Control
                            as="select"
                            custom
                            onChange={(event) =>
                              setTipoCalculo(event.target.value)
                            }
                            className="mb-3"
                          >
                            <option value="proposta">Proposta</option>
                            <option value="pedido" disabled>
                              Pedido
                            </option>
                          </Form.Control>
                          <Form.Control
                            placeholder="Número"
                            onChange={(event) => {
                              setIdentificador(event.target.value);
                            }}
                            className="mb-3"
                          />
                          <ButtonBlock>
                            <Button variant="primary" type="submit" block>
                              {carregando && (
                                <Spinner
                                  animation="border"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                />
                              )}
                              {!carregando && <>Carregar</>}
                            </Button>
                          </ButtonBlock>
                        </Form>
                      </Drawer.Item>
                      <Drawer.Item>
                        <hr className="m-0 my-2" />
                      </Drawer.Item>
                      {respostaCarregada && !carregando && (
                        <>
                          <Drawer.Item>
                            <p className="text-muted text-center">
                              Alterações:
                            </p>

                            <ButtonBlock>
                              <Button variant="outline-success" block disabled>
                                Salvar no Binx
                              </Button>
                            </ButtonBlock>
                          </Drawer.Item>
                          <Drawer.Item>
                            <ButtonBlock>
                              <Button variant="outline-primary" block disabled>
                                Exportar
                              </Button>
                            </ButtonBlock>
                          </Drawer.Item>
                        </>
                      )}
                    </Drawer.Nav>
                  </Drawer.ToC>
                </Drawer.Overflow>
              </Collapse>
            </Drawer>
          </Col>

          <Col xs={12} md={9} lg={10}>
            {/* <Card className="p-3 my-3"> */}
            <Container fluid className="mt-4">
              <Card.Title className="mt-2">Cálculo de Margem</Card.Title>
              <Card.Subtitle className="my-2 text-muted">
                Calcular margem sobre proposta comercial ou pedido de venda
              </Card.Subtitle>

              {!respostaCarregada && !carregando && (
                <Alert variant="warning" className="mt-3">
                  Selecione o tipo de cálculo a ser realizado e carregue o
                  pedido ou proposta para visualizar os resultados
                </Alert>
              )}
            </Container>

            {!respostaCarregada && carregando && (
              <Container fluid className="text-center mt-4">
                <Spinner
                  animation="border"
                  size="md"
                  role="status"
                  aria-hidden="true"
                />
              </Container>
            )}

            <Card.Body>
              {respostaCarregada && !carregando && (
                <>
                  <hr className="m-0 mb-4" />

                  <Container fluid className="p-0">
                    <h5>
                      Dados{" "}
                      {tipoCalculo === "proposta"
                        ? "da Proposta"
                        : "do Pedido de Venda"}
                    </h5>
                    <p className="text-muted">
                      Dados referentes{" "}
                      {tipoCalculo === "proposta"
                        ? "a proposta comercial"
                        : "ao pedido de compra"}
                    </p>
                  </Container>

                  <Row>
                    <Col sm={2}>
                      <Form.Group>
                        <Form.Label className="text-muted">
                          Proposta:
                        </Form.Label>
                        <Form.Control
                          size="sm"
                          value={dados.numeroProposta}
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group>
                        <Form.Label className="text-muted">Cliente:</Form.Label>
                        <Form.Control
                          size="sm"
                          value={dados.cliente}
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={2}>
                      <Form.Group>
                        <Form.Label className="text-muted">
                          Vendedor:
                        </Form.Label>
                        <Form.Control
                          size="sm"
                          value={dados.vendedor}
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={2}>
                      <Form.Group>
                        <Form.Label className="text-muted">
                          Situação:
                        </Form.Label>
                        <Form.Control
                          size="sm"
                          value={dados.situacao}
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={2}>
                      <Form.Group>
                        <Form.Label className="text-muted">
                          Quantidade de Itens:
                        </Form.Label>
                        <Form.Control size="sm" value={qntdItens} readOnly />
                      </Form.Group>
                    </Col>
                    <Col sm={2}>
                      <Form.Group>
                        <Form.Label className="text-muted">
                          Valor dos itens:
                        </Form.Label>
                        <Form.Control
                          size="sm"
                          value={formatBRL(BRL(dados.subTotal, 2), "R$")}
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={2}>
                      <Form.Group>
                        <Form.Label className="text-muted">
                          Valor do Frete:
                        </Form.Label>
                        <Form.Control
                          size="sm"
                          value={formatBRL(BRL(dados.frete, 2), "R$")}
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={2}>
                      <Form.Group>
                        <Form.Label className="text-muted">
                          Total da Proposta:
                        </Form.Label>
                        <Form.Control
                          size="sm"
                          value={formatBRL(BRL(dados.total, 2), "R$")}
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={2}>
                      <Form.Group>
                        <Form.Label className="text-muted">
                          Margem Salva:
                        </Form.Label>
                        <Form.Control size="sm" value="" readOnly />
                      </Form.Group>
                    </Col>
                    <Col sm={2}>
                      <Form.Group>
                        <Form.Label className="text-muted">
                          Margem Atual:
                        </Form.Label>
                        <Form.Control size="sm" value="" readOnly />
                      </Form.Group>
                    </Col>
                  </Row>

                  <hr />

                  <Container className="mb-4 p-0">
                    <h5>
                      Itens{" "}
                      {tipoCalculo === "proposta"
                        ? "da Proposta"
                        : "do Pedido de Venda"}
                    </h5>
                    <p className="text-muted">
                      Itens presentes{" "}
                      {tipoCalculo === "proposta"
                        ? "na Proposta Comercial"
                        : "no Pedido de Compra"}
                    </p>
                  </Container>

                  <Form ref={formRef}>
                    <Table hover size="sm">
                      <thead>
                        <tr>
                          <th></th>
                          <th>SKU</th>
                          <th>Item</th>
                          <th>Qntd</th>
                          <th>Preço Lista</th>
                          <th>Desc %</th>
                          <th>Preço Un</th>
                          <th>Preço Total</th>
                          <th>Custo Un.</th>
                          <th>Custo Total</th>
                          <th>Margem</th>
                        </tr>
                      </thead>
                      <tbody>
                        {itens.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <Badge bg="secondary">{index + 1}</Badge>
                            </td>
                            <td>{item.sku}</td>
                            <td>{item.nome}</td>
                            <td>{item.quantidade}</td>
                            <td>{formatBRL(BRL(item.precoLista, 3), "")}</td>
                            <td>{item.descontoItem.replace(".", ",")}</td>
                            <td>{formatBRL(BRL(item.valorUnidade, 3), "")}</td>
                            <td>
                              {formatBRL(
                                BRL(item.valorUnidade, 2).multiply(
                                  item.quantidade
                                ),
                                ""
                              )}
                            </td>
                            <td>
                              {/* Form de custo */}
                              <Form.Control
                                size="sm"
                                type="text"
                                htmlSize="6"
                                onChange={(event) =>
                                  alterarMargem(index, event.target.value)
                                }
                              />
                            </td>
                            <td></td>
                            <td>
                              {/* Form de margem */}
                              <Form.Control
                                size="sm"
                                type="text"
                                htmlSize="6"
                                readOnly={true}
                                value={
                                  margens[index] == undefined
                                    ? ""
                                    : margens[index] + "%"
                                }
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Form>
                </>
              )}
            </Card.Body>
            {/* </Card> */}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CalculoMargem;
