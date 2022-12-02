import React, { useState } from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
  textFilter,
  selectFilter,
} from "react-bootstrap-table2-filter";

import paginationFactory from "react-bootstrap-table2-paginator";
import { Button, Container, Modal, Table } from "react-bootstrap";

import { BsThreeDotsVertical } from "react-icons/bs";
import IndicadorSituacao from "../IndicadorSituacao";
import IndicadorOcorrencia from "../IndicadorOcorrencia";
import ModalOcorrencias from "../ModalOcorrencias";

function TabelaOrdemCompra({ ordens }) {
  const navigation = useNavigate();

  const [exibirOcorrencias, setExibirOcorrencias] = useState(false);
  const [ordemSelecionada, setOrdemSelecionada] = useState(null);

  function selecionarOrdemCompra(idOrdemCompra) {
    setOrdemSelecionada(idOrdemCompra);
    setExibirOcorrencias(true);
  }

  function optionsFormatter(cell) {
    return (
      <Container fluid className="m-0 p-0 d-flex flex-row align-items-end">
        <BsThreeDotsVertical />
      </Container>
    );
  }

  function dateFormatter(date) {
    if (date !== null) {
      return new Date(date).toLocaleDateString();
    }
  }

  return (
    <>
      <ModalOcorrencias
        show={exibirOcorrencias}
        closeFunction={setExibirOcorrencias}
        idOrdemCompra={ordemSelecionada}
      />

      <Table hover>
        <thead>
          <tr>
            <th style={{ width: "5%" }}>Número</th>
            <th className="col-1">Data</th>
            <th>Observações</th>
            <th>Tipo</th>
            <th className="col-1">Comprador</th>
            <th style={{ width: "20%" }}>Situação</th>
            <th className="col-1">Finalização</th>
          </tr>
        </thead>
        <tbody>
          {ordens.map((ordem) => (
            <tr key={ordem.idOrdemCompra}>
              <td>{ordem.idOrdemCompra}</td>
              <td>{dateFormatter(ordem.data)}</td>
              <td>{ordem.observacoes}</td>
              <td>{ordem.tipo}</td>
              <td>{ordem.comprador}</td>
              <td>
                <Container
                  fluid
                  className="m-0 p-0 d-flex flex-row align-items-center"
                >
                  <IndicadorSituacao
                    className="me-3 mt-1"
                    situacao={ordem.situacao}
                  />
                  <IndicadorOcorrencia
                    onClick={() => selecionarOrdemCompra(ordem.idOrdemCompra)}
                  />
                  <span className="ms-3">{ordem.situacao}</span>
                </Container>
              </td>
              <td>{dateFormatter(ordem.dataFinalizacao)}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* <BootstrapTable
        bootstrap4
        keyField="idordemcompra"
        data={ordens}
        columns={columns}
        hover
        bordered={false}
        filter={filterFactory()}
        filterPosition={"top"}
        pagination={paginationFactory(options)}
      /> */}
    </>
  );
}

export default TabelaOrdemCompra;
