import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import Background from "../../../components/Binx/Background";
import Page from "../../../components/Binx/Page";
import Menu from "../../../components/Binx/Menu";
import LoadingContainer from "../../../components/Binx/LoadingContainer";
import BinxCard from "../../../components/Binx/BinxCard";

import {
  Row,
  Col,
  Container,
  OverlayTrigger,
  Tooltip,
  Modal,
  Button,
} from "react-bootstrap";

import { BsArrowsAngleExpand } from "react-icons/bs";

import api from "../../../services/api";

import { AuthContext } from "../../../contexts/auth";

import { BRLString } from "../../../util/money";

import TabelaPedidos from "./TabelaPedidos";

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

const BotaoDetalhar = styled.div`
  margin: 0;
  padding: 0;

  &:hover {
    cursor: pointer;
  }
`;

function BudgetCompras() {
  const userContext = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [dados, setDados] = useState({});

  const [exibirDetalhes, setExibirDetalhes] = useState(false);
  const [listaPedidos, setListaPedidos] = useState([]);

  useEffect(() => {
    api
      .get("/budgetcompras/dashboard", {
        headers: {
          Authorization: `Bearer ${userContext.accessToken}`,
        },
      })
      .then((res) => {
        setDados(res.data);
      })
      .catch(() => {
        console.log(
          "Erro na requisição de atualização dos dados da dashboard de budget de compras"
        );
      });
  }, []);

  useEffect(() => {
    if (Object.keys(dados).length > 0) {
      setLoading(false);
    }
  }, [dados]);

  const handleClose = () => {
    setExibirDetalhes(false);
  };

  const expandirPedidos = (target) => {
    if (target === "nacional") {
      console.log("Setando Nacional");
      setListaPedidos(dados.pedidosBudgetNacional);
    }

    if (target === "internacional") {
      console.log("Setando Internacional");
      setListaPedidos(dados.pedidosBudgetInternacional);
    }

    setExibirDetalhes(true);
  };

  return (
    <Background>
      <Menu logged={true} />
      <Page>
        <Page.Body>
          <Page.Content className="m-0 p-0">
            <LoadingContainer loading={loading}>
              <Row className="d-flex justify-content-center text-center mb-3 mb-xxl-4">
                <h6>Budget de Compras</h6>
                <BinxCard className="px-5 py-2">
                  <Container className="d-flex flex-column align-items-center px-3">
                    <NumberTitle color="#086EB6" size={"1rem"}>
                      Abril, 2023
                    </NumberTitle>
                  </Container>
                </BinxCard>
              </Row>
              <Row>
                <Col>
                  <Row className="d-flex justify-content-center text-center mb-3 mt-4 mb-xxl-4">
                    <Col md={6} className="p-0">
                      <BinxCard className="me-3 py-2 px-4 p-xxl-4 text-end">
                        <NumberTitle color="#198754" size={"2rem"}>
                          R${BRLString(dados.budgetNacional)}
                        </NumberTitle>
                        <CardSubTitle>Budget Nacional</CardSubTitle>
                      </BinxCard>
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center text-center mb-3 mt-4 mb-xxl-4">
                    <Col md={6} className="p-0">
                      <BinxCard className="me-3 py-2 px-4 p-xxl-4 text-end">
                        <NumberTitle color="#086EB6" size={"2rem"}>
                          R${BRLString(dados.budgetDiarioNacional)}
                        </NumberTitle>
                        <CardSubTitle>Budget Diário Nacional</CardSubTitle>
                      </BinxCard>
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center text-center mb-3 mt-4 mb-xxl-4">
                    <Col md={6} className="p-0">
                      <BinxCard className="me-3 py-2 px-4 p-xxl-4 text-end">
                        <Container className="p-0 d-flex justify-content-end">
                          <OverlayTrigger
                            placement="right"
                            overlay={<Tooltip>Exibir Pedidos</Tooltip>}
                          >
                            <BotaoDetalhar
                              onClick={() => expandirPedidos("nacional")}
                            >
                              <span className="text-muted me-2">Detalhar</span>
                              <BsArrowsAngleExpand size={14} color="#6c757d " />
                            </BotaoDetalhar>
                          </OverlayTrigger>
                        </Container>
                        <NumberTitle color="#00ADF1" size={"2rem"}>
                          R${BRLString(dados.budgetUtilizadoNacional)}
                        </NumberTitle>
                        <CardSubTitle className="my-2">
                          Budget Utilizado Nacional
                        </CardSubTitle>
                      </BinxCard>
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center text-center mb-3 mt-4 mb-xxl-4">
                    <Col md={6} className="p-0">
                      <BinxCard className="me-3 py-2 px-4 p-xxl-4 text-end">
                        <NumberTitle color="#198754" size={"2rem"}>
                          {parseFloat(dados.budgetNacionalPercentual)}%
                        </NumberTitle>
                        <CardSubTitle>Utilização do Budget Diário</CardSubTitle>
                      </BinxCard>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Row className="d-flex justify-content-center text-center mb-3 mt-4 mb-xxl-4">
                    <Col md={6} className="p-0">
                      <BinxCard className="me-3 py-2 px-4 p-xxl-4 text-end">
                        <NumberTitle color="#198754" size={"2rem"}>
                          R${BRLString(dados.budgetInternacional)}
                        </NumberTitle>
                        <CardSubTitle>Budget Internacional</CardSubTitle>
                      </BinxCard>
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center text-center mb-3 mt-4 mb-xxl-4">
                    <Col md={6} className="p-0">
                      <BinxCard className="me-3 py-2 px-4 p-xxl-4 text-end">
                        <NumberTitle color="#086EB6" size={"2rem"}>
                          R${BRLString(dados.budgetDiarioInternacional)}
                        </NumberTitle>
                        <CardSubTitle>Budget Diário Internacional</CardSubTitle>
                      </BinxCard>
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center text-center mb-3 mt-4 mb-xxl-4">
                    <Col md={6} className="p-0">
                      <BinxCard className="me-3 py-2 px-4 p-xxl-4 text-end">
                        <Container className="p-0 d-flex justify-content-end">
                          <OverlayTrigger
                            placement="right"
                            overlay={<Tooltip>Exibir Pedidos</Tooltip>}
                          >
                            <BotaoDetalhar
                              onClick={() => expandirPedidos("internacional")}
                            >
                              <span className="text-muted me-2">Detalhar</span>
                              <BsArrowsAngleExpand size={14} color="#6c757d " />
                            </BotaoDetalhar>
                          </OverlayTrigger>
                        </Container>
                        <NumberTitle color="#00ADF1" size={"2rem"}>
                          R${BRLString(dados.budgetUtilizadoInternacional)}
                        </NumberTitle>
                        <CardSubTitle>
                          Budget Utilizado Internacional
                        </CardSubTitle>
                      </BinxCard>
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center text-center mb-3 mt-4 mb-xxl-4">
                    <Col md={6} className="p-0">
                      <BinxCard className="me-3 py-2 px-4 p-xxl-4 text-end">
                        <NumberTitle
                          color={
                            dados.budgetInternacionalPercentual > 100
                              ? "#DC3545"
                              : "#198754"
                          }
                          size={"2rem"}
                        >
                          {parseFloat(dados.budgetInternacionalPercentual)}%
                        </NumberTitle>
                        <CardSubTitle>Utilização do Budget Diário</CardSubTitle>
                      </BinxCard>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </LoadingContainer>
          </Page.Content>

          <Modal show={exibirDetalhes} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
              <Modal.Title>Budget Utilizado</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <TabelaPedidos pedidos={listaPedidos} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Fechar
              </Button>
            </Modal.Footer>
          </Modal>
        </Page.Body>
      </Page>
    </Background>
  );
}

export default BudgetCompras;
