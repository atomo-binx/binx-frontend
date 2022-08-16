import React, { useState } from "react";

import Menu from "../../../components/Binx/Menu";
import ModalExpandir from "../../../components/AprovarPedidos/ModalExpandir";

import api from "../../../services/api";

import {
  Card,
  Badge,
  Container,
  Row,
  Col,
  Form,
  Button,
  ListGroup,
  Spinner,
} from "react-bootstrap";

function AprovarPedidos() {
  const [arquivoCSV, setArquivoCSV] = useState(null);

  const [buttonLoading, setButtonLoading] = useState(false);
  const [analiseFinalizada, setAnaliseFinalizada] = useState(false);

  const [loadingAcao, setLoadingAcao] = useState(false);
  const [loadingAprovar, setLoadingAprovar] = useState(false);
  const [loadingCancelar, setLoadingCancelar] = useState(false);
  const [loadingCancelarPrazo, setLoadingCancelarPrazo] = useState(false);

  const [pedidosAprovar, setPedidosAprovar] = useState([]);
  const [pedidosCancelar, setPedidosCancelar] = useState([]);
  const [pedidosCancelarPrazo, setPedidosCancelarPrazo] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [pedidosModal, setPedidosModal] = useState([]);
  const [tipoModal, setTipoModal] = useState("");

  const handleClose = () => {
    setShowModal(false);
  };

  const analisarPedidos = async () => {
    setButtonLoading(true);
    setAnaliseFinalizada(false);

    const formData = new FormData();
    formData.append("orders", arquivoCSV);

    await api
      .post(`/sincroniza/status`, formData, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        },
      })
      .then((res) => {
        setPedidosAprovar(res.data.aprovar);
        setPedidosCancelar(res.data.cancelar);
        setPedidosCancelarPrazo(res.data.cancelarPrazo);

        setAnaliseFinalizada(true);
        setButtonLoading(false);
      })
      .catch((error) => {
        console.log("Erro");
        console.log(error.message);
      });
  };

  const aprovarPedidos = async () => {
    setLoadingAprovar(true);
    setLoadingAcao(true);

    // Gerar array com SKU's
    const aprovarSKUs = pedidosAprovar.map((pedido) => pedido["bling"]);
    const body = { pedidos: aprovarSKUs, status: 15005 };

    // Chamada na API
    await api
      .post("/sincroniza/alterarstatuspedido", body)
      .then(() => {
        console.log("Chamada de atualização realizada");
      })
      .catch(() => {
        console.log("Erro na chamada de atualização");
      });

    setLoadingAprovar(false);
    setLoadingAcao(false);

    analisarPedidos();
  };

  const cancelarPedidos = async () => {
    setLoadingCancelar(true);
    setLoadingAcao(true);

    // Gerar array com SKU's
    const cancelarSKUs = pedidosCancelar.map((pedido) => pedido["bling"]);
    const body = { pedidos: cancelarSKUs, status: 12 };

    // Chamada na API
    await api
      .post("/sincroniza/alterarstatuspedido", body)
      .then(() => {
        console.log("Chamada de atualização realizada");
      })
      .catch(() => {
        console.log("Erro na chamada de atualização");
      });

    setLoadingCancelar(false);
    setLoadingAcao(false);

    analisarPedidos();
  };

  const cancelarPedidosPrazo = async () => {
    setLoadingCancelarPrazo(true);
    setLoadingAcao(true);

    // Gerar array com SKU's
    const cancelarSKUs = pedidosCancelarPrazo.map((pedido) => pedido["bling"]);
    const body = { pedidos: cancelarSKUs, status: 12 };

    // Chamada na API
    await api
      .post("/sincroniza/alterarstatuspedido", body)
      .then(() => {
        console.log("Chamada de atualização realizada");
      })
      .catch(() => {
        console.log("Erro na chamada de atualização");
      });

    setLoadingCancelarPrazo(false);
    setLoadingAcao(false);

    analisarPedidos();
  };

  return (
    <>
      <Menu logged={true} />

      <Container className="mt-4">
        <Row className="justify-content-md-center">
          <Col>
            <Card className="text-center">
              <Card.Header>Enviar arquivo .csv</Card.Header>
              <Card.Body>
                <Card.Text>
                  Selecione o arquivo .csv gerado pelo Magento
                </Card.Text>

                <Form>
                  <Form.Group>
                    <Form.Control
                      type="file"
                      onChange={(e) => {
                        setArquivoCSV(e.target.files[0]);
                      }}
                    />
                    <Form.Text className="text-muted">
                      Arquivo .csv com informações de vendas do Magento
                    </Form.Text>
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button
                      variant="primary"
                      className="mt-3"
                      onClick={analisarPedidos}
                      disabled={buttonLoading}
                      block
                    >
                      {buttonLoading && (
                        <Spinner
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      )}
                      {!buttonLoading && <>Enviar e Analisar</>}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="text-center">
              <Card.Header>Análise de Pedidos de Venda</Card.Header>
              <Card.Body>
                {analiseFinalizada && (
                  <>
                    <ListGroup>
                      <ListGroup.Item className="mt-2">
                        <Row>
                          <Col>Pedidos para Aprovar:</Col>
                          <Col>
                            <h4>
                              <Badge bg="success">
                                {pedidosAprovar.length}
                              </Badge>
                            </h4>
                          </Col>
                        </Row>
                        <Row className="mt-2">
                          <Col>
                            <div className="d-grid gap-2">
                              <Button
                                block
                                variant="outline-secondary"
                                onClick={() => {
                                  setShowModal(true);
                                  setTipoModal("aprovar");
                                  setPedidosModal(pedidosAprovar);
                                }}
                              >
                                Expandir
                              </Button>
                            </div>
                          </Col>
                          <Col>
                            <div className="d-grid gap-2">
                              <Button
                                block
                                variant="success"
                                onClick={aprovarPedidos}
                                disabled={loadingAcao ? true : false}
                                d
                              >
                                {loadingAprovar && (
                                  <Spinner
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                  />
                                )}
                                {!loadingAprovar && <>Aprovar Pedidos</>}
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    </ListGroup>

                    <ListGroup className="mt-3">
                      <ListGroup.Item className="mt-2">
                        <Row>
                          <Col>Pedidos para Cancelar:</Col>
                          <Col>
                            <h4>
                              <Badge bg="danger">
                                {pedidosCancelar.length}
                              </Badge>
                            </h4>
                          </Col>
                        </Row>
                        <Row className="mt-2">
                          <Col>
                            <div className="d-grid gap-2">
                              <Button
                                block
                                variant="outline-secondary"
                                onClick={() => {
                                  setShowModal(true);
                                  setTipoModal("cancelar");
                                  setPedidosModal(pedidosCancelar);
                                }}
                              >
                                Expandir
                              </Button>
                            </div>
                          </Col>
                          <Col>
                            <div className="d-grid gap-2">
                              <Button
                                block
                                variant="danger"
                                onClick={cancelarPedidos}
                                disabled={loadingAcao ? true : false}
                              >
                                {loadingCancelar && (
                                  <Spinner
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                  />
                                )}
                                {!loadingCancelar && <>Cancelar Pedidos</>}
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    </ListGroup>

                    <ListGroup className="mt-3">
                      <ListGroup.Item className="mt-2">
                        <Row>
                          <Col>Cancelar por Falta de Pagamento:</Col>
                          <Col>
                            <h4>
                              <Badge bg="danger">
                                {pedidosCancelarPrazo.length}
                              </Badge>
                            </h4>
                          </Col>
                        </Row>
                        <Row className="mt-2">
                          <Col>
                            <div className="d-grid gap-2">
                              <Button
                                block
                                variant="outline-secondary"
                                onClick={() => {
                                  setShowModal(true);
                                  setTipoModal("prazo");
                                  setPedidosModal(pedidosCancelarPrazo);
                                }}
                              >
                                Expandir
                              </Button>
                            </div>
                          </Col>
                          <Col>
                            <div className="d-grid gap-2">
                              <Button
                                block
                                variant="danger"
                                onClick={cancelarPedidosPrazo}
                                disabled={loadingAcao ? true : false}
                              >
                                {loadingCancelarPrazo && (
                                  <Spinner
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                  />
                                )}
                                {!loadingCancelarPrazo && <>Cancelar Pedidos</>}
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    </ListGroup>
                  </>
                )}
                {!analiseFinalizada && !buttonLoading && (
                  <Card.Text>
                    Selecione um arquivo e realize uma nova análise
                  </Card.Text>
                )}
                {!analiseFinalizada && buttonLoading && (
                  <Spinner animation="border" role="status" />
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modal de Expansão de Pedidos */}
      <ModalExpandir
        showModal={showModal}
        handleClose={handleClose}
        setShowModal={setShowModal}
        tipoModal={tipoModal}
        pedidosModal={pedidosModal}
      />
    </>
  );
}

export default AprovarPedidos;
