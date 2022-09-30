import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Background from "../../../components/Binx/Background";
import Page from "../../../components/Binx/Page";
import Menu from "../../../components/Binx/Menu";
import LoadingContainer from "../../../components/Binx/LoadingContainer";
import BinxCard from "../../../components/Binx/BinxCard";

import { Row, Col } from "react-bootstrap";

import DonutChart from "../../../components/Compras/DashboardCompras/DonutChart";
import HistoricoDisponibilidade from "../../../components/Compras/DashboardCompras/HistoricoDisponibilidade";

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
`;

function DashboardCompras() {
  const [loading, setLoading] = useState(true);
  const [dados, setDados] = useState({});

  useEffect(() => {
    api
      .get("/compras/dashboard")
      .then((res) => {
        setDados(res.data);
        setLoading(false);
      })
      .catch(() => {
        console.log(
          "Erro na requisição de atualização dos dados da dashboard de compras"
        );
      });
  }, []);

  useEffect(() => {
    console.log(dados);
  }, [dados]);

  return (
    <Background>
      <Menu logged={true} />
      <Page>
        <Page.Body>
          <Page.Content>
            <LoadingContainer loading={loading}>
              <Row className="d-flex justify-content-center text-center ml-2">
                <h6>Meta do mês</h6>
                <BinxCard className="px-5 py-2">
                  <div className="d-flex justify-center align-items-center px-3">
                    <BsArrowUpShort color="#28A745" size="30px" />
                    <h6 className="m-0 me-3">90%</h6>
                    <BsArrowDownShort color="#DC3545" size="30px" />
                    <h6 className="m-0">10%</h6>
                  </div>
                </BinxCard>
              </Row>
              <Row className="d-flex justify-content-center mt-3">
                <Col md={3}>
                  <BinxCard className="py-2 px-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="mx-auto">
                        <DonutChart
                          percentValue={dados.pdisponivel}
                          color="#28A745"
                        />
                      </div>
                      <div className="d-flex flex-column align-items-end">
                        <NumberTitle color="#28A745">
                          {dados.disponiveis}
                        </NumberTitle>
                        <CardSubTitle>Produtos Disponíveis</CardSubTitle>
                      </div>
                    </div>
                  </BinxCard>
                </Col>
                <Col md={3}>
                  <BinxCard className="py-2 px-3">
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
                  <BinxCard className="py-2 px-3">
                    {/* <div className="d-flex flex-column align-items-center">
                      <NumberTitle color="#086EB6">{dados.ativos}</NumberTitle>
                      <CardSubTitle>Produtos Ativos</CardSubTitle>
                    </div> */}

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

              <Row className="d-flex justify-content-center mt-3">
                <Col md={3}>
                  <div>
                    <BinxCard>
                      <div className="d-flex flex-column align-items-center">
                        <NumberTitle color="#086EB6">
                          {dados.ativos}
                        </NumberTitle>
                        <CardSubTitle>Produtos Ativos</CardSubTitle>
                      </div>
                    </BinxCard>
                  </div>
                  <div>
                    <BinxCard className="mt-3 p-3">
                      <Row className="d-flex justify-content-between mt-2">
                        <Col>
                          <div className="d-flex flex-column align-items-center">
                            {dados.indisponivelPorCurva && (
                              <NumberTitle color="#28A745" size="2rem">
                                {dados.indisponivelPorCurva[0]}
                              </NumberTitle>
                            )}
                            <CardSubTitle>Curva A</CardSubTitle>
                          </div>
                        </Col>
                        <Col>
                          <div className="d-flex flex-column align-items-center">
                            {dados.indisponivelPorCurva && (
                              <NumberTitle color="#00ADF1" size="2rem">
                                {dados.indisponivelPorCurva[1]}
                              </NumberTitle>
                            )}
                            <CardSubTitle>Curva B</CardSubTitle>
                          </div>
                        </Col>
                        <Col>
                          <div className="d-flex flex-column align-items-center">
                            {dados.indisponivelPorCurva && (
                              <NumberTitle color="#086EB6" size="2rem">
                                {dados.indisponivelPorCurva[2]}
                              </NumberTitle>
                            )}
                            <CardSubTitle>Curva C</CardSubTitle>
                          </div>
                        </Col>
                      </Row>
                    </BinxCard>
                  </div>
                </Col>
                <Col md={6}>
                  <BinxCard>
                    <HistoricoDisponibilidade
                      disponibilidades={dados.disponibilidades}
                    />
                  </BinxCard>
                </Col>
              </Row>
            </LoadingContainer>
          </Page.Content>
        </Page.Body>
      </Page>
    </Background>
  );
}

export default DashboardCompras;
