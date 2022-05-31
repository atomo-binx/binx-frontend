import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import Background from "../../../components/Binx/Background";
import Menu from "../../../components/Binx/Menu";
import Sidebar from "../../../components/Binx/Sidebar";
import TableRowLink from "../../../components/Binx/TableRowLink";
import PageContent from "../../../components/Binx/PageContent";
import ContentCard from "../../../components/Binx/ContentCard";
import LoadingContainer from "../../../components/Binx/LoadingContainer";
import PageWrapper from "../../../components/Binx/PageWrapper";
import Page from "../../../components/Binx/Page";

import api from "../../../services/api";
import { AuthContext } from "../../../contexts/auth";

import { Row, Col, Container, Table, Spinner } from "react-bootstrap";

function ControleCaixa() {
  const userContext = useContext(AuthContext);

  const [caixas, setCaixas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/financeiro/controlecaixa", {
        headers: {
          Authorization: `Bearer ${userContext.accessToken}`,
        },
      })
      .then((res) => {
        setCaixas(res.data.response.caixas);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <Background>
      <Menu logged={true} />
      <PageWrapper>
        <Page>
          <Sidebar>
            <h3>Menu Menu</h3>
            <p>Texto Texto</p>
          </Sidebar>
          <PageContent>
            <h2>Controle de Caixa</h2>
            <ContentCard className="p-4 mt-3">
              <LoadingContainer loading={loading}>
                <Table striped borderless hover>
                  <thead>
                    <tr>
                      <th>Operador de Abertura</th>
                      <th>Operador de Fechamento</th>
                      <th>Operador de Conferência</th>
                      <th>Data</th>
                      <th>Situação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {caixas.map((caixa) => (
                      <TableRowLink
                        to={`financas/caixa/${caixa.idCaixa}`}
                        key={caixa.idCaixa}
                      >
                        <td>{caixa.operadorAbertura}</td>
                        <td>{caixa.operadorFechamento || ""}</td>
                        <td>{caixa.operadorConferencia || ""}</td>
                        <td>
                          {new Date(caixa.dataAbertura).toLocaleString("pt-BR")}
                        </td>
                        <td>{caixa.situacao}</td>
                      </TableRowLink>
                    ))}
                  </tbody>
                </Table>
              </LoadingContainer>
            </ContentCard>
          </PageContent>
        </Page>
      </PageWrapper>
    </Background>
  );
}

export default ControleCaixa;
