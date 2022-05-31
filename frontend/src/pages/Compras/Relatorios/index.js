import React, { useState, useContext } from "react";
import styled from "styled-components";
import download from "downloadjs";

import { AuthContext } from "../../../contexts/auth";

import Background from "../../../components/Binx/Background";
import Menu from "../../../components/Binx/Menu";
import Page from "../../../components/Binx/Page";
import ContentCard from "../../../components/Binx/ContentCard";
import PageContent from "../../../components/Binx/PageContent";
import PageWrapper from "../../../components/Binx/PageWrapper";

import { BsFillPlayCircleFill } from "react-icons/bs";
import { Card, Container, Button, Spinner } from "react-bootstrap";

import api from "../../../services/api";

function Relatorios() {
  const userContext = useContext(AuthContext);

  const [carregandoPrecificacao, setCarregandoPrecificacao] = useState(false);
  const [carregandoUltimoCusto, setCarregandoUltimoCusto] = useState(false);

  function relatorioPrecificacao() {
    setCarregandoPrecificacao(true);

    api
      .get("/compras/relatorio/precificacao", {
        headers: {
          Authorization: `Bearer ${userContext.accessToken}`,
        },
        responseType: "arraybuffer",
      })
      .then((response) => {
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const filename = response.headers["filename"].split("/")[1];

        download(blob, filename);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setCarregandoPrecificacao(false);
      });
  }

  function relatorioUltimoCusto() {
    setCarregandoUltimoCusto(true);

    api
      .get("/compras/relatorio/ultimocusto", {
        headers: {
          Authorization: `Bearer ${userContext.accessToken}`,
        },
        responseType: "arraybuffer",
      })
      .then((response) => {
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const filename = response.headers["filename"].split("/")[1];

        download(blob, filename);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setCarregandoUltimoCusto(false);
      });
  }

  return (
    <>
      <Background>
        <Menu logged={true} />
        <PageWrapper>
          <Page>
            <PageContent className="px-5">
              <h3>Relatórios - Compras</h3>
              <p className="text-muted">
                Relatórios personalizados referentes ao departamento de compras
              </p>
              <ContentCard className="mt-2 p-4">
                <Card className="mb-3">
                  <Card.Body>
                    <Container
                      fluid
                      className="p-0 m-0 d-flex flex-row justify-content-between"
                    >
                      <div>
                        <Card.Title>Relatório de Precificação</Card.Title>
                        <Card.Text>
                          Lista produtos em pedidos de compra com status "Em
                          Andamento".
                        </Card.Text>
                      </div>
                      <div className="d-flex align-items-center">
                        <Button
                          variant="outline-success"
                          onClick={relatorioPrecificacao}
                        >
                          {carregandoPrecificacao && (
                            <div className="px-5">
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              />
                            </div>
                          )}
                          {!carregandoPrecificacao && (
                            <>
                              <BsFillPlayCircleFill size={24} />
                              <span className="mx-3">Executar Relatório</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </Container>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Body>
                    <Container
                      fluid
                      className="p-0 m-0 d-flex flex-row justify-content-between"
                    >
                      <div>
                        <Card.Title>Último Custo</Card.Title>
                        <Card.Text>
                          Lista produtos com seus respectivos últimos valores de
                          custo.
                        </Card.Text>
                      </div>
                      <div className="d-flex align-items-center">
                        <Button
                          variant="outline-success"
                          onClick={relatorioUltimoCusto}
                        >
                          {carregandoUltimoCusto && (
                            <div className="px-5">
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              />
                            </div>
                          )}
                          {!carregandoUltimoCusto && (
                            <>
                              <BsFillPlayCircleFill size={24} />
                              <span className="mx-3">Executar Relatório</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </Container>
                  </Card.Body>
                </Card>
              </ContentCard>
            </PageContent>
          </Page>
        </PageWrapper>
      </Background>
    </>
  );
}

export default Relatorios;