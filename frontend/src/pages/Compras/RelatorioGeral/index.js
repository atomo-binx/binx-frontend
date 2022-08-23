import React, { useEffect, useState, useContext } from "react";

import Background from "../../../components/Binx/Background";
import ContentCard from "../../../components/Binx/ContentCard";
import Menu from "../../../components/Binx/Menu";
import Page from "../../../components/Binx/Page";
import LoadingContainer from "../../../components/Binx/LoadingContainer";
import LoadingButton from "../../../components/Binx/LoadingButton";

import api from "../../../services/api";
import { AuthContext } from "../../../contexts/auth";

import { BsDownload, BsArrowClockwise } from "react-icons/bs";

import BootstrapTable from "react-bootstrap-table-next";

import filterFactory, {
  selectFilter,
  textFilter,
} from "react-bootstrap-table2-filter";

import paginationFactory from "react-bootstrap-table2-paginator";

function RelatorioGeral() {
  const user = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    api
      .get(`/compras/relatorio/geral/`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setResultados(res.data.response);
      })
      .catch((error) => {
        console.log(error);
        console.log(loading);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user.accessToken]);

  let skuFilter;

  const limparFiltros = () => {
    skuFilter("");
  };

  const columns = [
    {
      dataField: "idsku",
      text: "SKU",
      headerStyle: {
        width: "4%",
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
      text: "Produto",
      filter: textFilter({
        placeholder: "Produto",
        style: {
          fontSize: "0.8rem",
        },
      }),
    },
    {
      dataField: "curva",
      text: "Curva",
      headerStyle: {
        width: "6%",
      },
      filter: selectFilter({
        options: {
          "Curva A": "Curva A",
          "Curva B": "Curva B",
          "Curva C": "Curva C",
          "Sem Curva": "Sem Curva",
        },
        placeholder: "Curva",
        label: false,
        style: {
          fontSize: "0.8rem",
        },
      }),
    },
    {
      dataField: "minimo",
      text: "Min.",
      headerStyle: {
        width: "4%",
      },
    },
    {
      dataField: "maximo",
      text: "Máx.",
      headerStyle: {
        width: "4%",
      },
      sort: true,
    },
    {
      dataField: "quantidade",
      text: "Qntd.",
      headerStyle: {
        width: "4%",
      },
    },
    {
      dataField: "situacaoEstoqueMin",
      text: "Situação",
      headerStyle: {
        width: "6%",
      },
      filter: selectFilter({
        options: {
          Acima: "Acima",
          Abaixo: "Abaixo",
          Igual: "Igual",
        },
        placeholder: "Situação",
        label: false,
        style: {
          fontSize: "0.8rem",
        },
      }),
    },
    {
      dataField: "idpedidocompra",
      text: "Pedido",
      headerStyle: {
        width: "5%",
      },
      filter: textFilter({
        placeholder: "Pedido",
        style: {
          fontSize: "0.8rem",
        },
      }),
    },
    {
      dataField: "nomefornecedor",
      text: "Fornecedor",
      filter: textFilter({
        placeholder: "Fornecedor",
        style: {
          fontSize: "0.8rem",
        },
      }),
    },
    {
      dataField: "status",
      text: "Status",
      headerStyle: {
        width: "7%",
      },
      filter: selectFilter({
        options: {
          Atendido: "Atendido",
          "Em aberto": "Em aberto",
          "Em andamento": "Em andamento",
        },
        placeholder: "Status",
        label: false,
        style: {
          fontSize: "0.8rem",
        },
      }),
    },

    {
      dataField: "codigofornecedor",
      text: "Cód.",
      headerStyle: {
        width: "5%",
      },
      filter: textFilter({
        placeholder: "Cód.",
        style: {
          fontSize: "0.8rem",
        },
      }),
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

    sizePerPage: 30,
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

  const filterOptions = {
    afterFilter: (newResults) => console.log(newResults),
  };

  return (
    <>
      <Background>
        <Menu logged={true} />
        <Page>
          <Page.Body>
            <Page.Content>
              <Page.Title>Relatório Geral de Compras</Page.Title>
              <Page.Subtitle>
                Relatório geral de compras baseado em situação de estoque.
              </Page.Subtitle>
              <ContentCard>
                <LoadingContainer loading={loading}>
                  <div className="d-flex justify-content-end mb-3">
                    <LoadingButton
                      variant="outline-primary"
                      block={true}
                      LeftIcon={BsArrowClockwise}
                      iconSize={15}
                      className={"mx-3"}
                      onClick={limparFiltros}
                    >
                      Limpar Filtros
                    </LoadingButton>
                    <LoadingButton
                      variant="success"
                      block={true}
                      LeftIcon={BsDownload}
                      iconSize={15}
                    >
                      Exportar Tabela
                    </LoadingButton>
                  </div>
                  <BootstrapTable
                    classes="table-sm"
                    keyField="idsku"
                    data={resultados}
                    columns={columns}
                    hover
                    bordered={false}
                    filter={filterFactory(filterOptions)}
                    filterPosition={"top"}
                    pagination={paginationFactory(paginationOptions)}
                    noDataIndication="Nenhum Resultado Encontrado"
                    rowStyle={{ cursor: "pointer" }}
                  />
                </LoadingContainer>
              </ContentCard>
            </Page.Content>
          </Page.Body>
        </Page>
      </Background>
    </>
  );
}

export default RelatorioGeral;
