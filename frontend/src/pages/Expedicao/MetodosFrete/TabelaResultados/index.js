import React from "react";

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
  textFilter,
  selectFilter,
} from "react-bootstrap-table2-filter";

import paginationFactory from "react-bootstrap-table2-paginator";

import DLog from "../../../../assets/transportadoras/dlog.png";
import Correios from "../../../../assets/transportadoras/correios.png";

function TabelaResultados({ metodos }) {
  const CustomServico = (servico) => {
    return (
      <>
        <div className="d-flex flex-row align-items-center ">
          <img
            src={servico === "DLog" ? DLog : Correios}
            width={"25px"}
            className="me-2"
          />
          <span>{servico}</span>
        </div>
      </>
    );
  };

  const selectMetodo = {
    DLog: CustomServico("DLog"),
    "Correios - PAC": CustomServico("Correios - PAC"),
    "Correios - SEDEX": CustomServico("Correios - SEDEX"),
  };

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total mx-3">
      {size} Resultados
    </span>
  );

  const options = {
    alwaysShowAllBtns: true,
    showTotal: true,
    sizePerPage: 50,

    paginationTotalRenderer: customTotal,

    firstPageText: "Início",
    prePageText: "Anterior",
    nextPageText: "Próxima",
    lastPageText: "Final",
  };

  const columns = [
    {
      dataField: "idpedidovenda",
      text: "Pedido",
      headerStyle: {
        width: "3%",
      },
      filter: textFilter({
        placeholder: "Pedido",
        style: {
          fontSize: "0.8rem",
        },
      }),
    },
    {
      dataField: "cliente",
      text: "Cliente",
      filter: textFilter({
        placeholder: "Nome",
        style: {
          fontSize: "0.8rem",
          width: "100%",
        },
      }),
      headerStyle: {
        width: "30%",
      },
    },
    {
      dataField: "servico",
      text: "Serviço",
      formatter: (cell) => selectMetodo[cell],
      filter: selectFilter({
        options: selectMetodo,
        placeholder: "Todos",
        style: {
          fontSize: "0.8rem",
        },
      }),
      headerStyle: {
        width: "8%",
      },
    },
  ];

  return (
    <>
      <BootstrapTable
        keyField="idpedidovenda"
        data={metodos}
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

export default TabelaResultados;
