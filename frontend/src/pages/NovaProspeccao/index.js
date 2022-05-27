import React, { useState, useContext, useEffect } from "react";

import api from "../../services/api";

import Menu from "../../components/Binx/Menu";

import ModalValidarProspeccao from "../../components/Prospeccoes/ModalValidarProspeccao";
import ModalFalhaProspeccao from "../../components/Prospeccoes/ModalFalhaProspeccao";
import ButtonBlock from "../../components/ButtonBlock";

import {
  Card,
  Container,
  Row,
  Form,
  Button,
  Spinner,
  Collapse,
  Col,
  Modal,
  Alert,
  Toast,
} from "react-bootstrap";

import "react-bootstrap-drawer/lib/style.css";
import { Drawer } from "react-bootstrap-drawer";

import { AuthContext } from "../../contexts/auth";

function NovaProspecao() {
  // Contexto de usuário
  const userContext = useContext(AuthContext);
  const [idusuario, setIdusuario] = useState("");

  // Controlled Inputs
  const [empresa, setEmpresa] = useState("");
  const [contato, setContato] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [vendedor, setVendedor] = useState("");

  // Indicadores de erro para validação do formulário
  const [erroEmpresa, setErroEmpresa] = useState(false);
  const [erroContato, setErroContato] = useState(false);
  const [erroCnpj, setErroCnpj] = useState(false);
  const [erroTelefone, setErroTelefone] = useState(false);
  const [erroEmail, setErroEmail] = useState(false);
  const [erroVendedor, setErroVendedor] = useState(false);

  // Flag de registro/validação de nova prospecação
  const [enviando, setEnviando] = useState(false);
  const [validando, setValidando] = useState(false);

  // Modal de falha na realização de prospecção
  const [falhaProspeccao, setFalhaProspeccao] = useState(false);
  const [mensagemFalha, setMensagemFalha] = useState(false);
  const [prospeccaoCriada, setProspeccaoCriada] = useState(false);

  // Modal de resultado da validação
  const [showResultadoValidacao, setShowResultadoValidacao] = useState(false);
  const [mensagemValidacao, setMensagemValidacao] = useState("");

  useEffect(() => {
    if (userContext) {
      setIdusuario(userContext["username"]);
    }
  }, []);

  const Asterisco = () => {
    return <span style={{ color: "red" }}>*</span>;
  };

  const limparFormularios = () => {
    setEmpresa("");
    setContato("");
    setCnpj("");
    setTelefone("");
    setEmail("");
    setVendedor("");
    setComentarios("");
  };

  const verificaRequisitos = () => {
    setErroEmpresa(false);
    setErroContato(false);
    setErroCnpj(false);
    setErroTelefone(false);
    setErroEmail(false);
    setErroVendedor(false);

    // Aplicar regras na construção do formulário
    let contemErros = false;

    if (empresa === "") {
      setErroEmpresa(true);
      contemErros = true;
    }

    if (contato === "") {
      setErroContato(true);
      contemErros = true;
    }

    if (telefone === "") {
      setErroTelefone(true);
      contemErros = true;
    }

    if (email === "") {
      setErroEmail(true);
      contemErros = true;
    }

    if (vendedor === "") {
      setErroVendedor(true);
      contemErros = true;
    }

    return contemErros;
  };

  const validarProspeccao = async () => {
    // Configura/Reseta flags necessárias
    setValidando(true);

    // Checa se a verificação de requisitos encontrou algum erro
    if (verificaRequisitos()) {
      setValidando(false);
      return;
    }

    console.log("Dados:", {
      empresa,
      contato,
      telefone,
      email,
      cnpj,
      vendedor,
      comentarios,
    });

    // Requisição não contém erros, prosseguir com o envio para a API
    api
      .post("/vendas/prospeccao/validar", {
        empresa,
        contato,
        telefone,
        email,
        cnpj,
        vendedor,
        comentarios,
      })
      .then((result) => {
        setMensagemValidacao(result.data.message);
        console.log(result.data.message);
        setShowResultadoValidacao(true);
      })
      .catch((error) => {
        console.log("Erro na validação de prospecção:", error.message);
      })
      .finally(() => {
        setValidando(false);
      });
  };

  const enviarProspeccao = async () => {
    // Configura/Reseta flags necessárias
    setEnviando(true);

    // Checa se a verificação de requisitos encontrou algum erro
    if (verificaRequisitos()) {
      setEnviando(false);
      return;
    }

    // Requisição não contém erros, prosseguir com o envio para a API
    api
      .post("/vendas/prospeccao", {
        idusuario,
        empresa,
        contato,
        telefone,
        email,
        cnpj,
        vendedor,
        comentarios,
      })
      .then((result) => {
        if (
          result.data.message ===
          "Nova prospecção de cliente corporativo criada."
        ) {
          limparFormularios();
          setProspeccaoCriada(true);
        } else {
          setFalhaProspeccao(true);
          setMensagemFalha(result.data.message);
        }
      })
      .catch((error) => {
        console.log("Erro na criação de prospecção:", error.message);
      })
      .finally(() => {
        setEnviando(false);
      });
  };

  return (
    <>
      <Menu logged={true} />

      <Container fluid>
        <Row className="flex-xl-nowrap">
          {/* Drawer */}
          <Col xs={12} md={3} lg={2} className="p-0">
            <Drawer>
              <Collapse>
                <Drawer.Overflow>
                  <Drawer.ToC>
                    <Drawer.Header className="text-center">
                      Prospeccção de Clientes
                    </Drawer.Header>

                    <Drawer.Nav>
                      <Drawer.Item>
                        <hr className="m-0 my-2" />
                      </Drawer.Item>
                      <Drawer.Item>
                        <p className="text-muted text-center mb-0">Opções:</p>
                      </Drawer.Item>
                      <Drawer.Item>
                        <ButtonBlock>
                          <Button
                            variant="success"
                            block
                            onClick={enviarProspeccao}
                          >
                            {enviando && (
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              />
                            )}
                            {!enviando && <>Salvar</>}
                          </Button>
                        </ButtonBlock>
                      </Drawer.Item>
                      <Drawer.Item>
                        <ButtonBlock>
                          <Button
                            variant="outline-info"
                            block
                            onClick={validarProspeccao}
                          >
                            {validando && (
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              />
                            )}
                            {!validando && <>Validar</>}
                          </Button>
                        </ButtonBlock>
                      </Drawer.Item>
                      <Drawer.Item>
                        <ButtonBlock>
                          <Button
                            variant="outline-secondary"
                            block
                            onClick={limparFormularios}
                          >
                            Limpar
                          </Button>
                        </ButtonBlock>
                      </Drawer.Item>
                      <Drawer.Item>
                        <hr className="m-0 my-2" />
                      </Drawer.Item>
                    </Drawer.Nav>
                  </Drawer.ToC>
                </Drawer.Overflow>
              </Collapse>
            </Drawer>
          </Col>

          <Col xs={12} md={9} lg={10} className="m-0">
            {/* <Card className="p-3 my-3"> */}
            <Container fluid className="mt-4">
              <Card.Title className="mt-2">Incluir Nova Prospecção</Card.Title>
              <Card.Subtitle className="my-2 text-muted">
                Registrar nova prospecção de cliente corporativo
              </Card.Subtitle>

              <hr className="m-0 my-4" />

              <Row>
                <Col sm={4}>
                  <Form.Group>
                    <Form.Label>
                      Nome da Empresa: <Asterisco />
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      value={empresa}
                      onChange={(e) => setEmpresa(e.target.value)}
                      isInvalid={erroEmpresa}
                    />
                    <Form.Control.Feedback type="invalid">
                      Insira o nome da empresa para realizar a prospecção
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={4}>
                  <Form.Group>
                    <Form.Label>
                      Nome do Contato: <Asterisco />
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      value={contato}
                      onChange={(e) => setContato(e.target.value)}
                      isInvalid={erroContato}
                    />
                    <Form.Control.Feedback type="invalid">
                      Insira o nome do contato para realizar a prospecção
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col sm={4}>
                  <Form.Group>
                    <Form.Label>CNPJ:</Form.Label>
                    <Form.Control
                      size="sm"
                      value={cnpj}
                      onChange={(e) => setCnpj(e.target.value)}
                      isInvalid={erroCnpj}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col sm={4}>
                  <Form.Group>
                    <Form.Label>
                      Telefone: <Asterisco />
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                      isInvalid={erroTelefone}
                    />
                    <Form.Control.Feedback type="invalid">
                      Insira um número de telefone para realizar a prospecção
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={4}>
                  <Form.Group>
                    <Form.Label>
                      Email: <Asterisco />
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      isInvalid={erroEmail}
                    />
                    <Form.Control.Feedback type="invalid">
                      Insira um email válido para realizar a prospecção
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={4}>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>
                      Vendedor: <Asterisco />
                    </Form.Label>
                    <Form.Control
                      as="select"
                      size="sm"
                      value={vendedor}
                      onChange={(e) => setVendedor(e.target.value)}
                      isInvalid={erroVendedor}
                    >
                      <option value="">Selecione o Vendedor</option>
                      <option value="Daiane">Daiane</option>
                      <option value="Dayane">Dayane</option>
                      <option value="Gabriela">Gabriela</option>
                      <option value="Mariane">Mariane</option>
                      <option value="Felipe">Felipe</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Selecione um vendedor para realizar a prospecção.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <hr className="m-0 my-4" />

              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Comentários:</Form.Label>
                    <Form.Control
                      as="textarea"
                      value={comentarios}
                      rows={7}
                      onChange={(e) => setComentarios(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <hr className="m-0 my-4" />
            </Container>
          </Col>
        </Row>
      </Container>

      {/* Modal para falha na execução da prospeccao */}
      <ModalFalhaProspeccao
        show={falhaProspeccao}
        setShow={setFalhaProspeccao}
        mensagemFalha={mensagemFalha}
      />

      {/* Modal para resultado da validação */}
      <ModalValidarProspeccao
        show={showResultadoValidacao}
        setShow={setShowResultadoValidacao}
        mensagemValidacao={mensagemValidacao}
      />

      {/* Toast para sucesso da criação de nova prospecação */}
      <Toast
        onClose={() => setProspeccaoCriada(false)}
        show={prospeccaoCriada}
        delay={3000}
        autohide
        style={{
          position: "absolute",
          top: 50,
          right: 0,
        }}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">Nova Prospecção Realizada</strong>
        </Toast.Header>
        <Toast.Body>
          <Alert variant="success">A prospecção foi criada com sucesso!</Alert>
        </Toast.Body>
      </Toast>
    </>
  );
}

export default NovaProspecao;
