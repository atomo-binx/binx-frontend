import React, { useState, useEffect } from "react";
import { Auth } from "../../services/amplify";

import Menu from "../../components/Binx/Menu";

import "react-bootstrap-drawer/lib/style.css";
import { Drawer } from "react-bootstrap-drawer";

import Usuarios from "../../components/Configuracoes/Usuarios";

import {
  Card,
  Alert,
  Badge,
  Container,
  Row,
  Button,
  Tab,
  Col,
  Nav,
  Accordion,
  Collapse,
} from "react-bootstrap";

export default function Configuracoes() {
  const [config, setConfig] = useState("inicio");

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => console.log("Usuario Verificado: ", user))
      .catch((err) => console.log("Usuario não verificado:", err));

    Auth.currentSession()
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Menu logged={true} />

      <Container fluid>
        <Row className="flex-xl-nowrap">
          <Col xs={12} md={3} lg={2} className="p-0">
            <Drawer>
              <Collapse>
                <Drawer.Overflow>
                  <Drawer.ToC>
                    <Drawer.Header className="text-center">
                      Configurações
                    </Drawer.Header>
                    <Drawer.Nav>
                      <Drawer.Item>
                        <hr className="m-0 my-2" />
                      </Drawer.Item>
                      <Drawer.Item>
                        <Button block onClick={() => setConfig("usuarios")}>
                          Usuários
                        </Button>
                      </Drawer.Item>
                      <Drawer.Item>
                        <Button
                          block
                          onClick={() => setConfig("sincronizacao")}
                        >
                          Sincronização
                        </Button>
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

          <Col>
            <Container className="mt-4">
              <h5>Configurações</h5>
              <p className="text-muted">
                Gerenciamento de configurações adicionais do sistema
              </p>

              {config === "inicio" && (
                <>
                  <Container className="p-0">
                    <Alert variant="warning">
                      Selecione o menu de configurações desejado no menu lateral
                    </Alert>
                  </Container>
                </>
              )}

              {config === "usuarios" && <Usuarios />}
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}
