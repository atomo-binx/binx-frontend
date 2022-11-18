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

function TabelaResultados(props) {
  const selectCurva = {
    "Curva A": "Curva A",
    "Curva B": "Curva B",
    "Curva C": "Curva C",
    "Sem Curva": "Sem Curva",
  };

  const selectCategoria = {
    Acessórios: "Acessórios",
    Componentes: "Componentes",
    Maker: "Maker",
    Motores: "Motores",
    Ferramentas: "Ferramentas",
    "Sem Categoria": "Sem Categoria",
  };

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total mx-3">
      {size} Resultados
    </span>
  );

  let skuFilter;
  let nomeFilter;
  let categoriaFilter;
  let curvaFilter;

  const limparFiltros = () => {
    skuFilter("");
    nomeFilter("");
    categoriaFilter("");
    curvaFilter("");
  };

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

  const columns = [
    {
      dataField: "idsku",
      text: "SKU",
      headerStyle: {
        width: "5%",
      },
      filter: textFilter({
        placeholder: "SKU",
        style: {
          fontSize: "0.8rem",
        },
        getFilter: (filter) => {
          skuFilter = filter;
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
        getFilter: (filter) => {
          nomeFilter = filter;
        },
      }),
      headerStyle: {
        width: "30%",
      },
    },
    {
      dataField: "categoria",
      text: "Categoria",
      formatter: (cell) => selectCategoria[cell],
      filter: selectFilter({
        options: selectCategoria,
        placeholder: "Categoria",
        style: {
          fontSize: "0.8rem",
        },
        getFilter: (filter) => {
          categoriaFilter = filter;
        },
      }),
      headerStyle: {
        width: "8%",
      },
    },
    {
      dataField: "contador",
      text: "Contador",
      headerStyle: {
        width: "7%",
        textAlign: "left",
      },
      sort: true,
    },
    {
      dataField: "destoantes",
      text: "Destoantes",
      sort: true,
      headerStyle: {
        width: "7%",
      },
    },
    {
      dataField: "mediaMes",
      text: "Média",
      headerStyle: {
        width: "5%",
      },
      sort: true,
    },
    {
      dataField: "min",
      text: "Mín",
      sort: true,
      headerStyle: {
        width: "4%",
      },
    },
    {
      dataField: "max",
      text: "Máx",
      sort: true,
      headerStyle: {
        width: "4%",
      },
    },
    {
      dataField: "curva",
      text: "Curva",
      formatter: (cell) => selectCurva[cell],
      filter: selectFilter({
        options: selectCurva,
        placeholder: "Curva",
        style: {
          fontSize: "0.8rem",
        },
        getFilter: (filter) => {
          curvaFilter = filter;
        },
      }),
      headerStyle: {
        width: "6%",
      },
    },
  ];

  return (
    <>
      <BootstrapTable
        keyField="idsku"
        data={props.curvas}
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
