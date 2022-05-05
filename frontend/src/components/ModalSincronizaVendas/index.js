import { React, useState, useEffect } from "react";

import api from "../../services/api";

import StatusSincronizacaoVendas from "../StatusSincronizacaoVendas";

import {
  Modal,
  Button,
  Row,
  Col,
  Form,
  InputGroup,
  Table,
  Badge,
  Container,
  FormControl,
  Alert,
  Dropdown,
  ListGroup,
  Spinner,
} from "react-bootstrap";

function ModalSincronizaVendas(props) {
  const { showSync, handleClose, setShowSync } = props;

  const [orderNumber, setOrderNumber] = useState(0);

  const [period, setPeriod] = useState("days");
  const [periodValue, setPeriodValue] = useState(1);

  const [loaded, setLoaded] = useState(false);
  const [syncStatus, setSyncStatus] = useState("...");

  const [disableSync, setDisableSync] = useState(true);

  useEffect(async () => {
    try {
      const response = await api.get("/flags/statuspedidosvenda");
      const status = response.data.valor;
      setSyncStatus(status);
      setLoaded(true);

      if (status != "sincronizando") {
        setDisableSync(false);
      }
    } catch (error) {}
  });

  const handleSubmit = () => {
    console.log("Sincronizando");

    // Ordem de verificação:
    // 1 - Periodo / 2 - Número do pedido
    if (period) {
      fireSync({ period, periodValue });
    } else {
      //@TODO: criar sincronização por número de pedido específico
      return;
    }
  };

  const fireSync = async (params) => {
    const { period, periodValue } = params;
    api.get(`/sincroniza/pedidosvenda?period=${period}&value=${periodValue}`);
  };

  return (
    <>
      <Modal Modal show={showSync} onHide={handleClose} centered size="md">
        <Modal.Header closeButton>
          <Modal.Title>Sincronizar Pedidos de Venda</Modal.Title>
        </Modal.Header>

        {loaded && (
          <Form>
            <Modal.Body>
              <Container>
                <Row className="mb-4">
                  <Col>
                    <ListGroup>
                      <ListGroup.Item>
                        <Col className="text-center">
                          Status: <StatusSincronizacaoVendas status={syncStatus} />
                        </Col>
                        {/* <Col className="mt-2">
                          Última sincronização{" "}
                          <Badge variant="success">02/01/20201 as 19h30</Badge>
                        </Col> */}
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>

                <Form.Label>Sincronizar por período</Form.Label>
                <Form.Control
                  as="select"
                  custom
                  onChange={(e) => {
                    if (e.target.value != "0") {
                      setPeriod(e.target.value.split("=")[0]);
                      setPeriodValue(e.target.value.split("=")[1]);
                    }
                  }}
                >
                  <option selected value="0">
                    Selecionar Período
                  </option>
                  <option value="days=1">Sincronizar 1 Dia</option>
                  <option value="days=7">Sincronizar 7 Dias</option>
                  <option value="months=1">Sincronizar 1 Mês</option>
                  <option value="months=3">Sincronizar 3 Meses</option>
                </Form.Control>
              </Container>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowSync(false)}>
                Fechar
              </Button>
              <Button variant="primary" onClick={handleSubmit} disabled={disableSync}>
                Sincronizar
              </Button>{" "}
            </Modal.Footer>
          </Form>
        )}

        {!loaded && (
          <Modal.Body>
            <Container fluid className="text-center">
              <Spinner />
            </Container>
          </Modal.Body>
        )}
      </Modal>
    </>
  );
}

export default ModalSincronizaVendas;
