import React, { useState, useEffect, useContext } from "react";
import {
  Col,
  Container,
  Form,
  OverlayTrigger,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import Background from "../../../../components/Binx/Background";
import ContentCard from "../../../../components/Binx/ContentCard";
import LoadingButton from "../../../../components/Binx/LoadingButton";
import Menu from "../../../../components/Binx/Menu";
import Page from "../../../../components/Binx/Page";

import { BRLString } from "../../../../util/money";

import { AuthContext } from "../../../../contexts/auth";

import api from "../../../../services/api";
import TableNumberIndex from "../../../../components/Binx/TableNumberIndex";
import { BsPlusSquareFill } from "react-icons/bs";
import BotaoIncluirOrcamento from "../BotaoIncluirOrcamento";

const CustomTh = styled.th`
  min-width: 200px !important;
  max-width: 200px !important;
  width: 200px !important;
`;

function DadosOrdemCompra() {
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();

  const { idOrdemCompra } = useParams();

  const [carregando, setCarregando] = useState(true);
  const [ordemCompra, setOrdemCompra] = useState({});
  const [orcamentos, setOrcamentos] = useState([
    {
      id: Math.floor(Math.random() * 1000000),
      nomeFornecedor: "IDALL",
    },
    {
      id: Math.floor(Math.random() * 1000000),
      nomeFornecedor: "IDALL",
    },
    {
      id: Math.floor(Math.random() * 1000000),
      nomeFornecedor: "IDALL",
    },
    {
      id: Math.floor(Math.random() * 1000000),
      nomeFornecedor: "IDALL",
    },
    {
      id: Math.floor(Math.random() * 1000000),
      nomeFornecedor: "IDALL",
    },
    {
      id: Math.floor(Math.random() * 1000000),
      nomeFornecedor: "IDALL",
    },
  ]);

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

                    <Container fluid style={{ overflowX: "auto" }}>
                      <Row className="d-flex flex-row flex-nowrap">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => (
                          <Container className="col-4" key={el}>
                            {el}
                          </Container>
                        ))}
                      </Row>
                    </Container>

                    <Col
                      md={"auto"}
                      className="p-0 mt-5"
                      style={{ overflowX: "auto" }}
                    >
                      {/* <Table hover>
                        <thead>
                          <tr>
                            <th></th>
                            <th>SKU</th>
                            <th>Produto</th>
                            <th>Quantidade</th>
                            <th>Último Custo</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ordemCompra.produtos.map((produto, idx) => (
                            <tr key={produto.idSku}>
                              <td>
                                <TableNumberIndex number={idx + 1} />
                              </td>
                              <td>{produto.idSku}</td>
                              <td>{produto.nome}</td>
                              <td>{produto.quantidade}</td>
                              <td>{BRLString(produto.ultimoCusto, "R$ ")}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table> */}
                      <Table hover>
                        <thead>
                          <tr>
                            {orcamentos.map((orcamento) => (
                              <CustomTh key={orcamento.id}>
                                {orcamento.nomeFornecedor}
                              </CustomTh>
                            ))}

                            <th>
                              <BotaoIncluirOrcamento
                                incluirOrcamento={adicionarOrcamento}
                              />
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {ordemCompra.produtos.map((produto, idx) => (
                            <tr key={produto.idSku}>
                              {orcamentos.map((orcamento) => (
                                <td key={orcamento.id}></td>
                              ))}
                              <td></td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Col>
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
