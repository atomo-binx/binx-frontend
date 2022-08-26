import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Background from "../../../components/Binx/Background";
import ContentCard from "../../../components/Binx/ContentCard";
import Menu from "../../../components/Binx/Menu";
import Page from "../../../components/Binx/Page";
import LoadingButton from "../../../components/Binx/LoadingButton";
import ToastSquare from "../../../components/Binx/ToastSquare";

import api from "../../../services/api";
import { AuthContext } from "../../../contexts/auth";

import { Form, Row, Col, Toast, ToastContainer } from "react-bootstrap";

function Exportar() {
  const user = useContext(AuthContext);
  const navigate = useNavigate();

  const [exportarDescricao, setExportarDescricao] = useState(true);
  const [exportarImagens, setExportarImagens] = useState(true);
  const [exportarSEO, setExportarSEO] = useState(true);

  const [sku, setSku] = useState("");
  const [especificacoes, setEspecificacoes] = useState("");
  const [loading, setLoading] = useState(false);

  const [exibirToast, setExibirToast] = useState(false);
  const [toastStatus, setToastStatus] = useState("");

  const exportar = (event) => {
    event.preventDefault();

    setLoading(true);

    api
      .post(
        "/componex/sincronizacadastro",
        {
          sku,
          exportarDescricao,
          exportarImagens,
          exportarSEO,
          especificacoes,
        },
        {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then(() => {
        setToastStatus("ok");
      })
      .catch((error) => {
        setToastStatus("error");

        switch (error.response.status) {
          case 401:
            navigate("/");
            break;
          default:
            console.log("Deu ruim:", error.response.data.message);
            break;
        }
      })
      .finally(() => {
        setExibirToast(true);
        setLoading(false);
      });
  };

  return (
    <>
      <Background>
        <Menu logged={true} />
        <Page>
          <Page.Body>
            <Page.Content>
              <Page.Title>Exportar produtos para a Loja Integrada</Page.Title>
              <Page.Subtitle>
                Criar cadastro de produto na Loja Integrada com base no cadastro
                do Magento
              </Page.Subtitle>
              <ContentCard>
                <Form onSubmit={exportar}>
                  <Row>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>SKU do Produto</Form.Label>
                        <Form.Control
                          type="text"
                          value={sku}
                          onChange={(e) => setSku(e.target.value)}
                        />
                      </Form.Group>
                      <Row>
                        <p>Incluir:</p>
                        <Col>
                          <Form.Switch
                            checked={exportarDescricao}
                            value={exportarDescricao}
                            label="Descrição"
                            onChange={(e) =>
                              setExportarDescricao(e.target.checked)
                            }
                          />
                        </Col>
                        <Col>
                          <Form.Switch
                            checked={exportarImagens}
                            value={exportarImagens}
                            label="Imagens"
                            onChange={(e) =>
                              setExportarImagens(e.target.checked)
                            }
                          />
                        </Col>
                        <Col>
                          <Form.Switch
                            checked={exportarSEO}
                            value={exportarSEO}
                            label="SEO"
                            onChange={(e) => setExportarSEO(e.target.checked)}
                          />
                        </Col>
                      </Row>
                      <LoadingButton
                        className="my-4"
                        block={true}
                        variant="primary"
                        type="submit"
                        loading={loading}
                      >
                        Exportar Cadastro
                      </LoadingButton>
                    </Col>

                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Tabela de Características</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={15}
                          value={especificacoes}
                          onChange={(e) => setEspecificacoes(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </ContentCard>
            </Page.Content>
          </Page.Body>
        </Page>
      </Background>

      <ToastContainer position={"top-end"} className="mt-4 pt-4">
        <Toast
          onClose={() => setExibirToast(false)}
          show={exibirToast}
          delay={10000}
          autohide
          className="mt-4"
        >
          <Toast.Header>
            <ToastSquare
              variant={toastStatus === "error" ? "danger" : "success"}
            />
            <strong className="me-auto">
              {toastStatus === "error" && <>Falha de Exportação</>}
              {toastStatus === "ok" && <>Exportação Concluída</>}
            </strong>
          </Toast.Header>
          <Toast.Body>
            {toastStatus === "error" && (
              <>Não foi possível realizar a exportação dos dados para o Binx</>
            )}
            {toastStatus === "ok" && (
              <>
                O cadastro do Magento foi exportado com sucesso para a Componex
              </>
            )}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default Exportar;
