import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import Background from "../../../components/Binx/Background";
import Menu from "../../../components/Binx/Menu";
import Sidebar from "../../../components/Binx/Sidebar";
import TableRowLink from "../../../components/Binx/TableRowLink";
import PageContent from "../../../components/Binx/PageContent";
import ContentCard from "../../../components/Binx/ContentCard";

import { Row, Col, Container, Table, Spinner } from "react-bootstrap";
import api from "../../../services/api";
import { AuthContext } from "../../../contexts/auth";
import CenterVertically from "../../../components/Binx/CenterVertically";
import CenterHorizontally from "../../../components/Binx/CenterHorizontally";
import Page from "../../../components/Binx/Page";

// const ResultCard = styled(Container)`
//   background-color: white;
//   border-radius: 17px 17px 0px 0px;
//   height: 100vh;
// `;

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
      <Page>
        <Sidebar>
          <h3>Menu Menu</h3>
          <p>Texto Texto</p>
        </Sidebar>
        <PageContent>
          <h2>Controle de Caixa</h2>
          <ContentCard fluid className="p-4 mt-3">
            {loading && (
              <CenterHorizontally>
                <CenterVertically>
                  <Spinner animation="grow" size="md" />
                </CenterVertically>
              </CenterHorizontally>
            )}
            {!loading && (
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
                {caixas.map((caixa) => (
                  <tbody key={caixa.idCaixa}>
                    <TableRowLink to={`financas/caixa/${caixa.idCaixa}`}>
                      <td>{caixa.operadorAbertura}</td>
                      <td>{caixa.operadorFechamento || ""}</td>
                      <td>{caixa.operadorConferencia || ""}</td>
                      <td>
                        {new Date(caixa.dataAbertura).toLocaleString("pt-BR")}
                      </td>
                      <td>{caixa.situacao}</td>
                    </TableRowLink>
                  </tbody>
                ))}
              </Table>
            )}
          </ContentCard>
        </PageContent>
      </Page>
    </Background>
  );
}

export default ControleCaixa;
