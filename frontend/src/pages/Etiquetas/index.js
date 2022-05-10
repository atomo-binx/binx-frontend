import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Menu from "../../components/Menu";
import ButtonBlock from "../../components/ButtonBlock";

import api from "../../services/api";

import { Form, Row, Button, Spinner, Col } from "react-bootstrap";

import AuthContext from "../../contexts/auth";

function Etiquetas() {
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();

  const [token, setToken] = useState(null);

  const [carregando, setCarregando] = useState(false);
  const [sku, setSku] = useState("");
  const [pedido, setPedido] = useState("");

  useEffect(() => {
    if (userContext) {
      setToken(userContext["signInUserSession"]["accessToken"]["jwtToken"]);
    }
  }, [userContext]);

  const etiquetaProduto = async (event) => {
    event.preventDefault();

    await api
      .post(
        "/expedicao/etiqueta/produto",
        {
          idsku: [sku],
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      )
      .then((response) => {
        const file = new Blob([response.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
        URL.revokeObjectURL();
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate("/");
        }
      });
  };

  const etiquetaPedido = async (event) => {
    event.preventDefault();

    await api
      .post(
        "/expedicao/etiqueta/pedido",
        {
          pedidos: [pedido],
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      )
      .then((response) => {
        const file = new Blob([response.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
        URL.revokeObjectURL();
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate("/");
        }
      });
  };

  return (
    <>
      <Menu logged={true} />

      <h3>Produto</h3>
      <Form onSubmit={etiquetaProduto}>
        <Row className="align-items-center">
          <Col xs="6">
            <Form.Group>
              <Form.Control
                type="text"
                onChange={(e) => setSku(e.target.value)}
                placeholder="SKU"
              />
            </Form.Group>
          </Col>
          <Col>
            <ButtonBlock>
              <Button variant="primary" type="submit">
                {carregando && (
                  <Spinner
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                )}
                {!carregando && <>Enviar</>}
              </Button>
            </ButtonBlock>
          </Col>
        </Row>
      </Form>

      <h3>Pedido</h3>
      <Form onSubmit={etiquetaPedido}>
        <Row className="align-items-center">
          <Col xs="6">
            <Form.Group>
              <Form.Control
                type="text"
                onChange={(e) => setPedido(e.target.value)}
                placeholder="Pedido"
              />
            </Form.Group>
          </Col>
          <Col>
            <ButtonBlock>
              <Button variant="primary" type="submit">
                {carregando && (
                  <Spinner
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                )}
                {!carregando && <>Enviar</>}
              </Button>
            </ButtonBlock>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default Etiquetas;
