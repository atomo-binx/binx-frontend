import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import api from "../../../services/api";

import Background from "../../../components/Binx/Background";
import Menu from "../../../components/Binx/Menu";
import Page from "../../../components/Binx/Page";
import PageWrapper from "../../../components/Binx/PageWrapper";
import PageContent from "../../../components/Binx/PageContent";
import ContentCard from "../../../components/Binx/ContentCard";
import LoadingContainer from "../../../components/Binx/LoadingContainer";

import { Row, Col, Table, Accordion } from "react-bootstrap";
import { AuthContext } from "../../../contexts/auth";
import TabelaPedidosConsiderados from "../../../components/Financeiro/TabelaPedidosConsiderados";

import { BRLString } from "../../../util/money";

const ValorCaixa = styled.span`
  color: ${(props) => (props.negative ? "red" : "black")};
`;

function Caixa() {
  const user = useContext(AuthContext);
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [caixa, setCaixa] = useState({});
  const [valores, setValores] = useState([]);

  useEffect(() => {
    api
      .get(`/financeiro/controlecaixa/${id}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setCaixa(res.data.response.caixa);
        setValores(res.data.response.caixa.valores);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Background>
        <Menu logged={true} />
        <PageWrapper>
          <Page>
            <PageContent className="mx-4">
              <h3>Controle de Caixa</h3>
              <ContentCard>
                <LoadingContainer loading={loading}>
                  <Row className="m-0">
                    <h4 className="text-muted mb-4">Informações</h4>
                    <Table striped hover>
                      <thead>
                        <tr>
                          <th>Operador de Abertura</th>
                          <th>Data de Abertura</th>
                          <th>Troco Inicial</th>
                          <th>Troco Final</th>
                          <th>Data de Fechamento</th>
                          <th>Operador de Fechamento</th>
                          <th>Operador de Conferência</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{caixa.operadorAbertura}</td>
                          <td>
                            {new Date(caixa.dataAbertura).toLocaleString(
                              "pt-BR"
                            )}
                          </td>
                          <td>{BRLString(caixa.trocoAbertura, "R$ ")}</td>
                          <td>-</td>
                          <td>
                            {caixa.dataFechamento &&
                              new Date(caixa.dataFechamento).toLocaleString(
                                "pt-BR"
                              )}

                            {!caixa.dataFechamento && "-"}
                          </td>
                          <td>{caixa.operadorFechamento || "-"}</td>
                          <td>{caixa.operadorConferencia || "-"}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Row>

                  <Row className="mt-4">
                    <Col md={6}>
                      <div>
                        <h4 className="text-muted mb-4">Formas de Pagamento</h4>
                      </div>
                      <Table striped hover>
                        <thead>
                          <tr>
                            <th>Nome</th>
                            <th>Total Registrado</th>
                            <th>Total Informado</th>
                            <th>Diferenças</th>
                          </tr>
                        </thead>
                        <tbody>
                          {valores.map((valor) => (
                            <tr key={valor.formaPagamento}>
                              <td>{valor.formaPagamento}</td>
                              <td>{valor.registrado}</td>
                              <td>{valor.informado}</td>
                              <td>
                                {
                                  <ValorCaixa
                                    negative={
                                      valor.diferencas > 0 ? false : true
                                    }
                                  >
                                    {valor.diferencas}
                                  </ValorCaixa>
                                }
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>

                  <Row className="mt-4">
                    <Col>
                      <div>
                        <h4 className="text-muted mb-4">Ocorrências</h4>
                      </div>
                      <Table>
                        <thead>
                          <tr>
                            <th>Data</th>
                            <th>Observação</th>
                            <th>Tipo</th>
                            <th>Valor</th>
                          </tr>
                        </thead>
                        <tbody></tbody>
                      </Table>
                    </Col>
                  </Row>

                  <Row className="mt-4">
                    <div>
                      <h4 className="text-muted mb-4">Pedidos Registrados</h4>
                      <p className="text-muted">
                        Clique sobre um pedido para visualizar suas ocorrências.
                      </p>
                    </div>
                    <TabelaPedidosConsiderados
                      pedidos={caixa.pedidosConsiderados}
                    />
                  </Row>
                </LoadingContainer>
              </ContentCard>
            </PageContent>
          </Page>
        </PageWrapper>
      </Background>
    </>
  );
}

export default Caixa;
