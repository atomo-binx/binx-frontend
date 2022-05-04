import React, { useState, useEffect } from "react";

import { Table } from "react-bootstrap";

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";

import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
  textFilter,
  selectFilter,
  numberFilter,
  customFilter,
  FILTER_TYPES,
} from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";

import "./styles.css";

function TabelaResultados(props) {
  const [resultados, setResultados] = useState([]);

  const [carregado, setCarregado] = useState(true);

  useEffect(() => {
    setResultados(props.resultados);
  }, props.resultados);

  // useEffect(() => {
  //   setCarregado(true);
  // }, resultados);

  const selectOptions = {
    "Sem Curva": "Sem Curva",
    "Curva A": "Curva A",
    "Curva B": "Curva B",
    "Curva C": "Curva C",
  };

  const obsContador = () => {
    return (
      <>
        <p>OI!</p>
      </>
    );
  };

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total mx-3">
      {size} Resultados
    </span>
  );

  const options = {
    alwaysShowAllBtns: true,
    showTotal: true,
    disablePageTitle: true,
    paginationTotalRenderer: customTotal,

    firstPageText: "Primeira",
    prePageText: "Anterior",
    nextPageText: "Próxima",
    lastPageText: "Última",

    nextPageTitle: "Primeira Página",
    prePageTitle: "Página Anterior",
    firstPageTitle: "Próxima Página",
    lastPageTitle: "Última Página",
  };

  const columns = [
    {
      dataField: "idsku",
      text: "SKU",
      style: { width: "2%", textAlign: "center" },
      headerStyle: { textAlign: "center" },
      filter: textFilter({
        placeholder: "SKU",
        style: {
          fontSize: "0.8rem",
        },
      }),
    },
    {
      dataField: "nome",
      text: "Nome",
      filter: textFilter({
        placeholder: "Nome",
        style: {
          fontSize: "0.8rem",
          width: "100%",
        },
      }),
      headerStyle: {
        width: "20%",
      },
    },
    {
      dataField: "curva",
      text: "Curva",
      formatter: (cell) => selectOptions[cell],
      filter: selectFilter({
        options: selectOptions,
        placeholder: "Curva",
        style: {
          fontSize: "0.8rem",
        },
      }),
      headerStyle: {
        width: "9%",
      },
    },
    {
      dataField: "contador",
      text: "Cont",
      headerStyle: {
        width: "9%",
        textAlign: "left",
      },
      sort: true,
      // filter: customFilter({
      //   type: FILTER_TYPES.NUMBER,
      // }),
      // filterRenderer: obsContador,
    },
    {
      dataField: "total",
      text: "Vendido",
      headerStyle: {
        width: "10%",
      },
      sort: true,
    },
    {
      dataField: "destoantes",
      text: "Dest",
      sort: true,
      headerStyle: {
        width: "7%",
      },
    },
    {
      dataField: "considerar",
      text: "Total",
      sort: true,
      headerStyle: {
        width: "7%",
      },
    },
    {
      dataField: "meses",
      text: "Meses",
      sort: true,
      headerStyle: {
        width: "8%",
      },
    },
    {
      dataField: "mediames",
      text: "Média",
      sort: true,
      headerStyle: {
        width: "9%",
      },
    },
    {
      dataField: "minimo",
      text: "Min",
      sort: true,
      headerStyle: {
        width: "7%",
      },
    },
    {
      dataField: "maximo",
      text: "Max",
      sort: true,
      headerStyle: {
        width: "7%",
      },
    },
  ];

  return (
    <>
      {carregado && (
        <BootstrapTable
          bootstrap4
          keyField="idsku"
          data={resultados}
          columns={columns}
          condensed={false}
          hover
          bordered={false}
          filter={filterFactory()}
          style={{ fontSize: "0.8rem" }}
          filterPosition={"top"}
          pagination={paginationFactory(options)}
        />
      )}
    </>
  );
}

export default TabelaResultados;
