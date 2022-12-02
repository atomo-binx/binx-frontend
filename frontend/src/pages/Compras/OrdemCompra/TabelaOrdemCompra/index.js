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
import { Button, Container, Modal } from "react-bootstrap";

import { BsThreeDotsVertical } from "react-icons/bs";
import IndicadorSituacao from "../IndicadorSituacao";
import IndicadorOcorrencia from "../IndicadorOcorrencia";
import ModalOcorrencias from "../ModalOcorrencias";

function TabelaOrdemCompra({ ordens }) {
  const navigation = useNavigate();

  const [exibirOcorrencias, setExibirOcorrencias] = useState(false);
  const [ordemSelecionada, setOrdemSelecionada] = useState(null);

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total mx-3">
      {size} Resultados
    </span>
  );

  const options = {
    alwaysShowAllBtns: true,
    showTotal: true,
    sizePerPage: 20,

    paginationTotalRenderer: customTotal,

    firstPageText: "Início",
    prePageText: "Anterior",
    nextPageText: "Próxima",
    lastPageText: "Final",
  };

  function dateFormatter(cell) {
    if (cell !== null) {
      return new Date(cell).toLocaleDateString();
    }
  }

  function selecionarOrdemCompra(idOrdemCompra) {
    setOrdemSelecionada(idOrdemCompra);
    setExibirOcorrencias(true);
  }

  function situacaoFormatter(cell, row) {
    return (
      <Container fluid className="m-0 p-0 d-flex flex-row align-items-center">
        <IndicadorSituacao className="me-3" situacao={cell} />
        <IndicadorOcorrencia
          onClick={() => selecionarOrdemCompra(row.idordemcompra)}
        />
        <span className="ms-3">{cell}</span>
      </Container>
    );
  }

  function optionsFormatter(cell) {
    return (
      <Container fluid className="m-0 p-0 d-flex flex-row align-items-end">
        <BsThreeDotsVertical />
      </Container>
    );
  }

  const columns = [
    {
      dataField: "idordemcompra",
      text: "Número",
      headerStyle: {
        width: "1%",
      },
      filter: textFilter({
        placeholder: "Número",
        style: {
          fontSize: "0.8rem",
        },
      }),
    },
    {
      dataField: "createdAt",
      text: "Data",
      headerStyle: {
        width: "1.2%",
      },
      formatter: dateFormatter,
    },
    {
      dataField: "observacoes",
      text: "Observações",
      headerStyle: {
        width: "5%",
      },
      filter: textFilter({
        placeholder: "Observação interna",
        style: {
          fontSize: "0.8rem",
        },
      }),
    },
    {
      dataField: "tipo",
      text: "Tipo",
      headerStyle: {
        width: "2%",
      },
    },
    {
      dataField: "comprador",
      text: "Comprador",
      headerStyle: {
        width: "2%",
      },
    },
    {
      dataField: "situacao",
      text: "Situação",
      headerStyle: {
        width: "3%",
      },
      formatter: situacaoFormatter,
    },
    {
      dataField: "datafinalizacao",
      text: "Finalização",
      headerStyle: {
        width: "1%",
      },
      formatter: dateFormatter,
    },
    {
      isDummyField: true,
      headerStyle: {
        width: "0.5%",
      },
      formatter: optionsFormatter,
    },
  ];

  return (
    <>
      <ModalOcorrencias
        show={exibirOcorrencias}
        closeFunction={setExibirOcorrencias}
        idOrdemCompra={ordemSelecionada}
      />

      <BootstrapTable
        bootstrap4
        keyField="idordemcompra"
        data={ordens}
        columns={columns}
        hover
        bordered={false}
        filter={filterFactory()}
        filterPosition={"top"}
        pagination={paginationFactory(options)}
      />
    </>
  );
}

export default TabelaOrdemCompra;
