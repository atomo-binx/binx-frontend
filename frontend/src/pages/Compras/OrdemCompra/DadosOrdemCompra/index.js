import React, { useState, useEffect, useContext } from "react";

import { useForm } from "react-hook-form";

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
  const [cacheFornecedores, setcacheFornecedores] = useState([]);
  const [cacheProdutos, setCacheProdutos] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  function incluirOrcamento() {
    const orcamentosHold = orcamentos;

    orcamentos.push({
      idFornecedor: null,
      nomeFornecedor: null,

      produtos: produtos.map((produto) => {
        return {
          idSku: produto.idSku,
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

    setOrcamentos([...orcamentosFiltrados]);
  }

  function atribuirFornecedor(idxOrcamento, idFornecedor, nomeFornecedor) {
    const orcamentosHold = orcamentos;

    orcamentosHold[idxOrcamento].idFornecedor = idFornecedor;
    orcamentosHold[idxOrcamento].nomeFornecedor = nomeFornecedor;

    setOrcamentos([...orcamentosHold]);
  }

  function incluirProduto() {
    // Incluir nova linha de produto no orçamento
    // Inicialmente, o produto ainda não foi definido, e a linha está vazia
    const orcamentosHold = orcamentos;

    orcamentosHold.forEach((orcamento) => {
      orcamento.produtos.push({
        idSku: null,
        idSituacaoOrcamento: 1,
        situacao: "",
        valor: "",
      });
    });

    setOrcamentos([...orcamentosHold]);

    // Incluir o produto na lista de produtos
    const produtosHold = produtos;

    produtosHold.push({
      idSku: null,
      quantidade: 1,
      nome: "",
      ultimoCusto: "",
    });

    setProdutos([...produtosHold]);
  }

  function removerProduto(idxProduto) {
    // Remover o produto da lista de produtos
    const produtosFiltrados = produtos.filter((orcamento, idx) =>
      idx === idxProduto ? false : true
    );

    setProdutos([...produtosFiltrados]);

    // Remover o produto de cada uma das listas de orçamentos
    const orcamentosHold = orcamentos;

    orcamentosHold.forEach((orcamento) => {
      const produtosOrcamentoFiltrados = orcamento.produtos.filter(
        (produto, idx) => (idx === idxProduto ? false : true)
      );

      orcamento.produtos = produtosOrcamentoFiltrados;
    });

    setOrcamentos(orcamentosHold);
  }

  function atribuirProduto(idxProduto, produto) {
    // Atribuir o produto na lista de produtos
    const produtosHold = produtos;

    produtosHold[idxProduto] = produto;

    setProdutos([...produtosHold]);

    // Agora que o produto foi selecionado, atribuir também na lista de orçamentos
    const orcamentosHold = orcamentos;

    orcamentosHold.forEach((orcamento) => {
      orcamento.produtos[idxProduto] = {
        idSku: produto.idSku,
        idSituacaoOrcamento: 1,
        situacao: "",
        valor: "",
      };
    });

    setOrcamentos([...orcamentosHold]);
  }

  function salvarOrdemCompra(data) {
    console.log(data);

    console.log(orcamentos);
    console.log(produtos);
  }

  useEffect(() => {
    // Carregar cachê da lista de fornecedores
    api
      .get(`/fornecedor`, {
        headers: {
          Authorization: `Bearer ${userContext.accessToken}`,
        },
      })
      .then((response) => {
        setcacheFornecedores(response.data.fornecedores);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate("/");
        }
      });

    // Carregar cachê da lista de produtos
    api
      .get(`/produto/nomesku`, {
        headers: {
          Authorization: `Bearer ${userContext.accessToken}`,
        },
      })
      .then((response) => {
        setCacheProdutos(response.data.produtos);
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
                    <form onSubmit={handleSubmit(salvarOrdemCompra)}>
                      <Container
                        fluid
                        className="p-0 d-flex flex-row justify-content-between mt-2"
                      >
                        <Container className="p-0">aaaa</Container>
                        <Container className="p-0 d-flex flex-row justify-content-end">
                          <Col style={{ maxWidth: "200px" }}>
                            <LoadingButton
                              block
                              variant="outline-secondary"
                              onClick={() => navigate("/compras/ordemcompra")}
                            >
                              Cancelar
                            </LoadingButton>
                          </Col>
                          <Col style={{ maxWidth: "200px" }} className="ms-4">
                            <LoadingButton
                              block
                              variant="success"
                              // onClick={salvarOrdemCompra}
                              type="submit"
                            >
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
                              ordemCompra.dataFinalizacao
                                ? new Date(
                                    ordemCompra.dataFinalizacao
                                  ).toLocaleDateString()
                                : ""
                            }
                          />
                        </Col>
                      </Row>

                      <Col
                        md={"auto"}
                        className="p-0 mt-5"
                        style={{ overflowX: "auto" }}
                      >
                        <TabelaProdutosOrdemCompra
                          produtos={[...produtos]}
                          orcamentos={[...orcamentos]}
                          cacheFornecedores={[...cacheFornecedores]}
                          cacheProdutos={[...cacheProdutos]}
                          atribuirFornecedor={atribuirFornecedor}
                          incluirOrcamento={incluirOrcamento}
                          removerOrcamento={removerOrcamento}
                          removerProduto={removerProduto}
                          atribuirProduto={atribuirProduto}
                          register={register}
                        />
                      </Col>

                      <Container
                        fluid
                        className="d-flex flex-row justify-content-end align-items-center"
                      >
                        <BotaoAdicionarItem incluirProduto={incluirProduto} />
                      </Container>
                    </form>
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
