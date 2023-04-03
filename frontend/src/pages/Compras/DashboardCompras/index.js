import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Background from "../../../components/Binx/Background";
import Page from "../../../components/Binx/Page";
import Menu from "../../../components/Binx/Menu";
import LoadingContainer from "../../../components/Binx/LoadingContainer";
import BinxCard from "../../../components/Binx/BinxCard";

import { Row, Col, Container, Carousel } from "react-bootstrap";

import DonutChart from "../../../components/Compras/DashboardCompras/DonutChart";
import HistoricoDisponibilidade from "../../../components/Compras/DashboardCompras/HistoricoDisponibilidade";
import DisponibilidadePorCurva from "../../../components/Compras/DashboardCompras/DisponibilidadePorCurva";
import HistoricoDisponibilidadeCurvas from "../../../components/Compras/DashboardCompras/HistoricoDisponibilidadeCurvas";
import MontantesPorCurva from "../../../components/Compras/DashboardCompras/MontantesPorCurva";
import HistoricoMontantes from "../../../components/Compras/DashboardCompras/HistoricoMontantes";

import { BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";

import api from "../../../services/api";

const NumberTitle = styled.p`
  font-weight: 600;
  font-size: ${(props) => (props.size ? props.size : "3rem")};
  color: ${(props) => props.color};
  margin: 0px;
`;

const CardSubTitle = styled.h6`
  font-size: 0.9rem;
  color: ${(props) => (props.color ? props.color : "")};
`;

function DashboardCompras() {
  const [loading, setLoading] = useState(true);
  const [dados, setDados] = useState({});
  const [index, setIndex] = useState(0);

  useEffect(() => {
    api
      .get("/compras/dashboard")
      .then((res) => {
        setDados(res.data);
      })
      .catch(() => {
        console.log(
          "Erro na requisição de atualização dos dados da dashboard de compras"
        );
      });
  }, []);

  useEffect(() => {
    if (Object.keys(dados).length > 0) {
      setLoading(false);
    }
  }, [dados]);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Background>
      <Menu logged={true} />
      <Page>
        <Page.Body>
          <Page.Content className="m-0 p-0">
            <LoadingContainer loading={loading}>
              <Carousel
                activeIndex={index}
                onSelect={handleSelect}
                interval={null}
                indicators={false}
                variant="dark"
              >
                <Carousel.Item className="mh-100">
                  <Row className="d-flex justify-content-center text-center mb-3 mb-xxl-4">
                    <h6>Meta do mês</h6>
                    <BinxCard className="px-5 py-2">
                      <Container className="d-flex justify-center align-items-center px-3">
                        <BsArrowUpShort color="#198754" size="30px" />
                        <h6 className="m-0 me-3">90%</h6>
                        <BsArrowDownShort color="#DC3545" size="30px" />
                        <h6 className="m-0">10%</h6>
                      </Container>
                    </BinxCard>
                  </Row>
                  <Row className="d-flex justify-content-center">
                    <Col md={3}>
                      <BinxCard className="py-2 px-3 p-xxl-4">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="mx-auto">
                            <DonutChart
                              percentValue={dados.pdisponivel}
                              color="#198754"
                            />
                          </div>
                          <div className="d-flex flex-column align-items-end">
                            <NumberTitle color="#198754">
                              {dados.disponiveis}
                            </NumberTitle>
                            <CardSubTitle>Produtos Disponíveis</CardSubTitle>
                          </div>
                        </div>
                      </BinxCard>
                    </Col>
                    <Col md={3}>
                      <BinxCard className="py-2 px-3 p-xxl-4">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="mx-auto">
                            <DonutChart
                              percentValue={dados.pindisponivel}
                              color="#DC3545"
                            />
                          </div>
                          <div className="d-flex flex-column align-items-end">
                            <NumberTitle color="#DC3545">
                              {dados.indisponiveis}
                            </NumberTitle>
                            <CardSubTitle>Produtos Indisponíveis</CardSubTitle>
                          </div>
                        </div>
                      </BinxCard>
                    </Col>
                    <Col md={3}>
                      <BinxCard className="py-2 px-3 p-xxl-4 ">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="mx-auto">
                            <DonutChart
                              percentValue={dados.pAbaixoMin}
                              color="#FFC107"
                            />
                          </div>
                          <div className="d-flex flex-column align-items-end">
                            <NumberTitle color="#FFC107">
                              {dados.abaixoMin}
                            </NumberTitle>
                            <CardSubTitle>Abaixo do Mínimo</CardSubTitle>
                          </div>
                        </div>
                      </BinxCard>
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center mt-4">
                    <Col md={3}>
                      <BinxCard>
                        <Container className="d-flex flex-column align-items-center p-2">
                          <NumberTitle color="#086EB6">
                            {dados.ativos}
                          </NumberTitle>
                          <CardSubTitle>Produtos Ativos</CardSubTitle>
                        </Container>
                      </BinxCard>
                      <BinxCard className="mt-4 p-4">
                        <Row className="d-flex justify-content-between mt-2 text-center">
                          <CardSubTitle className="mb-4">
                            Produtos Abaixo do Estoque Mínimo
                          </CardSubTitle>
                          <Col>
                            <div className="d-flex flex-column align-items-center">
                              {dados.abaixoMinPorCurva && (
                                <NumberTitle color="#198754" size="2rem">
                                  {dados.abaixoMinPorCurva[0]}
                                </NumberTitle>
                              )}
                              <CardSubTitle>Curva A</CardSubTitle>
                            </div>
                          </Col>
                          <Col>
                            <div className="d-flex flex-column align-items-center">
                              {dados.abaixoMinPorCurva && (
                                <NumberTitle color="#00ADF1" size="2rem">
                                  {dados.abaixoMinPorCurva[1]}
                                </NumberTitle>
                              )}
                              <CardSubTitle>Curva B</CardSubTitle>
                            </div>
                          </Col>
                          <Col>
                            <div className="d-flex flex-column align-items-center">
                              {dados.abaixoMinPorCurva && (
                                <NumberTitle color="#086EB6" size="2rem">
                                  {dados.abaixoMinPorCurva[2]}
                                </NumberTitle>
                              )}
                              <CardSubTitle>Curva C</CardSubTitle>
                            </div>
                          </Col>
                        </Row>
                      </BinxCard>
                    </Col>
                    <Col md={6}>
                      <BinxCard style={{ height: "340px" }}>
                        <HistoricoDisponibilidade
                          disponibilidades={dados.disponibilidades}
                        />
                      </BinxCard>
                    </Col>
                  </Row>
                </Carousel.Item>
                <Carousel.Item>
                  <Row className="d-flex justify-content-center text-center mb-3 mt-3 mb-xxl-4">
                    <Col md={9}>
                      <Row className="d-flex justify-content-center text-center mb-3">
                        <CardSubTitle className="text-start ms-3">
                          Produtos Indisponíveis por Curva
                        </CardSubTitle>
                        <Row>
                          <Col md={3}>
                            <BinxCard className="py-2 px-3 p-xxl-4">
                              {dados.indisponivelPorCurva && (
                                <NumberTitle color="#198754">
                                  {dados.indisponivelPorCurva[0]}
                                </NumberTitle>
                              )}
                              <CardSubTitle>Curva A</CardSubTitle>
                            </BinxCard>
                          </Col>
                          <Col md={3}>
                            <BinxCard className="py-2 px-3 p-xxl-4">
                              {dados.indisponivelPorCurva && (
                                <NumberTitle color="#00ADF1">
                                  {dados.indisponivelPorCurva[1]}
                                </NumberTitle>
                              )}
                              <CardSubTitle>Curva B</CardSubTitle>
                            </BinxCard>
                          </Col>
                          <Col md={3}>
                            <BinxCard className="py-2 px-3 p-xxl-4">
                              {dados.indisponivelPorCurva && (
                                <NumberTitle color="#086EB6">
                                  {dados.indisponivelPorCurva[2]}
                                </NumberTitle>
                              )}
                              <CardSubTitle>Curva C</CardSubTitle>
                            </BinxCard>
                          </Col>
                          <Col md={3}>
                            <BinxCard className="py-2 px-3 p-xxl-4">
                              {dados.indisponivelPorCurva && (
                                <NumberTitle color="#858585">
                                  {dados.indisponivelPorCurva[3]}
                                </NumberTitle>
                              )}
                              <CardSubTitle>Sem Curva</CardSubTitle>
                            </BinxCard>
                          </Col>
                        </Row>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center text-center mb-3 mb-xxl-4">
                    <Col md={4}>
                      <CardSubTitle className="text-start ms-3">
                        Disponibilidade por Curva (%)
                      </CardSubTitle>
                      <BinxCard style={{ height: "300px" }}>
                        <DisponibilidadePorCurva
                          porcentagens={dados.pDisponivelPorCurva}
                        />
                      </BinxCard>
                    </Col>
                    <Col md={5}>
                      <CardSubTitle className="text-start ms-3">
                        Histórico de Disponibilidade (%)
                      </CardSubTitle>

                      <BinxCard style={{ height: "300px" }}>
                        <HistoricoDisponibilidadeCurvas
                          disponibilidades={dados.disponiblidadesCurva}
                        />
                      </BinxCard>
                    </Col>
                  </Row>
                </Carousel.Item>
                <Carousel.Item>
                  <Row className="d-flex justify-content-center mt-3">
                    <Col md={8} className="p-0">
                      <CardSubTitle className="text-start ms-2 mb-3">
                        Valor dos Produtos em Estoque
                      </CardSubTitle>
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center text-center mb-3  mb-xxl-4">
                    <Col md={2} className="p-0">
                      <BinxCard className="me-3 py-2 px-5  text-end">
                        {dados.pMontantesPorCurva && (
                          <NumberTitle color="#198754">
                            R${parseInt(dados.montantesPorCurva[0] / 1000)}K
                          </NumberTitle>
                        )}
                        <CardSubTitle>Curva A</CardSubTitle>
                      </BinxCard>
                    </Col>

                    <Col md={2} className="p-0">
                      <BinxCard className="me-3 py-2 px-5  text-end">
                        {dados.pMontantesPorCurva && (
                          <NumberTitle color="#00ADF1">
                            R${parseInt(dados.montantesPorCurva[1] / 1000)}K
                          </NumberTitle>
                        )}
                        <CardSubTitle>Curva B</CardSubTitle>
                      </BinxCard>
                    </Col>

                    <Col md={2} className="p-0">
                      <BinxCard className="me-3 py-2 px-5  text-end">
                        {dados.pMontantesPorCurva && (
                          <NumberTitle color="#086EB6">
                            R${parseInt(dados.montantesPorCurva[2] / 1000)}K
                          </NumberTitle>
                        )}
                        <CardSubTitle>Curva C</CardSubTitle>
                      </BinxCard>
                    </Col>

                    <Col md={2} className="p-0">
                      <BinxCard className="me-3 py-2 px-5  text-end">
                        {dados.pMontantesPorCurva && (
                          <NumberTitle color="#858585">
                            R${parseInt(dados.montantesPorCurva[3] / 1000)}K
                          </NumberTitle>
                        )}
                        <CardSubTitle>Sem Curva</CardSubTitle>
                      </BinxCard>
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center text-center mb-3 mt-4 mb-xxl-4">
                    <Col md={4} className="p-0">
                      <BinxCard style={{ height: "320px" }}>
                        <Container
                          fluid
                          className="d-flex justify-content-between align-items-center"
                        >
                          <CardSubTitle>Montante Total</CardSubTitle>
                          <h3 style={{ color: "#FFC107" }}>
                            R${parseInt(dados.montanteGeral / 1000)}K
                          </h3>
                        </Container>
                        {dados.pMontantesPorCurva && (
                          <Container
                            className="m-0 p-0 mt-4"
                            style={{ height: "200px" }}
                          >
                            <MontantesPorCurva
                              pMontantes={dados.montantesPorCurva}
                            />
                          </Container>
                        )}
                      </BinxCard>
                    </Col>
                    <Col md={4} className="ps-4">
                      <BinxCard style={{ height: "320px" }}>
                        <HistoricoMontantes
                          historicoMontantes={dados.historicoMontantes}
                        />
                      </BinxCard>
                    </Col>
                  </Row>
                </Carousel.Item>
              </Carousel>
            </LoadingContainer>
          </Page.Content>
        </Page.Body>
      </Page>
    </Background>
  );
}

export default DashboardCompras;
