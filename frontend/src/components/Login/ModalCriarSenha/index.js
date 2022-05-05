import { React, useState, useEffect, useRef } from "react";
import { Auth } from "../../../services/amplify";

import {
  Modal,
  Button,
  Form,
  Spinner,
  Alert,
  Overlay,
  Tooltip,
  InputGroup,
  Container
} from "react-bootstrap";

import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

import api from "../../../services/api";

import "./styles.css";

function ModalCriarSenha(props) {
  const { showModal, handleClose, cognitoUser } = props;

  const [primeiraSenha, setPrimeiraSenha] = useState("");
  const [segundaSenha, setSegundaSenha] = useState("");

  const [carregando, setCarregando] = useState(false);

  const [erro, setErro] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  const [nomeInvalido, setNomeInvalido] = useState(false);
  const [nome, setNome] = useState("");
  const [sub, setSub] = useState("");

  const refNome = useRef(null);

  const [exibirPrimeiraSenha, setExibirPrimeiraSenha] = useState(false);
  const [exibirSegundaSenha, setExibirSegundaSenha] = useState(false);

  useEffect(() => {
    setErro(false);
    setCarregando(false);
    if (cognitoUser) {
      setNome(cognitoUser.challengeParam.userAttributes["custom:displayname"]);
      setSub(cognitoUser["username"]);
    }
  }, [cognitoUser, showModal]);

  const confirmarSenha = async (event) => {
    event.preventDefault();

    // Reset Flags
    setCarregando(true);
    setNomeInvalido(false);
    setErro(false);

    // Verificação de requisitos de nome
    if (nome === "" || nome.length < 3 || nome.length > 20) {
      setNomeInvalido(true);
      setCarregando(false);
      return;
    }

    // Iniciar Verificação de requisitos de novas senhas
    if (primeiraSenha === "" && segundaSenha === "") {
      setErro(true);
      setMensagemErro("As senhas não podem estar vazias.");
      setCarregando(false);
      return;
    }

    if (primeiraSenha !== segundaSenha) {
      setErro(true);
      setMensagemErro("As senhas inseridas devem ser idênticas.");
      setCarregando(false);
      return;
    }

    if (primeiraSenha.includes(" ") || segundaSenha.includes(" ")) {
      setErro(true);
      setMensagemErro("A senha não deve conter espaços em branco.");
      setCarregando(false);
      return;
    }

    if (primeiraSenha.length < 8 || segundaSenha.length < 8) {
      setErro(true);
      setMensagemErro("A senha deve ter ao menos 8 caracteres.");
      setCarregando(false);
      return;
    }

    // Senhas atendem aos requisitos mínimos
    Auth.completeNewPassword(cognitoUser, segundaSenha, {
      "custom:displayname": nome,
    })
      .then(async (user) => {
        // Contato foi criado e atualizado no Cognito, vamos tentar atualizar no Binx
        // A compleção do cadastro no Binx não é necessária para continuar o redirecionamento
        // A única divergência ficará sendo o nome de usuário que não estará atualizado
        await api
          .put("/usuario", {
            usuario: {
              idusuario: sub,
              nome: nome,
            },
          })
          .catch((error) => {
            console.log(
              "Erro durante a atualização de usuário no banco de dados do binx."
            );
          });

        window.location.reload();
      })
      .catch((error) => {
        console.log(error.message);

        setErro(true);
        setCarregando(false);

        // Liga com erro de resposta da operação de alteração de senha
        switch (error.message) {
          case "Password does not conform to policy: Password not long enough":
            setMensagemErro("A senha deve ter ao menos 8 caracteres.");
            break;
          default:
            setMensagemErro("Erro ao criar nova senha. Tente novamente.");
            break;
        }
      });
  };

  return (
    <>
      <Modal
        Modal
        show={showModal}
        onHide={handleClose}
        centered
        size="md"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Nova Senha de Usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <p>Crie uma nova senha de usuário para utilizar o Binx.</p>
          <Form onSubmit={confirmarSenha}>
            <Form.Group>
              <Form.Label className="text-muted">Nome de exibição</Form.Label>
              <Form.Control
                type="text"
                defaultValue={nome}
                onChange={(e) => setNome(e.target.value)}
                ref={refNome}
              />
              <Overlay target={refNome.current} show={nomeInvalido} placement="right">
                {(props) => (
                  <Tooltip id="overlay-example" {...props}>
                    O nome deve ter entre 3 e 20 caracteres
                  </Tooltip>
                )}
              </Overlay>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label className="text-muted">Insira uma nova senha</Form.Label>
              <InputGroup>
                <Form.Control
                  id="senha-input"
                  type={exibirPrimeiraSenha ? "text" : "password"}
                  placeholder="Nova Senha"
                  onChange={(e) => setPrimeiraSenha(e.target.value)}
                  isInvalid={erro}
                />
                <InputGroup.Text
                  className={`password-eye bg-white ${erro ? "eye-invalid" : ""} `}
                  onClick={() => setExibirPrimeiraSenha(!exibirPrimeiraSenha)}
                >
                  {!exibirPrimeiraSenha && <BsFillEyeFill />}
                  {exibirPrimeiraSenha && <BsFillEyeSlashFill />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label className="text-muted">Confirmar nova senha</Form.Label>
              <InputGroup>
                <Form.Control
                  id="senha-input"
                  type={exibirSegundaSenha ? "text" : "password"}
                  placeholder="Nova Senha"
                  onChange={(e) => setSegundaSenha(e.target.value)}
                  isInvalid={erro}
                />
                <InputGroup.Text
                  className={`password-eye bg-white ${erro ? "eye-invalid" : ""} `}
                  onClick={() => setExibirSegundaSenha(!exibirSegundaSenha)}
                >
                  {!exibirSegundaSenha && <BsFillEyeFill />}
                  {exibirSegundaSenha && <BsFillEyeSlashFill />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            {erro && (
              <Container className="m-0 p-0">
                <p className="error-message mb-0">{mensagemErro}</p>
              </Container>
            )}

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit" className="mt-4">
                {carregando && (
                  <Spinner
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                )}
                {!carregando && <>Confirmar</>}
              </Button>
            </div>

            <Alert className="mt-4 text-center" variant="info">
              Sua senha deve ter no mínimo 8 caracteres.
            </Alert>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalCriarSenha;
