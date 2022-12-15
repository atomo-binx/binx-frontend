import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  Modal,
  Spinner,
  Table,
} from "react-bootstrap";

import { AuthContext } from "../../../../contexts/auth";
import api from "../../../../services/api";
import TabelaOcorrencias from "../TabelaOcorrencias";

function ModalOcorrencias({ show, closeFunction, idOrdemCompra }) {
  const userContext = useContext(AuthContext);

  const [carregando, setCarregando] = useState(true);
  const [ocorrencias, setOcorrencias] = useState([]);

  function carregarOcorrencias() {
    api
      .get("/ocorrenciaordemcompra", {
        params: {
          idOrdemCompra,
        },
        headers: {
          Authorization: `Bearer ${userContext.accessToken}`,
        },
      })
      .then((response) => {
        const listaOcorrencias = response.data.ocorrencias;

        listaOcorrencias.unshift({
          id: 0,
          data: new Date().toLocaleDateString(),
          hora: new Date().toLocaleTimeString(),
          observacoes: null,
          usuario: userContext.userName,
          situacao: null,
        });

        setOcorrencias(listaOcorrencias);
      })
      .catch((error) => {
        console.log("Erro", error);
      })
      .finally(() => {
        setCarregando(false);
      });
  }

  return (
    <Modal
      show={show}
      onHide={() => closeFunction(false)}
      onShow={carregarOcorrencias}
      centered
      size="xl"
    >
      <Modal.Header closeButton>
        <Modal.Title>Ocorrências</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid className="m-0 p-0">
          {carregando && (
            <Container
              fluid
              className="p-0 d-flex justify-content-center py-3 my-3"
            >
              <Spinner animation="grow" size="sm" />
            </Container>
          )}
          {!carregando && (
            <>
              <TabelaOcorrencias
                idOrdemCompra={idOrdemCompra}
                ocorrencias={ocorrencias}
              />
            </>
          )}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-secondary"
          onClick={() => closeFunction(false)}
        >
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalOcorrencias;
