import React, { useState, useEffect, useContext } from "react";
import { Badge, Container, Form, Row, Spinner } from "react-bootstrap";
import { BsPlus, BsXLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

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

const situacoes = {
  1: "Em Aberto",
  2: "Em Orçamento",
  3: "Parcialmente Finalizada",
  4: "Finalizada",
  5: "Cancelada",
};

const tipos = {
  1: "Reposição de Estoque",
  2: "Atender Venda",
};

function OrdemCompra() {
  const navigate = useNavigate();

  const userContext = useContext(AuthContext);

  const [ordensCompra, setOrdensCompra] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const [situacao, setSituacao] = useState(0);
  const [tipo, setTipo] = useState(0);

  const [filtros, setFiltros] = useState({
    situacao: 1,
  });

  function removerFiltro(targetRemover) {
    delete filtros[targetRemover];
    carregarOrdensCompra();
  }

  function filtrar() {
    if (situacao == 0) {
      delete filtros.situacao;
    } else {
      filtros.situacao = situacao;
    }

    if (tipo == 0) {
      delete filtros.tipo;
    } else {
      filtros.tipo = tipo;
    }

    carregarOrdensCompra();
  }

  function carregarOrdensCompra() {
    setCarregando(true);
    setOrdensCompra([]);

    api
      .get("/ordemcompra", {
        params: filtros,
        headers: {
          Authorization: `Bearer ${userContext.accessToken}`,
        },
      })
      .then((response) => {
        setOrdensCompra(response.data.ordensCompra);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          navigate("/");
        }
      })
      .finally(() => {
        setCarregando(false);
      });
  }

  useEffect(() => {
    carregarOrdensCompra();
  }, []);

  return (
    <>
      <Background>
        <Menu logged={true} />

        <Page>
          <Page.Body>
            <Sidebar>
              <Sidebar.Title>Filtros</Sidebar.Title>

              <Sidebar.Item>
                <Form.Label>Situação</Form.Label>
                <Form.Select
                  onChange={(e) => setSituacao(e.target.value)}
                  defaultValue="1"
                  className="mb-3"
                >
                  <option value="0">Todas</option>
                  <option value="1">Em Aberto</option>
                  <option value="2">Em Orçamento</option>
                  <option value="3">Parcialmente Finalizada</option>
                  <option value="4">Finalizada</option>
                  <option value="5">Cancelada</option>
                </Form.Select>
              </Sidebar.Item>

              <Sidebar.Item>
                <Form.Label>Tipo</Form.Label>
                <Form.Select
                  onChange={(e) => setTipo(e.target.value)}
                  defaultValue="0"
                  className="mb-3"
                >
                  <option value="0">Todas</option>
                  <option value="1">Reposição de Estoque</option>
                  <option value="2">Atender Venda</option>
                </Form.Select>
              </Sidebar.Item>

              <Sidebar.Item>
                <Form.Label>Comprador</Form.Label>
                <Form.Control type="text" />
              </Sidebar.Item>

              <Sidebar.Item className="mt-4">
                <LoadingButton
                  block={true}
                  variant="outline-success"
                  onClick={filtrar}
                >
                  Filtrar
                </LoadingButton>
              </Sidebar.Item>

              <Sidebar.Item className="mt-2">
                <Container
                  fluid
                  className="d-flex flex-row justify-content-center"
                >
                  <span className="text-muted">Limpar Filtros</span>
                </Container>
              </Sidebar.Item>
            </Sidebar>

            <Page.Content>
              <Page.Title>Ordens de Compra</Page.Title>
              <Page.Subtitle>
                Criação e manipulação de ordens de compras.
              </Page.Subtitle>
              <ContentCard>
                <Container
                  fluid
                  className="d-flex flex-row justify-content-between mb-4 p-0"
                >
                  <Container className="m-0 p-0">
                    <Container className="p-0 m-0 col-6 d-flex flex-row align-items-center">
                      <Form.Control
                        type="text"
                        placeholder="Pesquisar por número ou observações"
                        autoFocus
                      />
                      <SearchButton size={20} />
                    </Container>
                    <Container
                      fluid
                      className="m-0 p-0 mt-2 d-flex flex-row align-items-center"
                    >
                      {Object.keys(filtros).map((campo) => {
                        return (
                          <Badge
                            key={campo}
                            bg="success"
                            className="ms-1 d-flex align-items-center"
                            pill={false}
                          >
                            {campo === "situacao"
                              ? situacoes[filtros[campo]]
                              : tipos[filtros[campo]]}
                            <BsXLg
                              className="ms-1"
                              size={10}
                              onClick={() => removerFiltro(campo)}
                            />
                          </Badge>
                        );
                      })}

                      {Object.keys(filtros).length > 0 && (
                        <span className="text-success ms-1 font-weight-bold">
                          Limpar
                        </span>
                      )}
                    </Container>
                  </Container>
                  <Container className="m-0 p-0" style={{ width: "180px" }}>
                    <LoadingButton variant="outline-success" block={true}>
                      <BsPlus size={24} />
                      <span className="mx-3 ">Incluir</span>
                    </LoadingButton>
                  </Container>
                </Container>

                {carregando && (
                  <Container
                    fluid
                    className="p-0 d-flex justify-content-center py-5 my-5"
                  >
                    <Spinner animation="grow" size="sm" />
                  </Container>
                )}

                {!carregando && (
                  <Container className="m-0 p-0 mt-5" fluid>
                    <TabelaOrdemCompra ordens={ordensCompra} />
                  </Container>
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
