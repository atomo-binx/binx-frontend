import React, { useState } from "react";

import Menu from "../../components/Binx/Menu";
import ButtonBlock from "../../components/ButtonBlock";

import { Container, Row, Button, Spinner, Form, Col } from "react-bootstrap";

import TabelaProdutos from "../../components/Produtos/TabelaProdutos";
import api from "../../services/api";

function Painel() {
  const [carregandoBusca, setCarregandoBusca] = useState(false);
  const [buscaFinalizada, setBuscaFinalizada] = useState(false);
  const [resultados, setResultados] = useState([]);
  const [alvoBusca, setAlvoBusca] = useState("");

  const buscarProdutos = async (event) => {
    event.preventDefault();

    setCarregandoBusca(true);
    setBuscaFinalizada(false);

    const urlAlvo = `/produto/buscar?busca=${alvoBusca}`;

    await api
      .get(urlAlvo)
      .then((res) => {
        setResultados(res.data.resultados);
        setBuscaFinalizada(true);
        console.log(res.data.resultados);
      })
      .catch((error) => {
        console.log("Erro na chamada a API:", error.message);
        setBuscaFinalizada(false);
      });

    setCarregandoBusca(false);
  };

  return (
    <>
      <Menu logged={true} />

      <Container fluid className="mt-4">
        <Container className="m-0">
          <h5 className="mt-2 ml-">Busca de Produtos</h5>
          <h6 className="my-3 text-muted">
            Para realizar uma busca, insira o SKU, Nome ou Localização do
            produto desejado.
          </h6>
        </Container>

        <Container className="m-0">
          <Form onSubmit={buscarProdutos}>
            <Row className="align-items-center">
              <Col xs="5">
                <Form.Group>
                  <Form.Control
                    type="text"
                    onChange={(e) => setAlvoBusca(e.target.value)}
                    placeholder="Nome, SKU ou Localização"
                  />
                </Form.Group>
              </Col>
              <Col xs="2">
                <ButtonBlock>
                  <Button variant="primary" type="submit">
                    {carregandoBusca && (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    )}
                    {!carregandoBusca && <>Pesquisar</>}
                  </Button>
                </ButtonBlock>
              </Col>
            </Row>
          </Form>
        </Container>

        <hr className="m-0 my-4" />

        <Container fluid>
          {buscaFinalizada && <TabelaProdutos resultados={resultados} />}
        </Container>
      </Container>
    </>
  );
}

export default Painel;
