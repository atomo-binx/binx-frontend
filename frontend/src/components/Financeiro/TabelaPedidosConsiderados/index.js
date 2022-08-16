import React from "react";
import BootstrapTable from "react-bootstrap-table-next";

import filterFactory, {
  textFilter,
  selectFilter,
} from "react-bootstrap-table2-filter";

function TabelaPedidosConsiderados(props) {
  const { pedidos } = props;

  const formaPagamentoOptions = {
    "Loja - Transferência ": "Loja - Transferência ",
    "Loja - Cartão de Débito": "Loja - Cartão de Débito",
    "Loja - Cartão de Crédito": "Loja - Cartão de Crédito",
    "Pix - Bling Conta": "Pix - Bling Conta",
    "Loja - Dinheiro": "Loja - Dinheiro",
  };

  const columns = [
    {
      dataField: "idPedidoVenda",
      text: "Pedido",
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
        placeholder: "Cliente",
        style: {
          fontSize: "0.8rem",
          width: "100%",
        },
      }),
    },
    {
      dataField: "dataVenda",
      text: "Data da Venda",
    },
    {
      dataField: "formaPagamento",
      text: "Forma de Pagamento",
      formatter: (cell) => formaPagamentoOptions[cell],
      filter: selectFilter({
        options: formaPagamentoOptions,
        placeholder: "Selecionar",
        style: {
          fontSize: "0.8rem",
        },
      }),
    },
    {
      dataField: "totalVenda",
      text: "Valor",
      filter: textFilter({
        placeholder: "Valor",
        style: {
          fontSize: "0.8rem",
          width: "100%",
        },
      }),
    },
  ];

  return (
    <BootstrapTable
      keyField="idPedidoVenda"
      data={pedidos}
      columns={columns}
      hover
      striped
      bordered={false}
      filter={filterFactory()}
      filterPosition={"top"}
    />
  );
}

export default TabelaPedidosConsiderados;
