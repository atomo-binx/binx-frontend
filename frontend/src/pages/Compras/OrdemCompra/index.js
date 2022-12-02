import React, { useState, useEffect, useContext } from "react";
import { Container, Form, Row, Spinner } from "react-bootstrap";
import { BsPlus } from "react-icons/bs";

import Background from "../../../components/Binx/Background";
import ContentCard from "../../../components/Binx/ContentCard";
import LoadingButton from "../../../components/Binx/LoadingButton";
import Menu from "../../../components/Binx/Menu";
import Page from "../../../components/Binx/Page";
import Sidebar from "../../../components/Binx/Sidebar";
import { AuthContext } from "../../../contexts/auth";

import api from "../../../services/api";
import TabelaOrdemCompra from "./TabelaOrdemCompra";
import SearchButton from "./SearchButton";

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
        setCarregando(false);
      });
  }, []);

  return (
    <>
      <Background>
        <Menu logged={true} />

        <Page>
          <Page.Body>
            <Sidebar>
              <Sidebar.Title>Opções</Sidebar.Title>
            </Sidebar>
            <Page.Content>
              <Page.Title>Ordens de Compra</Page.Title>
              <Page.Subtitle>
                Criação e manipulação de ordens de compras.
              </Page.Subtitle>
              <ContentCard>
                {carregando && (
                  <Container
                    fluid
                    className="p-0 d-flex justify-content-center py-5 my-5"
                  >
                    <Spinner animation="grow" size="sm" />
                  </Container>
                )}

                {!carregando && (
                  <>
                    <Container
                      fluid
                      className="d-flex flex-row justify-content-between mb-4 p-0"
                    >
                      <Container className="m-0 p-0">
                        <Container className="p-0 m-0 col-6 d-flex flex-row align-items-center">
                          <Form.Control
                            type="text"
                            placeholder="Pesquisar por ordens de compra"
                          />
                          <SearchButton size={20} />
                        </Container>
                      </Container>
                      <Container className="m-0 p-0" style={{ width: "180px" }}>
                        <LoadingButton variant="outline-success" block={true}>
                          <BsPlus size={24} />
                          <span className="mx-3 ">Incluir</span>
                        </LoadingButton>
                      </Container>
                    </Container>
                    <Container className="m-0 p-0 mt-5" fluid>
                      <TabelaOrdemCompra ordens={ordensCompra} />
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

export default OrdemCompra;
