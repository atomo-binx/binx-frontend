import React, { useState, useEffect } from "react";

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";

import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";

import "./styles.css";

function TabelaProdutos(props) {
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    setResultados(props.resultados);
  }, props.resultados);

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total mx-3">{size} Resultados</span>
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
      headerStyle: {
        width: "7%",
      },
      filter: textFilter({
        placeholder: "SKU",
        style: {
          fontSize: "0.8rem",
        },
        label: false
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
        width: "60%",
      },
    },
    {
      dataField: "localizacao",
      text: "Localização",
      headerStyle: {
        width: "30%",
      },
      filter: textFilter({
        placeholder: "Localização",
        style: {
          fontSize: "0.8rem",
        },
      }),
    },
  ];

  return (
    <BootstrapTable
      keyField="idsku"
      data={resultados}
      columns={columns}
      hover
      bordered={false}
      filter={filterFactory()}
      style={{ fontSize: "0.8rem" }}
      filterPosition={"top"}
      pagination={paginationFactory(options)}
    />
  );
}

export default TabelaProdutos;
