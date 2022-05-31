import React, { useState } from "react";

import currency from "currency.js";

import Menu from "../../../components/Binx/Menu";
import ButtonBlock from "../../../components/ButtonBlock";

import api from "../../../services/api";

import DLogLogo from "../../../assets/dlog.png";
import CorreiosLogo from "../../../assets/correios.png";

import {
  Card,
  Badge,
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  ListGroup,
  Table,
  Alert,
  Figure,
  InputGroup,
} from "react-bootstrap";

// Funções auxiliares para manuseio de valores monetários
const BRL = (value, precision) => currency(value, { precision });
const formatBRL = (currency, symbol) =>
  currency
    .format({ symbol })
    .replace(",", "+")
    .replace(".", ",")
    .replace("+", ".");

function FreteVendas() {
  const [numeroProposta, setNumeroProposta] = useState();

  const [carregando, setCarregando] = useState(false);
  const [respostaCarregada, setRespostaCarregada] = useState(false);

  const [metodosFrete, setMetodosFrete] = useState([]);
  const [dadosProposta, setDadosProposta] = useState([]);
  const [itensProposta, setItensProposta] = useState([]);

  const [possuiPesoZero, setPossuiPesoZero] = useState(false);

  const [erroFrete, setErroFrete] = useState(false);

  const calcularFrete = async (event) => {
    event.preventDefault();

    setCarregando(true);
    setRespostaCarregada(false);
    setErroFrete(false);

    setMetodosFrete([]);
    setDadosProposta([]);
    setItensProposta([]);
    setPossuiPesoZero(false);

    api
      .get(`/frete/${numeroProposta}`)
      .then((resposta) => {
        // Debug
        // console.log(resposta.data);

        // Formata CEP para exibição
        const inicioCep = resposta.data.cep.substring(0, 5);
        const finalCep = resposta.data.cep.substring(5, 8);
        resposta.data.cep = inicioCep + "-" + finalCep;

        // Dados brutos completos
        setDadosProposta(resposta.data);

        // Informações de frete, se existirem
        if (resposta.data.hasOwnProperty("frete")) {
          setMetodosFrete(resposta.data.frete);
        }

        // Informações de itens, se existirem
        if (resposta.data.hasOwnProperty("itens")) {
          setItensProposta(resposta.data.itens);
        }

        // Verifica se possui pesos zero
        if (resposta.data.hasOwnProperty("possuiPesoZero")) {
          setPossuiPesoZero(resposta.data["possuiPesoZero"]);
        }

        // Finaliza indicadores de loading
        setCarregando(false);
        setRespostaCarregada(true);
      })
      .catch((error) => {
        console.log("Erro na chamada de API");
        setCarregando(false);
        setErroFrete(true);
      });
  };

  return (
    <>
      <Menu logged={true} />

      <Container className="mt-4">
        <Row>
          <Col>
            <Row className="justify-content-center text-center">
              <Card style={{ width: "30rem" }} className="mb-4 p-0">
                <Card.Header>Proposta Comercial</Card.Header>
                <Card.Body className="p-4">
                  <Card.Text>
                    Insira o número da proposta para realizar o cálculo de frete
                  </Card.Text>

                  <Form onSubmit={calcularFrete}>
                    <Row className="align-items-center">
                      <Col xs="6">
                        <Form.Group>
                          <Form.Control
                            type="text"
                            onChange={(e) => setNumeroProposta(e.target.value)}
                            placeholder="Número da Proposta"
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
                            {!carregando && <>Calcular</>}
                          </Button>
                        </ButtonBlock>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Row>
            <Row className="justify-content-md-center">
              <Card style={{ width: "30rem" }} className="p-0">
                <Card.Header className="text-center">Resultados</Card.Header>
                <Card.Body>
                  {/* Pesquisa carregando */}
                  {carregando && (
                    <Container className="text-center">
                      <Spinner animation="border" role="status" />
                    </Container>
                  )}

                  {/* Falha no carregamendo da proposta */}
                  {erroFrete && (
                    <Alert className="text-center" variant="danger">
                      Não foi possível localizar os dados para a proposta
                      comercial informada.
                    </Alert>
                  )}

                  {/* Resposta Carregada com sucesso */}
                  {respostaCarregada && (
                    <>
                      <Container className="text-center mb-3">
                        <Badge bg="primary">Métodos de Frete Disponíveis</Badge>
                      </Container>

                      {possuiPesoZero && (
                        <Alert className="text-center" variant="danger">
                          Um ou mais itens da proposta não possuem informação de
                          peso.
                        </Alert>
                      )}

                      {metodosFrete.length == 0 && (
                        <>
                          <ListGroup className="my-2">
                            <ListGroup.Item>
                              Nenhum método de frete encontrado.
                            </ListGroup.Item>
                          </ListGroup>
                        </>
                      )}

                      {metodosFrete.length > 0 &&
                        metodosFrete.map((metodo) => (
                          <>
                            <ListGroup key={metodo.preco} className="my-2">
                              <ListGroup.Item>
                                {/* Logo de Transportadoras */}
                                {metodo.transportadora == "DLog" && (
                                  <Figure.Image
                                    width={30}
                                    alt="DLog Bling"
                                    src={DLogLogo}
                                    className="m-0 p-0 mr-2"
                                  />
                                )}
                                {metodo.transportadora == "Correios" && (
                                  <Figure.Image
                                    width={30}
                                    alt="DLog Bling"
                                    src={CorreiosLogo}
                                    className="m-0 p-0 mr-2"
                                  />
                                )}
                                {/* Dados do frete */}
                                {!metodo.erro && (
                                  <>
                                    {metodo.transportadora} - {metodo.servico} -{" "}
                                    {metodo.prazo} dias úteis -{" "}
                                    <Badge bg="success">
                                      {formatBRL(BRL(metodo.preco, 2), "R$")}
                                    </Badge>
                                  </>
                                )}
                                {metodo.erro && (
                                  <>
                                    {metodo.transportadora} - {metodo.servico} -{" "}
                                    {metodo.mensagem}
                                  </>
                                )}
                              </ListGroup.Item>
                            </ListGroup>
                          </>
                        ))}

                      <Container className="text-center my-3">
                        <Badge bg="primary">Dados da Proposta</Badge>
                      </Container>

                      <Container>
                        <ListGroup as="ul" className="mb-3">
                          <ListGroup.Item as="li" variant="success">
                            <Row>
                              <Col>
                                <strong>Número da Proposta:</strong>
                              </Col>
                              <Col> {dadosProposta.numeroProposta}</Col>
                            </Row>
                          </ListGroup.Item>
                          <ListGroup.Item as="li">
                            <Row>
                              <Col>
                                <strong>Sub Total:</strong>
                              </Col>
                              <Col>
                                {" "}
                                {formatBRL(
                                  BRL(dadosProposta.totalprodutos, 2),
                                  "R$"
                                )}
                              </Col>
                            </Row>
                          </ListGroup.Item>
                          <ListGroup.Item as="li">
                            <Row>
                              <Col>
                                <strong>Vendedor:</strong>
                              </Col>
                              <Col> {dadosProposta.vendedor}</Col>
                            </Row>
                          </ListGroup.Item>
                        </ListGroup>
                        <ListGroup as="ul">
                          <ListGroup.Item as="li" variant="success">
                            <strong>Cliente:</strong> {dadosProposta.cliente}
                          </ListGroup.Item>
                          <ListGroup.Item as="li">
                            <strong>Endereço: </strong>
                            {dadosProposta.endereco}, {dadosProposta.numero},{" "}
                            {dadosProposta.bairro} - {dadosProposta.cidade},{" "}
                            {dadosProposta.uf}
                          </ListGroup.Item>
                          <ListGroup.Item as="li">
                            <Row>
                              <Col>
                                <strong>CEP: </strong> {dadosProposta.cep}
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        </ListGroup>
                      </Container>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Row>
          </Col>
          <Col>
            <Row className="justify-content-md-center">
              <Card style={{ width: "40rem" }} className="p-0">
                <Card.Header className="text-center">
                  Itens na Proposta Comercial
                </Card.Header>
                <Card.Body>
                  {possuiPesoZero && (
                    <Alert className="text-center" variant="danger">
                      Um ou mais itens da proposta não possuem informação de
                      peso.
                    </Alert>
                  )}

                  {/* Indicador de pesquisa em andamento */}
                  {carregando && (
                    <Container className="text-center">
                      <Spinner animation="border" role="status" />
                    </Container>
                  )}

                  {respostaCarregada && (
                    <>
                      <Table hover bordered size="md">
                        <thead>
                          <tr>
                            <th>SKU</th>
                            <th>Descrição</th>
                            <th>Qntd.</th>
                            <th>Peso</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {itensProposta.map((item) => (
                            <tr key={item.idsku}>
                              <td>{item.idsku}</td>
                              <td>{item.nome}</td>
                              <td>{item.quantidade}</td>
                              <td>{item.peso}</td>
                              <td>{item.pesoTotal}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>

                      {/* <TabelaItensProposta itens={itensProposta} /> */}

                      <ListGroup className="text-center">
                        <ListGroup.Item>
                          Peso total:{" "}
                          <Badge bg="primary">
                            {dadosProposta.pesoTotalProposta}
                          </Badge>{" "}
                          Kg
                        </ListGroup.Item>
                      </ListGroup>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default FreteVendas;
