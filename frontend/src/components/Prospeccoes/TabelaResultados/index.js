import React, { useState } from "react";

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";

import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
  textFilter,
  selectFilter,
} from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";

import ModalProspeccao from "../ModalProspeccao";
import { formatarCNPJ, formatarTelefone } from "../../../util/formatar";

import "./styles.css";

function TabelaResultados(props) {
  const { resultados, carregar } = props;

  const [abrirProspeccao, setAbrirProspeccao] = useState(false);

  const [prospeccaoParaAbrir, setProspeccaoParaAbrir] = useState({});

  const vendedoresSelectOptions = {
    Daiane: "Daiane",
    Dayane: "Dayane",
    Felipe: "Felipe",
    Gabriela: "Gabriela",
    Lucas: "Lucas",
    Mariane: "Mariane",
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
    sizePerPage: 20,

    firstPageText: "<<",
    prePageText: "<",
    nextPageText: ">",
    lastPageText: ">>",

    nextPageTitle: "Primeira Página",
    prePageTitle: "Página Anterior",
    firstPageTitle: "Próxima Página",
    lastPageTitle: "Última Página",
  };

  function dateFormatter(cell) {
    return new Date(cell).toLocaleDateString("pt-BR");
  }

  const rowEvents = {
    onClick: (e, row) => {
      setAbrirProspeccao(true);
      setProspeccaoParaAbrir(row);
    },
  };

  const columns = [
    {
      dataField: "createdAt",
      text: "Data",
      formatter: dateFormatter,
      headerStyle: {
        width: "9%",
      },
    },
    {
      dataField: "empresa",
      text: "Empresa",
      filter: textFilter({
        placeholder: "Nome",
        style: {
          fontSize: "0.8rem",
        },
      }),
    },
    {
      dataField: "contato",
      text: "Contato",
      headerStyle: {
        width: "8%",
      },
      filter: textFilter({
        placeholder: "Contato",
        style: {
          fontSize: "0.8rem",
        },
      }),
    },
    {
      dataField: "telefone",
      text: "Telefone",
      formatter: (cell) => formatarTelefone(cell),
      filter: textFilter({
        placeholder: "Telefone",
        style: {
          fontSize: "0.8rem",
        },
      }),
      headerStyle: {
        width: "10%",
      },
    },
    {
      dataField: "email",
      text: "Email",
      filter: textFilter({
        placeholder: "Email",
        style: {
          fontSize: "0.8rem",
        },
      }),
      headerStyle: {
        width: "20%",
      },
    },
    {
      dataField: "cnpj",
      text: "CNPJ",
      formatter: (cell) => formatarCNPJ(cell),
      filter: textFilter({
        placeholder: "CNPJ",
        style: {
          fontSize: "0.8rem",
        },
      }),
      headerStyle: {
        width: "12%",
      },
    },
    {
      dataField: "vendedor",
      text: "Vendedor",
      formatter: (cell) => vendedoresSelectOptions[cell],
      filter: selectFilter({
        options: vendedoresSelectOptions,
        placeholder: "Vendedor",
        label: false,
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
        classes="table-sm"
        keyField="id"
        data={resultados}
        columns={columns}
        hover
        bordered={false}
        filter={filterFactory()}
        filterPosition={"top"}
        pagination={paginationFactory(options)}
        rowEvents={rowEvents}
        noDataIndication="Nenhum Resultado Encontrado"
        rowStyle={{ cursor: "pointer" }}
      />

      {/* Modal de Prospecção */}
      <ModalProspeccao
        show={abrirProspeccao}
        setShow={setAbrirProspeccao}
        prospeccao={prospeccaoParaAbrir}
        carregar={carregar}
      />
    </>
  );
}

export default TabelaResultados;
