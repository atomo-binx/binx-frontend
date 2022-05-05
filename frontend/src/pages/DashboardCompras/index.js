import React, { useState, useEffect, useRef } from "react";

import Menu from "../../components/Menu";

import GraficoDisponibilidade from "../../components/DashCompras/GraficoDisponibilidade";
import HistoricoDisponibilidade from "../../components/DashCompras/HistoricoDisponibilidade";
import IndisponibilidadeCurva from "../../components/DashCompras/IndisponibilidadeCurva";
import DisponibilidadeCurva from "../../components/DashCompras/DisponibilidadeCurva";
import HistoricoCurvas from "../../components/DashCompras/HistoricoCurvas";

import api from "../../services/api";

import {
  Container,
  Card,
  Col,
  Row,
  Spinner,
  ListGroup,
  Badge,
  Carousel,
} from "react-bootstrap";

function DashboardCompras() {
  const [ativos, setAtivos] = useState();
  const [disponiveis, setDisponiveis] = useState();
  const [indisponiveis, setIndisponiveis] = useState();
  const [pDisponivel, setPDisponivel] = useState();
  const [pIndisponivel, setPIndisponivel] = useState();
  const [abaixoMin, setAbaixoMin] = useState();
  const [pAbaixoMin, setPAbaixoMin] = useState();
  const [disponibilidades, setDisponibilidades] = useState([]);

  const [indisponivelCurva, setIndisponivelCurva] = useState([]);
  const [pIndisponivelCurva, setPIndisponivelCurva] = useState([]);
  const [pDisponivelCurva, setPDisponivelCurva] = useState([]);
  const [disponibilidadesCurva, setDisponibilidadesCurva] = useState([]);

  const [carregado, setCarregado] = useState(false);

  const [carregaChamadaDash, setCarregaChamadaDash] = useState(0);

  const intervalo = useRef(null);

  const iniciaContador = () => {
    intervalo.current = setInterval(carregaDash, 180000);
  };

  const stopCounter = () => clearInterval(intervalo.current);

  useEffect(() => {
    carregaDash();
    iniciaContador();
  }, [carregaChamadaDash]);

  const carregaDash = async () => {
    const pathname = window.location.pathname;

    // Para o contador caso sai do escopo da página do dashboard de compras
    if (!pathname.includes("/compras/dashboard")) {
      stopCounter();
      return;
    }

    await api
      .get("/compras/dashboard")
      .then((res) => {
        // Desestrutura variáveis da resposta do dashboard
        // Nomes coerentes com os nomes do retorno da API
        const {
          ativos,
          disponiveis,
          indisponiveis,
          pdisponivel,
          pindisponivel,
          abaixoMin,
          pAbaixoMin,
          disponibilidades,
          pIndisponivelCurva,
          indisponivelPorCurva,
          pDisponivelPorCurva,
          disponiblidadesCurva,
        } = res.data;

        setAtivos(ativos);
        setDisponiveis(disponiveis);
        setIndisponiveis(indisponiveis);
        setPDisponivel(pdisponivel);
        setPIndisponivel(pindisponivel);
        setAbaixoMin(abaixoMin);
        setPAbaixoMin(pAbaixoMin);
        setDisponibilidades(disponibilidades);

        setIndisponivelCurva(indisponivelPorCurva);
        setPIndisponivelCurva(pIndisponivelCurva);
        setPDisponivelCurva(pDisponivelPorCurva);
        setDisponibilidadesCurva(disponiblidadesCurva);

        setCarregado(true);
      })
      .catch((error) => {
        console.log(
          "Erro na requisição de atualização dos dados da dashboard de compras"
        );
      });
  };

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <Menu logged={true} />

      {!carregado && (
        <Container fluid className="text-center container-binx">
          <Container fluid className="center-vertically">
            <Spinner
              animation="grow"
              size="md"
              role="status"
              aria-hidden="true"
            />
          </Container>
        </Container>
      )}

      {carregado && (
        <>
          <Carousel interval={null}>
            <Carousel.Item>
              <Container className="mt-4 p-4">
                {/* Primeira Linha */}
                <Row className="mb-4">
                  {/* Card de Produtos Disponíveis */}
                  <Col>
                    <Card className="text-center">
                      <Card.Header>Produtos Disponíveis</Card.Header>
                      <Card.Body>
                        <Card.Text>
                          Quantidade de produtos com estoque disponível para
                          venda
                        </Card.Text>
                        <ListGroup>
                          <ListGroup.Item className="p-2">
                            <Row>
                              <Col>
                                <h2>
                                  <Badge bg="success">{disponiveis}</Badge>
                                </h2>
                              </Col>
                              <Col>
                                <h2>
                                  <Badge bg="success">{pDisponivel}%</Badge>
                                </h2>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                          <ListGroup>
                            <ListGroup.Item className="mt-2">
                              Nossa meta é manter acima de:{" "}
                              <Badge bg="info">92%</Badge>
                            </ListGroup.Item>
                          </ListGroup>
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </Col>

                  {/* Gráfico de Disponibilidade */}
                  <Col>
                    <div style={{ height: "250px" }}>
                      <GraficoDisponibilidade
                        pDisponivel={pDisponivel}
                        pIndisponivel={pIndisponivel}
                      />
                    </div>
                  </Col>

                  {/* Card de Produtos Indisponíveis */}
                  <Col>
                    <Card className="text-center">
                      <Card.Header>Produtos Indisponíveis</Card.Header>
                      <Card.Body>
                        {/* <Card.Title>Produtos</Card.Title> */}
                        <Card.Text>
                          Quantidade de produtos sem estoque disponível para
                          venda
                        </Card.Text>
                        <ListGroup>
                          <ListGroup.Item className="p-2">
                            <Row>
                              <Col>
                                <h2>
                                  <Badge bg="danger">{indisponiveis}</Badge>
                                </h2>
                              </Col>
                              <Col>
                                <h2>
                                  <Badge bg="danger">{pIndisponivel}%</Badge>
                                </h2>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        </ListGroup>
                        <ListGroup>
                          <ListGroup.Item className="mt-2">
                            Nossa meta é manter abaixo de:{"  "}
                            <Badge bg="info">8%</Badge>
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                {/* Segunda Linha */}
                <Row className="mt-4 align-items-center">
                  {/* Quantidade Total de Produtos Ativos */}
                  <Col>
                    <Card className="text-center">
                      <Card.Header>Produtos Ativos</Card.Header>
                      <Card.Body>
                        <Card.Text>
                          Quantidade de produtos ativos no sistema
                        </Card.Text>
                        <ListGroup className="p-0">
                          <ListGroup.Item className="p-2">
                            <h2>
                              <Badge bg="primary">{ativos}</Badge>
                            </h2>
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </Col>

                  {/* Segundo Gráfico */}
                  <Col>
                    <div style={{ height: "350px" }}>
                      <HistoricoDisponibilidade
                        disponibilidades={disponibilidades}
                      />
                    </div>
                  </Col>

                  {/* Card de Situação de Estoque*/}
                  <Col>
                    <Card className="text-center">
                      <Card.Header>Situação de Estoque</Card.Header>
                      <Card.Body>
                        <Card.Text>
                          Produtos com estoque abaixo do mínimo
                        </Card.Text>
                        <ListGroup>
                          <ListGroup.Item className="p-2">
                            <Row>
                              <Col>
                                <h2>
                                  <Badge bg="warning">{abaixoMin}</Badge>
                                </h2>
                              </Col>
                              <Col>
                                <h2>
                                  <Badge bg="warning">{pAbaixoMin}%</Badge>
                                </h2>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </Carousel.Item>

            <Carousel.Item>
              <Container className="mt-4 p-0">
                <Row className="mt-4 align-items-center">
                  <Col>
                    <Card className="text-center">
                      <Card.Header>Indisponibilidade por Curva</Card.Header>
                      <Card.Body>
                        <Card.Text>Produtos Indisponíveis</Card.Text>
                        <ListGroup>
                          <ListGroup.Item className="p-2">
                            <Row className="align-items-end">
                              <Col>
                                Curva A
                                <h5>
                                  <Badge bg="success">
                                    {indisponivelCurva[0]}
                                  </Badge>
                                </h5>
                              </Col>
                              <Col>
                                Curva B
                                <h5>
                                  <Badge bg="info">
                                    {indisponivelCurva[1]}
                                  </Badge>
                                </h5>
                              </Col>
                              <Col>
                                Curva C
                                <h5>
                                  <Badge bg="primary">
                                    {indisponivelCurva[2]}
                                  </Badge>
                                </h5>
                              </Col>
                              <Col>
                                Sem Curva
                                <h5>
                                  <Badge bg="secondary">
                                    {indisponivelCurva[3]}
                                  </Badge>
                                </h5>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <div style={{ height: "200px" }}>
                      <IndisponibilidadeCurva
                        porcentagens={pIndisponivelCurva}
                      />
                    </div>
                  </Col>
                  <Col>
                    <Card className="text-center">
                      <Card.Header>Indisponibilidade Relativa</Card.Header>
                      <Card.Body>
                        <Card.Text>
                          Parcela dos produtos indisponíveis
                        </Card.Text>
                        <ListGroup className="mt-2">
                          <ListGroup.Item className="p-2">
                            <Row className="align-items-end">
                              <Col>
                                Curva A
                                <h5>
                                  <Badge bg="success">
                                    {pIndisponivelCurva[0]}%
                                  </Badge>
                                </h5>
                              </Col>
                              <Col>
                                Curva B
                                <h5>
                                  <Badge bg="info">
                                    {pIndisponivelCurva[1]}%
                                  </Badge>
                                </h5>
                              </Col>
                              <Col>
                                Curva C
                                <h5>
                                  <Badge bg="primary">
                                    {pIndisponivelCurva[2]}%
                                  </Badge>
                                </h5>
                              </Col>
                              <Col>
                                Sem Curva
                                <h5>
                                  <Badge bg="secondary">
                                    {pIndisponivelCurva[3]}%
                                  </Badge>
                                </h5>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <Row className="mt-4 align-items-center">
                  <Col>
                    <div style={{ height: "250px" }}>
                      <DisponibilidadeCurva porcentagens={pDisponivelCurva} />
                    </div>
                  </Col>
                  <Col>
                    <Card className="text-center">
                      <Card.Header>Disponibilidade por Curva</Card.Header>
                      <Card.Body>
                        <Card.Text>
                          Produtos disponíveis por curva (total)
                        </Card.Text>
                        <ListGroup className="mt-2">
                          <ListGroup.Item className="p-2">
                            <Row className="align-items-end">
                              <Col>
                                Curva A
                                <h5>
                                  <Badge bg="success">
                                    {pDisponivelCurva[0]}%
                                  </Badge>
                                </h5>
                              </Col>
                              <Col>
                                Curva B
                                <h5>
                                  <Badge bg="info">
                                    {pDisponivelCurva[1]}%
                                  </Badge>
                                </h5>
                              </Col>
                              <Col>
                                Curva C
                                <h5>
                                  <Badge bg="primary">
                                    {pDisponivelCurva[2]}%
                                  </Badge>
                                </h5>
                              </Col>
                              <Col>
                                Sem Curva
                                <h5>
                                  <Badge bg="secondary">
                                    {pDisponivelCurva[3]}%
                                  </Badge>
                                </h5>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <div style={{ height: "300px" }}>
                      <HistoricoCurvas
                        disponibilidades={disponibilidadesCurva}
                      />
                    </div>
                  </Col>
                </Row>
              </Container>
            </Carousel.Item>
          </Carousel>
        </>
      )}
    </>
  );
}

export default DashboardCompras;
