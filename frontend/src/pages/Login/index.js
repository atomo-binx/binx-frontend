import React, { useState, useRef } from "react";
import { Auth } from "../../services/amplify";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Form,
  Button,
  Spinner,
  Image,
  InputGroup,
  Overlay,
  Tooltip,
} from "react-bootstrap";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

import LogoBinx from "../../assets/logo_original.png";
import "./styles.css";

import Menu from "../../components/Binx/Menu";
import ButtonBlock from "../../components/ButtonBlock";
import ModalCriarSenha from "../../components/Login/ModalCriarSenha";

function Home() {
  const navigate = useNavigate();

  const [cognitoUser, setCognitoUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [carregando, setCarregando] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [emailInvalido, setEmailInvalido] = useState(false);
  const [senhaInvalida, setSenhaInvalida] = useState(false);
  const [loginInvalido, setLoginInvalido] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  const [exibirSenha, setExibirSenha] = useState(false);

  const refEmail = useRef(null);
  const refSenha = useRef(null);

  const handleClose = () => {
    setShowModal(false);
    setCarregando(false);
    setLoginInvalido(false);
  };

  const realizarLogin = async (event) => {
    event.preventDefault();

    setCarregando(true);
    setLoginInvalido(false);
    setEmailInvalido(false);
    setSenhaInvalida(false);

    // Testar dados inseridos no formulário
    const testaEmail =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const testaSenha = /^\S+$/;

    // Teste para um email válido
    if (!testaEmail.test(String(username).toLowerCase())) {
      setEmailInvalido(true);
      setCarregando(false);
      return;
    }

    // Teste para uma senha válida (que não tenha espaços em branco)
    if (!testaSenha.test(String(password).toLowerCase())) {
      setSenhaInvalida(true);
      setCarregando(false);
      return;
    }

    await Auth.signIn(username, password)
      .then((user) => {
        if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
          setCognitoUser(user);
          setShowModal(true);
        } else {
          navigate("/painel");
        }
      })
      .catch((error) => {
        console.log(error);
        setCarregando(false);

        setLoginInvalido(true);
        console.log(error.message);

        switch (error.message) {
          case "Password attempts exceeded":
            setMensagemErro(
              "Número máximo de tentativas excedidas. Tente novamente em alguns instantes."
            );
            break;
          case "Incorrect username or password.":
            setMensagemErro("Usuário e/ou senha incorretos");
            break;
          default:
            setMensagemErro("Erro ao realizar login. Tente novamente.");
            break;
        }
      });
  };

  return (
    <>
      <Container fluid className="bg-gray binx-container">
        <Menu logged={false} />

        <Row className="justify-content-center">
          <Container
            className="bg-white binx-card text-center card-login p-4"
            style={{ width: "20rem" }}
          >
            <Container className="text-center mt-2 mb-4">
              <Image src={LogoBinx} width="150" />
            </Container>
            <Form noValidate onSubmit={realizarLogin}>
              <Form.Group>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setUsername(e.target.value)}
                  isInvalid={loginInvalido}
                  ref={refEmail}
                />
                <Overlay
                  target={refEmail.current}
                  show={emailInvalido}
                  placement="right"
                >
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      Insira um email válido
                    </Tooltip>
                  )}
                </Overlay>
              </Form.Group>

              <Form.Group controlId="form-login-senha" className="mt-4">
                <InputGroup>
                  <Form.Control
                    type={exibirSenha ? "text" : "password"}
                    placeholder="Senha"
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={loginInvalido}
                  />
                  <InputGroup.Text
                    ref={refSenha}
                    className={`password-eye bg-white ${
                      loginInvalido ? "eye-invalid" : ""
                    }`}
                    onClick={() => setExibirSenha(!exibirSenha)}
                  >
                    {!exibirSenha && <BsFillEyeFill />}
                    {exibirSenha && <BsFillEyeSlashFill />}
                  </InputGroup.Text>
                </InputGroup>

                <Overlay
                  target={refSenha.current}
                  show={senhaInvalida}
                  placement="right"
                >
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      Insira uma senha válida
                    </Tooltip>
                  )}
                </Overlay>
              </Form.Group>

              {loginInvalido && (
                <Container className="m-0">
                  <p className="error-message mb-0">{mensagemErro}</p>
                </Container>
              )}

              <ButtonBlock>
                <Button className="my-4" variant="primary" type="submit">
                  {carregando && (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  )}
                  {!carregando && <>Entrar</>}
                </Button>
              </ButtonBlock>
            </Form>
          </Container>
        </Row>
      </Container>

      {/* Modal de Criação de Nova Senha */}
      <ModalCriarSenha
        showModal={showModal}
        handleClose={handleClose}
        cognitoUser={cognitoUser}
      />
    </>
  );
}

export default Home;
