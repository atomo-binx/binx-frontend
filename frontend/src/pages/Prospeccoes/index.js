import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";

import Menu from "../../components/Binx/Menu";

import TabelaResultados from "../../components/Prospeccoes/TabelaResultados";
import { BsFillBackspaceFill, BsPlusLg } from "react-icons/bs";
import GridFillWhite from "../../assets/grid-fill.svg";

import PageContent from "../../components/PageContent";

import ButtonBlock from "../../components/ButtonBlock";

import moment from "moment";

import "./styles.css";
import {
  Card,
  Container,
  Row,
  Form,
  Button,
  Spinner,
  Col,
  Image,
} from "react-bootstrap";

import { AuthContext } from "../../contexts/auth";

const Drawer = (props) => {
  const { open, setOpen } = props;
  const {
    dataInicial,
    setDataInicial,
    dataFinal,
    setDataFinal,
    carregarProspeccoes,
  } = props;

  const [drawerStateClass, setDrawerStateClass] = useState("drawer-closed");

  const [segundoDatePicker, setSegundoDatePicker] = useState(true);

  const handleDrawerToggle = () => {
    if (open) {
      setOpen(false);
      setDrawerStateClass("drawer-closed");
    } else {
      setOpen(true);
      setDrawerStateClass("drawer-opened");
    }
  };

  const OpenDrawer = () => {
    return (
      <div className="drawer-open-button-div" onClick={handleDrawerToggle}>
        <Image src={GridFillWhite} width="16px" />
      </div>
    );
  };

  const selecionarPeriodo = (value) => {
    let inicio = "";
    let final = "";

    switch (value) {
      // Hoje
      case "0":
        setSegundoDatePicker(false);
        inicio = moment().format("YYYY-MM-DD");
        final = moment().format("YYYY-MM-DD");
        break;
      // Mês Atual
      case "1":
        setSegundoDatePicker(true);
        inicio = moment().startOf("month").format("YYYY-MM-DD");
        final = moment().endOf("month").format("YYYY-MM-DD");
        break;
      // Mês Passado
      case "2":
        setSegundoDatePicker(true);
        inicio = moment()
          .subtract(1, "months")
          .startOf("month")
          .format("YYYY-MM-DD");
        final = moment()
          .subtract(1, "months")
          .endOf("month")
          .format("YYYY-MM-DD");
        break;
      case "3":
        // Período Customizado
        setSegundoDatePicker(true);
        inicio = moment().startOf("month").format("YYYY-MM-DD");
        final = moment().endOf("month").format("YYYY-MM-DD");
        break;
    }

    console.log("Configurando Inicio para:", inicio);
    console.log("Configurando Final para:", final);

    setDataInicial(inicio);
    setDataFinal(final);
  };

  return (
    <>
      <OpenDrawer />
      <Container
        as={Col}
        className={`drawer-div ${drawerStateClass}`}
        xs={10}
        sm={4}
        lg={3}
        xl={2}
      >
        <BsFillBackspaceFill
          className="close-icon"
          size={25}
          onClick={handleDrawerToggle}
        />
        <div className="drawer-content ">
          <div className="drawer-header">
            <h5 style={{ fontSize: "1.2rem" }}>Prospecções</h5>
          </div>
          <div>
            <p style={{ fontSize: "0.8rem" }}>
              Prospecções de clientes corporativos
            </p>
          </div>

          <div className="my-3">
            <h5 style={{ fontSize: "1rem" }}>Filtrar por Data</h5>
          </div>

          <div>
            {/* <Form> */}
            <Form.Label>Período</Form.Label>
            <Form.Select
              onChange={(e) => selecionarPeriodo(e.target.value)}
              defaultValue="1"
            >
              <option value="0">Hoje</option>
              <option value="1">Mês atual</option>
              <option value="2">Mês passado</option>
              <option value="3">Período customizado</option>
            </Form.Select>
            {/* </Form> */}
          </div>

          <div>
            <div className="my-2">
              {/* <Form> */}
              <Form.Group className="mb-3">
                <Form.Label>Data Inicial</Form.Label>
                <Form.Control
                  type="date"
                  value={dataInicial}
                  onChange={(e) => setDataInicial(e.target.value)}
                />
              </Form.Group>

              {segundoDatePicker && (
                <Form.Group className="mb-3">
                  <Form.Label>Data Final</Form.Label>
                  <Form.Control
                    type="date"
                    value={dataFinal}
                    onChange={(e) => setDataFinal(e.target.value)}
                  />
                </Form.Group>
              )}
              {/* </Form> */}
            </div>

            <Container fluid className="p-0 m-0">
              <ButtonBlock>
                <Button variant="primary" onClick={carregarProspeccoes}>
                  Filtrar
                </Button>
              </ButtonBlock>
            </Container>
          </div>
        </div>
      </Container>
    </>
  );
};

