import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Form, Row, Col, Spinner, Toast, Alert } from "react-bootstrap";
import ButtonBlock from "../../ButtonBlock";
import { formatarCNPJ, formatarTelefone } from "../../../util/formatar";
import AuthContext from "../../../contexts/auth";
import api from "../../../services/api";

export default function ModalProspeccao(props) {
  // Contexto de Usuário
  const userContext = useContext(AuthContext);
  const [idusuario, setIdusuario] = useState();

  // Controle do Modal
  const { show, setShow, prospeccao, carregar } = props;

  // Controlled Inputs
  const [idProspeccao, setIdProspeccao] = useState("");
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
  const [editando, setEditando] = useState(false);

  // Modal de falha na realização de prospecção
  const [falhaProspeccao, setFalhaProspeccao] = useState(false);
  const [mensagemFalha, setMensagemFalha] = useState(false);
  const [prospeccaoCriada, setProspeccaoCriada] = useState(false);
  const [prospeccaoAtualizada, setProspeccaoAtualizada] = useState(false);

  // Modal de resultado da validação
  const [showResultadoValidacao, setShowResultadoValidacao] = useState(false);
  const [mensagemValidacao, setMensagemValidacao] = useState("");

  // Permissionamento
  const [usuarioDono, setUsuarioDono] = useState(false);

  useEffect(() => {
    // Carregar valores nos inputs controlados
    setIdProspeccao(prospeccao.id);
    setEmpresa(prospeccao.empresa);
    setContato(prospeccao.contato);
    setCnpj(prospeccao.cnpj);
    setTelefone(prospeccao.telefone);
    setEmail(prospeccao.email);
    setComentarios(prospeccao.comentarios);
    setVendedor(prospeccao.vendedor);

    // Carrega contexto de usuário
    setIdusuario(useContext["username"]);
    if (idusuario === prospeccao.idusuario) {
      setUsuarioDono(true);
    }
  }, [prospeccao]);

  const resetarFlags = () => {
    setEditando(false);
    setFalhaProspeccao(false);
    setProspeccaoCriada(false);

    // Reseta flags de erros
    setErroEmpresa(false);
    setErroContato(false);
    setErroCnpj(false);
    setErroTelefone(false);
    setErroEmail(false);
    setErroVendedor(false);
  };

  const handleClose = () => {
    // Fecha o modal
    setShow(false);

    // Reseta todas as flags ao fechar o modal
    resetarFlags();

    // Disparar chamada de recarregar a tabela de resultados de prospecções
    if (prospeccaoAtualizada) {
      setProspeccaoAtualizada(false);
      carregar();
    }
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

  const atualizarProspeccao = async () => {
    // Configura/Reseta flags necessárias
    resetarFlags();
    setEditando(true);

    // Checa se a verificação de requisitos encontrou algum erro
    if (verificaRequisitos()) {
      setEditando(false);
      return;
    }

    // Requisição não contém erros, prosseguir com o envio para a API
    api
      .put("/vendas/prospeccao", {
        id: idProspeccao,
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
        if (result.data.message === "Prospecção atualizada com sucesso.") {
          setProspeccaoAtualizada(true);
        } else {
          setFalhaProspeccao(true);
          setMensagemFalha(result.data.message);
        }
      })
      .catch((error) => {
        console.log("Erro na atualização de prospecção:", error.message);
      })
      .finally(() => {
        setEditando(false);
      });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{prospeccao.empresa}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Empresa</Form.Label>
                <Form.Control
                  type="text"
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                  isInvalid={erroEmpresa}
                />
                <Form.Control.Feedback type="invalid">
                  Insira o nome da empresa
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm={4} controlId="formGridPassword">
                <Form.Label>CNPJ</Form.Label>
                <Form.Control
                  type="text"
                  value={formatarCNPJ(cnpj)}
                  onChange={(e) => setCnpj(e.target.value)}
                  isInvalid={erroCnpj}
                />
              </Form.Group>

              <Form.Group as={Col} sm={2} controlId="formGridPassword">
                <Form.Label>Data</Form.Label>
                <Form.Control
                  readOnly
                  type="text"
                  value={new Date(prospeccao.createdAt).toLocaleDateString("pt-BR")}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Vendedor</Form.Label>
                <Form.Control readOnly type="text" value={vendedor} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Contato</Form.Label>
                <Form.Control
                  type="text"
                  value={contato}
                  onChange={(e) => setContato(e.target.value)}
                  isInvalid={erroContato}
                />
                <Form.Control.Feedback type="invalid">
                  Insira o nome do contato
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={erroEmail}
                />
                <Form.Control.Feedback type="invalid">
                  Insira um email válido
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} sm={4} controlId="formGridEmail">
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  type="text"
                  value={formatarTelefone(telefone)}
                  onChange={(e) => setTelefone(e.target.value)}
                  isInvalid={erroTelefone}
                />
                <Form.Control.Feedback type="invalid">
                  Insira um número de telefone
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Comentarios</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  value={comentarios}
                  onChange={(e) => setComentarios(e.target.value)}
                />
              </Form.Group>
            </Row>
          </Form>

          {/* Resultados da operação */}
          {prospeccaoAtualizada && (
            <Alert variant="success" className="text-center">
              Os dados da prospecção foram atualizados com sucesso.
            </Alert>
          )}

          {falhaProspeccao && (
            <>
              <Alert variant="warning" className="text-center">
                <p>Não foi possível atualizar os dados da prospecção.</p>

                <p>{mensagemFalha}</p>
              </Alert>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {/* {usuarioDono && (
            <Button variant="outline-danger" onClick={() => setShow(false)}>
              Remover Prospecção
            </Button>
          )} */}
          <Button variant="primary" onClick={atualizarProspeccao}>
            {editando && (
              <Spinner
                className="mx-4"
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
            {!editando && <>Salvar Alterações</>}
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
