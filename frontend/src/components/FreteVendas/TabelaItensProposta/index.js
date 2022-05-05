import React, { useState, useEffect } from "react";

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";

import BootstrapTable from "react-bootstrap-table-next";

function TabelaItensProposta(props) {
  const [itens, setItens] = useState([]);

  const [carregado, setCarregado] = useState(true);

  useEffect(() => {
    setItens(props.itens);
  }, props.itens);

  const columns = [
    {
      dataField: "sku",
      text: "SKU",
      style: { textAlign: "center" },
      headerStyle: { width: "5%", textAlign: "center" },
    },
    {
      dataField: "nome",
      text: "Descrição",
      headerStyle: {
        width: "30%",
      },
    },
    {
      dataField: "quantidade",
      text: "Qtd.",
      headerStyle: {
        width: "6%",
      },
      sort: true
    },
    {
      dataField: "peso",
      text: "Peso",
      headerStyle: {
        width: "6%",
        textAlign: "left",
      },
      sort: true,
    },
    {
      dataField: "pesoTotal",
      text: "Total",
      headerStyle: {
        width: "7%",
      },
      sort: true,
    },
  ];

  return (
    <>
      {carregado && (
        <BootstrapTable
          bootstrap4
          keyField="sku"
          data={itens}
          columns={columns}
          condensed={true}
          hover
          bordered={true}
        />
      )}
    </>
  );
}

export default TabelaItensProposta;