function Prospeccoes() {
  const userContext = useContext(AuthContext);

  const [openDrawer, setOpenDrawer] = useState(false);

  const [prospeccoes, setProspeccoes] = useState([]);
  const [prospeccoesCarregadas, setProspeccoesCarregadas] = useState(false);
  const [carregando, setCarregando] = useState(true);

  const [dataInicial, setDataInicial] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [dataFinal, setDataFinal] = useState(
    moment().endOf("month").format("YYYY-MM-DD")
  );

  useEffect(() => {
    carregarProspeccoes();
  }, []);

  const carregarProspeccoes = () => {
    setProspeccoesCarregadas(false);
    setCarregando(true);

    try {
      api
        .get(`/vendas/prospeccao`, {
          params: {
            idusuario: userContext["sub"],
            inicio: dataInicial,
            final: dataFinal,
          },
        })
        .then((result) => {
          setProspeccoes(result.data.prospeccoes);
          setCarregando(false);
          setProspeccoesCarregadas(true);
        });
    } catch (error) {
      console.log("Erro ao carregar prospeccções");
    }
  };

  return (
    <>
      <Menu logged={true} />

      <Container className="bg-gray binx-container" fluid>
        <Row className="flex-xl-nowrap pt-4">
          <Col
            xs={openDrawer ? 10 : 1}
            sm={openDrawer ? 4 : 1}
            lg={openDrawer ? 3 : 1}
            xl={openDrawer ? 2 : 1}
          >
            <Drawer
              open={openDrawer}
              setOpen={setOpenDrawer}
              dataInicial={dataInicial}
              setDataInicial={setDataInicial}
              dataFinal={dataFinal}
              setDataFinal={setDataFinal}
              carregarProspeccoes={carregarProspeccoes}
            />
          </Col>
          <PageContent open={openDrawer}>
            <Container fluid className="bg-white binx-container binx-card p-4">
              <div className="d-flex justify-content-between align-itens-center">
                <div>
                  <Card.Title className="mt-2">
                    Prospecção de Clientes Corporativos
                  </Card.Title>
                  <Card.Subtitle className="my-3 text-muted">
                    Minha lista de prospeccções realizadas.
                  </Card.Subtitle>
                </div>
                <div>
                  <ButtonBlock>
                    <Link to="/vendas/prospeccao/incluir">
                      <Button variant="success">
                        <Container className="m-0 p-0 d-flex">
                          <div>
                            <BsPlusLg size={15} />
                          </div>
                          <div className="mx-3">Incluir Prospecção</div>
                        </Container>
                      </Button>
                    </Link>
                  </ButtonBlock>
                </div>
              </div>

              {/* <Button onClick={handleToggle}>Fechar</Button> */}

              {carregando && (
                <Container className="text-center center-vertically">
                  <Spinner
                    as="span"
                    animation="grow"
                    size="lg"
                    role="status"
                    aria-hidden="true"
                  />
                </Container>
              )}

              {prospeccoesCarregadas && (
                <>
                  <Container fluid className="p-0 mt-4">
                    <TabelaResultados
                      resultados={prospeccoes}
                      carregar={carregarProspeccoes}
                    />
                  </Container>
                </>
              )}
            </Container>
          </PageContent>
        </Row>
      </Container>
    </>
  );
}

export default Prospeccoes;
