import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import download from "downloadjs";

import { AuthContext } from "../../../contexts/auth";

import Background from "../../../components/Binx/Background";
import Menu from "../../../components/Binx/Menu";
import Page from "../../../components/Binx/Page";
import ContentCard from "../../../components/Binx/ContentCard";

import {
  BsFillPlayCircleFill,
  BsFillArrowUpRightSquareFill,
} from "react-icons/bs";
import { Card, Container, Button, Spinner, Col } from "react-bootstrap";

import api from "../../../services/api";
import LoadingButton from "../../../components/Binx/LoadingButton";

function Relatorios() {
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();

  const [carregandoPrecificacao, setCarregandoPrecificacao] = useState(false);
  const [carregandoUltimoCusto, setCarregandoUltimoCusto] = useState(false);
  const [carregandoSituacaoEstoque, setCarregandoSituacaoEstoque] =
    useState(false);
  const [carregandoCompraProduto, setCarregandoCompraProduto] = useState(false);
  const [carregandoAnaliseEstoque, setCarregandoAnaliseEstoque] =
    useState(false);
  const [carregandoMontagemKits, setcarregandoMontagemKits] = useState(false);

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
        switch (error.response.status) {
          case 401:
            navigate("/");
            break;
          default:
            break;
        }
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

  function relatorioSituacaoEstoque() {
    setCarregandoSituacaoEstoque(true);

    api
      .get("/compras/relatorio/situacaoestoque", {
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
        setCarregandoSituacaoEstoque(false);
      });
  }

  function relatorioCompraProduto() {
    setCarregandoCompraProduto(true);

    api
      .get("/compras/relatorio/compraproduto", {
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
        setCarregandoCompraProduto(false);
      });
  }

  function relatorioMontagemKits() {
    setcarregandoMontagemKits(true);

    api
      .get("/compras/relatorio/montagemkits", {
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
        setcarregandoMontagemKits(false);
      });
  }

  function relatorioAnaliseEstoque() {
    setCarregandoAnaliseEstoque(true);

    api
      .get("/compras/relatorio/analiseestoque", {
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
        setCarregandoAnaliseEstoque(false);
      });
  }

  return (
    <>
      <Background>
        <Menu logged={true} />
        <Page>
          <Page.Body>
            <Page.Content className="px-5">
              <Page.Title>Relatórios - Compras</Page.Title>
              <Page.Subtitle>
                Relatórios personalizados do departamento de compras
              </Page.Subtitle>
              <ContentCard className="mt-2 p-4">
                <Card className="mb-3">
                  <Card.Body>
                    <Container
                      fluid
                      className="p-0 m-0 d-flex flex-wrap justify-content-between"
                    >
                      <div>
                        <Card.Title>Análise de Compras</Card.Title>
                        <Card.Text>
                          Executa a Análise Suprema do departamento de compras.
                        </Card.Text>
                      </div>
                      <div className="d-flex align-items-center">
                        <LoadingButton
                          variant="outline-primary"
                          block={true}
                          onClick={() => navigate("geral")}
                          width={"195px"}
                        >
                          <BsFillArrowUpRightSquareFill size={24} />
                          <span className="mx-3 ">Executar Análise</span>
                        </LoadingButton>
                      </div>
                    </Container>
                  </Card.Body>
                </Card>
                <Card className="mb-3">
                  <Card.Body>
                    <Container
                      fluid
                      className="p-0 m-0 d-flex flex-wrap justify-content-between"
                    >
                      <div>
                        <Card.Title>Análise de Curva</Card.Title>
                        <Card.Text>
                          Executa a análise de curva dos produtos, definindo
                          curva, estoque mínimo e máximo.
                        </Card.Text>
                      </div>
                      <div className="d-flex align-items-center">
                        <LoadingButton
                          variant="outline-primary"
                          block={true}
                          onClick={() => navigate("curva")}
                          width={"195px"}
                        >
                          <BsFillArrowUpRightSquareFill size={24} />
                          <span className="mx-3 ">Executar Análise</span>
                        </LoadingButton>
                      </div>
                    </Container>
                  </Card.Body>
                </Card>
                <Card className="mb-3">
                  <Card.Body>
                    <Container
                      fluid
                      className="p-0 m-0 d-flex flex-row flex-wrap justify-content-between"
                    >
                      <div>
                        <Card.Title>Relatório de Precificação</Card.Title>
                        <Card.Text>
                          Lista produtos em pedidos de compra com status Em
                          Andamento.
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
                <Card className="mb-3">
                  <Card.Body>
                    <Container
                      fluid
                      className="p-0 m-0 d-flex flex-row flex-wrap justify-content-between"
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
                <Card className="mb-3">
                  <Card.Body>
                    <Container
                      fluid
                      className="p-0 m-0 d-flex flex-row flex-wrap justify-content-between"
                    >
                      <div>
                        <Card.Title>Situação de Estoque</Card.Title>
                        <Card.Text>
                          Exibe os produtos ativos, máximo e mínimo, quantidade,
                          situação de estoque e cobertura.
                        </Card.Text>
                      </div>
                      <div className="d-flex align-items-center">
                        <Button
                          variant="outline-success"
                          onClick={relatorioSituacaoEstoque}
                        >
                          {carregandoSituacaoEstoque && (
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
                          {!carregandoSituacaoEstoque && (
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
                <Card className="mb-3">
                  <Card.Body>
                    <Container
                      fluid
                      className="p-0 m-0 d-flex flex-row flex-wrap justify-content-between"
                    >
                      <div>
                        <Card.Title>Histórico de Pedidos de Compra</Card.Title>
                        <Card.Text>
                          Histórico completo da relação de compra-produto.
                        </Card.Text>
                      </div>
                      <div className="d-flex align-items-center">
                        <Button
                          variant="outline-success"
                          onClick={relatorioCompraProduto}
                        >
                          {carregandoCompraProduto && (
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
                          {!carregandoCompraProduto && (
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
                <Card className="mb-3">
                  <Card.Body>
                    <Container
                      fluid
                      className="p-0 m-0 d-flex flex-row flex-wrap justify-content-between"
                    >
                      <div>
                        <Card.Title>Análise de Estoque Geral e Loja</Card.Title>
                        <Card.Text>
                          Relação de itens e suas quantidades nos estoques Geral
                          e Loja
                        </Card.Text>
                      </div>
                      <div className="d-flex align-items-center">
                        <Button
                          variant="outline-success"
                          onClick={relatorioAnaliseEstoque}
                        >
                          {carregandoAnaliseEstoque && (
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
                          {!carregandoAnaliseEstoque && (
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
                <Card className="mb-3">
                  <Card.Body>
                    <Container
                      fluid
                      className="p-0 m-0 d-flex flex-row flex-wrap justify-content-between"
                    >
                      <div>
                        <Card.Title>Montagem de Kits</Card.Title>
                        <Card.Text>
                          Relação de montagem de kits, com produtos e
                          quantidades disponíveis para montagem
                        </Card.Text>
                      </div>
                      <div className="d-flex align-items-center">
                        <Button
                          variant="outline-success"
                          onClick={relatorioMontagemKits}
                        >
                          {carregandoMontagemKits && (
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
                          {!carregandoMontagemKits && (
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
            </Page.Content>
          </Page.Body>
        </Page>
      </Background>
    </>
  );
}

export default Relatorios;
