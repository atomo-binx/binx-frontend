import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";

import { Container, Form, Spinner, Table } from "react-bootstrap";

import IndicadorSituacao from "../IndicadorSituacao";

import { IoIosSave } from "react-icons/io";
import api from "../../../../services/api";
import { AuthContext } from "../../../../contexts/auth";

const SaveButton = styled(IoIosSave)`
  cursor: pointer;
`;

function TabelaOcorrencias({ idOrdemCompra, ocorrencias }) {
  const textAreaRef = useRef(null);
  const userContext = useContext(AuthContext);

  const [idSituacao, setIdSituacao] = useState(1);
  const [observacoes, setObservacoes] = useState("");

  const [incluindo, setIncluindo] = useState(false);

  useEffect(() => {
    textAreaRef.current.style.height = "0px";
    const taHeight = textAreaRef.current.scrollHeight;
    textAreaRef.current.style.height = taHeight + "px";
  }, [observacoes]);

  function incluirOcorrencia() {
    setIncluindo(true);

    api
      .post(
        "/ocorrenciaordemcompra",
        {
          idOrdemCompra,
          idSituacao,
          observacoes,
        },
        {
          headers: {
            Authorization: `Bearer ${userContext.accessToken}`,
          },
        }
      )
      .then((response) => {
        //
      })
      .catch((error) => {
        console.log("Erro", error);
      })
      .finally(() => {
        setIncluindo(false);
      });
  }

  return (
    <>
      <Table hover>
        <thead>
          <tr>
            <th className="col-1">Data</th>
            <th className="col-1">Hora</th>
            <th>Observações</th>
            <th className="col-2">Usuário</th>
            <th className="col-3">Situação</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {ocorrencias.map((ocorrencia) => (
            <tr key={ocorrencia.id}>
              <td>
                <div className="mt-2">{ocorrencia.data}</div>
              </td>
              <td>
                <div className="mt-2">{ocorrencia.hora}</div>
              </td>
              <td>
                {ocorrencia.id === 0 && (
                  <Form.Control
                    ref={textAreaRef}
                    as="textarea"
                    rows={1}
                    onChange={(event) => setObservacoes(event.target.value)}
                  />
                )}

                {ocorrencia.id > 0 && ocorrencia.observacoes}
              </td>
              <td>
                {ocorrencia.id === 0 && (
                  <Form.Control
                    type="text"
                    disabled
                    placeholder={ocorrencia.usuario}
                  />
                )}

                {ocorrencia.id > 0 && ocorrencia.usuario}
              </td>
              <td>
                {ocorrencia.id === 0 && (
                  <Form.Select
                    defaultValue="1"
                    onChange={(event) => setIdSituacao(event.target.value)}
                  >
                    <option value="1">Em Aberto</option>
                    <option value="2">Em Orçamento</option>
                    <option value="3">Parcialmente Finalizada</option>
                    <option value="4">Finalizada</option>
                    <option value="5">Cancelada</option>
                  </Form.Select>
                )}

                {ocorrencia.id > 0 && (
                  <Container
                    fluid
                    className="m-0 p-0 d-flex flex-row align-items-center"
                  >
                    <IndicadorSituacao
                      className="me-1"
                      situacao={ocorrencia.situacao}
                    />
                    <span className="ms-2">{ocorrencia.situacao}</span>
                  </Container>
                )}
              </td>
              <td>
                {ocorrencia.id === 0 && (
                  <>
                    {!incluindo && (
                      <Container className="p-0">
                        <SaveButton
                          color="green"
                          className="mt-2"
                          size={20}
                          onClick={incluirOcorrencia}
                        />
                      </Container>
                    )}

                    {incluindo && <Spinner animation="grow" size="sm" />}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default TabelaOcorrencias;
