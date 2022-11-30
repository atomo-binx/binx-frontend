import React, { useState, useEffect, useContext } from "react";
import { Container } from "react-bootstrap";
import { BsPlus } from "react-icons/bs";

import Background from "../../../components/Binx/Background";
import ContentCard from "../../../components/Binx/ContentCard";
import LoadingButton from "../../../components/Binx/LoadingButton";
import Menu from "../../../components/Binx/Menu";
import Page from "../../../components/Binx/Page";
import { AuthContext } from "../../../contexts/auth";

import api from "../../../services/api";
import TabelaOrdemCompra from "./TabelaOrdemCompra";

function OrdemCompra() {
  const userContext = useContext(AuthContext);

  const [ordensCompra, setOrdensCompra] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    api
      .get("/ordemcompra", {
        headers: {
          Authorization: `Bearer ${userContext.accessToken}`,
        },
      })
      .then((response) => {
        setOrdensCompra(response.data.ordensCompra);
      })
      .catch(() => {
        console.log("Erro");
      })
      .finally(() => {
        setCarregando(true);
      });
  }, []);

  return (
    <>
      <Background>
        <Menu logged={true} />

        <Page>
          <Page.Body>
            <Page.Content>
              <Page.Title>Ordens de Compra</Page.Title>
              <Page.Subtitle>
                Criação e manipulação de ordens de compras.
              </Page.Subtitle>
              <ContentCard>
                <Container
                  fluid
                  className="d-flex flex-row justify-content-end mb-4 p-0"
                >
                  <LoadingButton variant="outline-success" block={true}>
                    <BsPlus size={24} />
                    <span className="mx-3 ">Incluir Ordem de Compra</span>
                  </LoadingButton>
                </Container>
                <TabelaOrdemCompra ordens={ordensCompra} />
              </ContentCard>
            </Page.Content>
          </Page.Body>
        </Page>
      </Background>
    </>
  );
}

export default OrdemCompra;
