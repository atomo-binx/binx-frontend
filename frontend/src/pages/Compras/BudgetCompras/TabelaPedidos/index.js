import React, { useState } from "react";

import BootstrapTable from "react-bootstrap-table-next";

import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

import filterFactory, {
  selectFilter,
  textFilter,
} from "react-bootstrap-table2-filter";

import paginationFactory from "react-bootstrap-table2-paginator";

import dayjs from "dayjs";
import IndicadorSituacao from "../IndicadorSituacao";

function TabelaPedidos({ pedidos }) {
  const [loading, setLoading] = useState(true);
  const [resultados, setResultados] = useState([]);

  let skuFilter,
    produtoFilter,
    curvaFilter,
    situacaoFilter,
    fornecedorFilter,
    statusFilter,
    codFilter;

  const limparFiltros = () => {
    skuFilter("");
    produtoFilter("");
    curvaFilter("");
    situacaoFilter("");
    fornecedorFilter("");
    statusFilter("");
    codFilter("");
  };

  const columns = [
    {
      dataField: "idpedidocompra",
      text: "Número",
      headerStyle: {
        width: "0.3%",
      },
      filter: textFilter({
        placeholder: "Pedido",
        style: {
          fontSize: "0.8rem",
        },
        getFilter: (filter) => {
          skuFilter = filter;
        },
      }),
    },
    {
      dataField: "datacriacao",
      text: "Data",
      headerStyle: {
        width: "0.2%",
      },
      formatter: (value) => dayjs(value).format("DD/MM/YYYY"),
    },
    {
      dataField: "tbfornecedor.nomefornecedor",
      text: "Fornecedor",
      headerStyle: {
        width: "4%",
      },
      filter: textFilter({
        placeholder: "Fornecedor",
        style: {
          fontSize: "0.8rem",
        },
        getFilter: (filter) => {
          skuFilter = filter;
        },
      }),
    },
    {
      dataField: "idstatus",
      text: "Situação",
      headerStyle: {
        width: "0.1%",
      },
      align: "center",
      formatter: (value) => <IndicadorSituacao situacao={value} />,
    },
  ];

  const paginationOptions = {
    alwaysShowAllBtns: true,
    showTotal: true,

    paginationTotalRenderer: (from, to, size) => (
      <span className="react-bootstrap-table-pagination-total mx-3">
        {size} Resultados
      </span>
    ),

    sizePerPage: 10,
    sizePerPageList: [
      30,
      60,
      90,
      120,
      { text: "Exibir Tudo", value: resultados.length },
    ],

    firstPageText: "<<",
    prePageText: "<",
    nextPageText: ">",
    lastPageText: ">>",

    nextPageTitle: "Primeira Página",
    prePageTitle: "Página Anterior",
    firstPageTitle: "Próxima Página",
    lastPageTitle: "Última Página",
  };

  return (
    <BootstrapTable
      classes="table-sm"
      keyField="idsku"
      data={pedidos}
      columns={columns}
      hover
      bordered={false}
      filter={filterFactory()}
      filterPosition={"top"}
      pagination={paginationFactory(paginationOptions)}
      noDataIndication="Nenhum Resultado Encontrado"
    />
  );
}

export default TabelaPedidos;
