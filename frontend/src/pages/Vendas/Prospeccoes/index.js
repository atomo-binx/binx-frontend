import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import api from "../../../services/api";
import { AuthContext } from "../../../contexts/auth";

import ButtonBlock from "../../../components/ButtonBlock";

import Menu from "../../../components/Binx/Menu";
import Background from "../../../components/Binx/Background";
import Page from "../../../components/Binx/Page";
import Sidebar from "../../../components/Binx/Sidebar";
import ContentCard from "../../../components/Binx/ContentCard";

import TabelaResultados from "../../../components/Prospeccoes/TabelaResultados";

import moment from "moment";

import { Container, Form, Button, Spinner } from "react-bootstrap";
import { BsPlusLg } from "react-icons/bs";

function Prospeccoes() {
  const userContext = useContext(AuthContext);

  const [prospeccoes, setProspeccoes] = useState([]);
  const [prospeccoesCarregadas, setProspeccoesCarregadas] = useState(false);
  const [carregando, setCarregando] = useState(true);

  const [dataInicial, setDataInicial] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [dataFinal, setDataFinal] = useState(
    moment().endOf("month").format("YYYY-MM-DD")
  );

  const [segundoDatePicker, setSegundoDatePicker] = useState(true);

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
      default:
        break;
    }

    console.log("Configurando Inicio para:", inicio);
    console.log("Configurando Final para:", final);

    setDataInicial(inicio);
    setDataFinal(final);
  };

  return (
    <>
      <Background>
        <Menu logged={true} />

        <Page>
          <Page.Body>
            <Sidebar>
              <Sidebar.Title>Operações</Sidebar.Title>

              <Sidebar.Subtitle>Filtrar por data</Sidebar.Subtitle>

              <Sidebar.Item>
                <Form.Label>Período</Form.Label>
                <Form.Select
                  onChange={(e) => selecionarPeriodo(e.target.value)}
                  defaultValue="1"
                  className="mb-3"
                >
                  <option value="0">Hoje</option>
                  <option value="1">Mês atual</option>
                  <option value="2">Mês passado</option>
                  <option value="3">Período customizado</option>
                </Form.Select>
              </Sidebar.Item>

              <Sidebar.Item>
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
              </Sidebar.Item>
            </Sidebar>
            <Page.Content>
              <Page.Title>Prospecção de Clientes Corporativos</Page.Title>
              <Page.Subtitle className="text-muted">
                Lista de prospecções realizadas.
              </Page.Subtitle>
              <ContentCard>
                <div className="d-flex justify-content-end">
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
              </ContentCard>
            </Page.Content>
          </Page.Body>
        </Page>
      </Background>
    </>
  );
}

export default Prospeccoes;
