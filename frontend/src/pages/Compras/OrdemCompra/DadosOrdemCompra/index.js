import React, { useState, useEffect, useContext } from "react";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Background from "../../../../components/Binx/Background";
import ContentCard from "../../../../components/Binx/ContentCard";
import LoadingButton from "../../../../components/Binx/LoadingButton";
import Menu from "../../../../components/Binx/Menu";
import Page from "../../../../components/Binx/Page";

import BotaoAdicionarItem from "../BotaoAdicionarItem";
import TabelaProdutosOrdemCompra from "../TabelaProdutosOrdemCompra";
import TabelaOrcamentosOrdemCompra from "../TabelaOrcamentosOrdemCompra";

import api from "../../../../services/api";

import { AuthContext } from "../../../../contexts/auth";

function DadosOrdemCompra() {
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();

  const { idOrdemCompra } = useParams();

  const [carregando, setCarregando] = useState(true);

  const [ordemCompra, setOrdemCompra] = useState({});
  const [orcamentos, setOrcamentos] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);

  function incluirOrcamento() {
    console.log("incluindo");

    const orcamentosHold = orcamentos;

    orcamentos.push({
      idFornecedor: null,
      fornecedor: "",

      produtos: produtos.map((produto) => {
        return {
          idSku: "",
          idSituacaoOrcamento: "",
          situacao: "",
          valor: "",
        };
      }),
    });

    setOrcamentos([...orcamentosHold]);
  }

  function removerOrcamento(idx) {
    const orcamentosFiltrados = orcamentos.filter((orcamento, i) =>
      i === idx ? false : true
    );

    setOrcamentos(orcamentosFiltrados);
  }

  function incluirProduto() {}

  useEffect(() => {
    // Carregar cachê da lista de fornecedores
    api
      .get(`/fornecedor`, {
        headers: {
          Authorization: `Bearer ${userContext.accessToken}`,
        },
      })
      .then((response) => {
        setFornecedores(response.data.fornecedores);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate("/");
        }
      });

    // Carregar dados da ordem de compra
    if (idOrdemCompra) {
      api
        .get(`/ordemcompra/${idOrdemCompra}`, {
          headers: {
            Authorization: `Bearer ${userContext.accessToken}`,
          },
        })
        .then((response) => {
          setOrdemCompra(response.data.ordemCompra);
          setOrcamentos(response.data.ordemCompra.orcamentos);
          setProdutos(response.data.ordemCompra.produtos);
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
  }, []);

  return (
    <>
      <Background>
        <Menu logged={true} />

        <Page>
          <Page.Body>
            <Page.Content>
              <Page.Title>Ordem de Compra</Page.Title>
              <Page.Subtitle>{idOrdemCompra && <>...</>}</Page.Subtitle>
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
                      className="p-0 d-flex flex-row justify-content-between mt-2"
                    >
                      <Container className="p-0">aaaa</Container>
                      <Container className="p-0 d-flex flex-row justify-content-end">
                        <Col style={{ maxWidth: "200px" }}>
                          <LoadingButton block variant="outline-secondary">
                            Cancelar
                          </LoadingButton>
                        </Col>
                        <Col style={{ maxWidth: "200px" }} className="ms-4">
                          <LoadingButton block variant="success">
                            Salvar
                          </LoadingButton>
                        </Col>
                      </Container>
                    </Container>

                    <Row className="mt-5">
                      <Col md={3}>
                        <Form.Label>
                          <strong>Tipo</strong>
                        </Form.Label>
                        <Form.Select
                          value={ordemCompra.idTipo}
                          onChange={(e) => {}}
                        >
                          <option value="1">Reposição de Estoque</option>
                          <option value="2">Atender Venda</option>
                        </Form.Select>
                      </Col>
                      <Col md={3}>
                        <Form.Label>
                          <strong>Comprador</strong>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          disabled
                          placeholder={ordemCompra.comprador || ""}
                        />
                      </Col>
                      <Col md={3}>
                        <Form.Label>
                          <strong>Situação</strong>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          disabled
                          placeholder={ordemCompra.situacao}
                        />
                      </Col>
                      <Col md={3}>
                        <Form.Label>
                          <strong>Data de Finalização</strong>
                        </Form.Label>
                        <Form.Control
                          disabled
                          readOnly
                          type="text"
                          placeholder={
                            new Date(
                              ordemCompra.dataFinalizacao
                            ).toLocaleDateString() || ""
                          }
                        />
                      </Col>
                    </Row>

                    <Row
                      md={"auto"}
                      className="p-0 mt-5 d-flex flex-row flex-nowrap"
                      style={{ maxWidth: "100%" }}
                    >
                      <Col>
                        <TabelaProdutosOrdemCompra produtos={produtos} />
                      </Col>

                      <Col
                        className="m-0 p-0 d-flex flex-row"
                        style={{ overflowX: "auto", maxWidth: "40%" }}
                      >
                        <TabelaOrcamentosOrdemCompra
                          produtos={produtos}
                          orcamentos={orcamentos}
                          fornecedores={fornecedores}
                          incluirOrcamento={incluirOrcamento}
                          removerOrcamento={removerOrcamento}
                        />
                      </Col>
                    </Row>

                    <Container
                      fluid
                      className="d-flex flex-row justify-content-end align-items-center"
                    >
                      <BotaoAdicionarItem />
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

export default DadosOrdemCompra;
