import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

import BootstrapTable from "react-bootstrap-table-next";

import { Container, Form, Spinner, Table } from "react-bootstrap";

import IndicadorSituacao from "../IndicadorSituacao";

import { IoIosSave } from "react-icons/io";

const SaveButton = styled(IoIosSave)`
  cursor: pointer;
`;

function TabelaOcorrencias({ ocorrencias }) {
  const textAreaRef = useRef(null);

  const [observacoes, setObservacoes] = useState("");

  const [incluindo, setIncluindo] = useState(false);

  useEffect(() => {
    textAreaRef.current.style.height = "0px";
    const taHeight = textAreaRef.current.scrollHeight;
    textAreaRef.current.style.height = taHeight + "px";
  }, [observacoes]);

  function incluirOcorrencia() {
    setIncluindo(true);
  }

  function timeFormatter(cell, row) {
    if (row.id === 0) {
      return (
        <div fluid className="mt-2 d-flex align-items-end flex-row">
          {cell}
        </div>
      );
    }

    return cell;
  }

  function observacoesFormatter(cell, row) {
    if (row.id === 0) {
      return (
        <Form.Control
          ref={textAreaRef}
          as="textarea"
          rows={1}
          onChange={(event) => setObservacoes(event.target.value)}
        />
      );
    }

    return cell;
  }

  function usuarioFormatter(cell, row) {
    if (row.id === 0) {
      return <Form.Control type="text" disabled placeHolder={cell} />;
    }

    return cell;
  }

  function situacaoFormatter(cell, row) {
    if (row.id === 0) {
      return (
        <Form.Select>
          <option value="1">Em Aberto</option>
          <option value="2">Em Orçamento</option>
          <option value="3">Parcialmente Finalizada</option>
          <option value="3">Finalizada</option>
          <option value="3">Cancelada</option>
        </Form.Select>
      );
    }

    return (
      <Container fluid className="m-0 p-0 d-flex flex-row align-items-center">
        <IndicadorSituacao className="me-1" situacao={cell} />
        <span className="ms-2">{cell}</span>
      </Container>
    );
  }

  function optionsFormatter(cell, row) {
    if (row.id === 0) {
      return (
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
      );
    }
    return cell;
  }

  const columns = [
    {
      dataField: "data",
      text: "Data",
      headerStyle: {
        width: "1%",
      },
      formatter: timeFormatter,
    },
    {
      dataField: "hora",
      text: "Hora",
      headerStyle: {
        width: "1%",
      },
      formatter: timeFormatter,
    },
    {
      dataField: "observacoes",
      text: "Observações",
      headerStyle: {
        width: "5%",
      },
      formatter: observacoesFormatter,
    },
    {
      dataField: "usuario",
      text: "Usuário",
      headerStyle: {
        width: "2%",
      },
      formatter: usuarioFormatter,
    },
    {
      dataField: "situacao",
      text: "Situação",
      headerStyle: {
        width: "2.5%",
      },
      formatter: situacaoFormatter,
    },
    {
      isDummyField: true,
      text: "",
      headerStyle: {
        width: "0.5%",
      },
      formatter: optionsFormatter,
    },
  ];

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
                    placeHolder={ocorrencia.usuario}
                  />
                )}

                {ocorrencia.id > 0 && ocorrencia.usuario}
              </td>
              <td>
                {ocorrencia.id === 0 && (
                  <Form.Select>
                    <option value="1">Em Aberto</option>
                    <option value="2">Em Orçamento</option>
                    <option value="3">Parcialmente Finalizada</option>
                    <option value="3">Finalizada</option>
                    <option value="3">Cancelada</option>
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
