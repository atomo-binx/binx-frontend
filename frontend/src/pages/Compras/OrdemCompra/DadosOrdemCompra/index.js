import React, { useState, useEffect, useContext } from "react";
import { Col, Container, Form, Row, Spinner, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import Background from "../../../../components/Binx/Background";
import ContentCard from "../../../../components/Binx/ContentCard";
import LoadingButton from "../../../../components/Binx/LoadingButton";
import Menu from "../../../../components/Binx/Menu";
import Page from "../../../../components/Binx/Page";
import TableNumberIndex from "../../../../components/Binx/TableNumberIndex";

import api from "../../../../services/api";
import BotaoIncluirOrcamento from "../BotaoIncluirOrcamento";
import BotaoAdicionarItem from "../BotaoAdicionarItem";
import BotaoLixeira from "../BotaoLixeira";
import BotaoInfo from "../BotaoInfo";

import { BRLString } from "../../../../util/money";

import { AuthContext } from "../../../../contexts/auth";

import { BsTrashFill, BsInfoCircleFill } from "react-icons/bs";

const CustomTh = styled.th`
  min-width: ${(props) => props.width}px !important;
  max-width: ${(props) => props.width}px !important;
  width: ${(props) => props.width}px !important;
  font-size: 0.8rem !important;
`;

const CustomTd = styled.td`
  font-size: 0.8rem !important;
`;

const CustomTable = styled(Table)`
  font-size: 0.7rem !important;
`;

function DadosOrdemCompra() {
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();

  const { idOrdemCompra } = useParams();

  const [carregando, setCarregando] = useState(true);
  const [ordemCompra, setOrdemCompra] = useState({});
  const [orcamentos, setOrcamentos] = useState([]);

  function adicionarOrcamento() {
    console.log("Adicionando");

    const orcamentosHold = orcamentos;

    orcamentos.push({
      id: Math.floor(Math.random() * 1000000),
      nomeFornecedor: "IDALL",
    });

    setOrcamentos([...orcamentosHold]);
  }

  useEffect(() => {
    if (idOrdemCompra) {
      api
        .get(`/ordemcompra/${idOrdemCompra}`, {
          headers: {
            Authorization: `Bearer ${userContext.accessToken}`,
          },
        })
        .then((response) => {
          setOrdemCompra(response.data.ordemCompra);
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

                    <Col
                      md={"auto"}
                      className="p-0 mt-5"
                      style={{ overflowX: "auto" }}
                    >
                      <CustomTable hover>
                        <thead>
                          <tr>
                            <CustomTh width={1}></CustomTh>
                            <CustomTh width={1}></CustomTh>
                            <CustomTh width={50}>SKU</CustomTh>
                            <CustomTh width={350}>Produto</CustomTh>
                            <CustomTh width={1}></CustomTh>
                            <CustomTh width={50}>Qntd.</CustomTh>
                            <CustomTh width={100}>Último Custo</CustomTh>

                            {orcamentos.map((orcamento) => (
                              <CustomTh key={orcamento.id} width={120}>
                                <Form.Control
                                  type="text"
                                  size="sm"
                                  placeholder="Fornecedor"
                                />
                              </CustomTh>
                            ))}

                            <th className="d-flex justify-content-end">
                              <BotaoIncluirOrcamento
                                incluirOrcamento={adicionarOrcamento}
                              />
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {ordemCompra.produtos.map((produto, idx) => (
                            <tr key={produto.idSku}>
                              <CustomTd>
                                <TableNumberIndex number={idx + 1} />
                              </CustomTd>
                              <CustomTd>
                                <BotaoLixeira
                                  tooltip={"Remover Produto"}
                                  size={17}
                                />
                              </CustomTd>
                              <CustomTd>{produto.idSku}</CustomTd>
                              <CustomTd>{produto.nome}</CustomTd>
                              <CustomTd>
                                <BotaoInfo
                                  tooltip={"Exibir Histórico"}
                                  size={17}
                                />
                              </CustomTd>
                              <CustomTd>{produto.quantidade}</CustomTd>
                              <CustomTd>
                                {BRLString(produto.ultimoCusto, "R$ ")}
                              </CustomTd>

                              {orcamentos.map((orcamento) => (
                                <CustomTd key={orcamento.id}>
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    placeholder=""
                                  />
                                </CustomTd>
                              ))}

                              <CustomTd></CustomTd>
                            </tr>
                          ))}

                          {orcamentos.length > 0 && (
                            <tr>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              {orcamentos.map((orcamento) => (
                                <td key={orcamento.id}>
                                  <LoadingButton
                                    block
                                    size="sm"
                                    variant="outline-danger"
                                  >
                                    Remover
                                  </LoadingButton>
                                </td>
                              ))}
                              <td></td>
                            </tr>
                          )}
                        </tbody>
                      </CustomTable>
                    </Col>

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
