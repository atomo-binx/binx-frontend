import React from "react";
import styled from "styled-components";

import TableNumberIndex from "../../../../components/Binx/TableNumberIndex";
import LoadingButton from "../../../../components/Binx/LoadingButton";

import BotaoIncluirOrcamento from "../BotaoIncluirOrcamento";
import BotaoLixeira from "../BotaoLixeira";
import BotaoInfo from "../BotaoInfo";

import { BRLString } from "../../../../util/money";

import { Form, Table } from "react-bootstrap";

import DropFornecedor from "../DropFornecedor";

const CustomTh = styled.th`
  min-width: ${(props) => props.width}px !important;
  max-width: ${(props) => props.width}px !important;
  width: ${(props) => props.width}px !important;
  font-size: 0.8rem !important;
`;

const CustomTd = styled.td`
  font-size: 0.8rem !important;
`;

function TabelaProdutosOrdemCompra({
  produtos,
  orcamentos,
  fornecedores,
  incluirOrcamento,
  removerOrcamento,
}) {
  return (
    <Table hover>
      <thead>
        <tr>
          <CustomTh width={1}></CustomTh>
          <CustomTh width={1}></CustomTh>
          <CustomTh width={50}>SKU</CustomTh>
          <CustomTh width={350}>Produto</CustomTh>
          <CustomTh width={1}></CustomTh>
          <CustomTh width={80}>Qntd.</CustomTh>
          <CustomTh width={100}>Último Custo</CustomTh>
        </tr>
      </thead>
      <tbody>
        {produtos.map((produto, idx) => (
          <tr key={produto.idSku}>
            <CustomTd>
              <TableNumberIndex number={idx + 1} />
            </CustomTd>
            <CustomTd>
              <BotaoLixeira
                onClick={() => {
                  console.log("oi");
                }}
                tooltip={"Remover Produto"}
                size={17}
              />
            </CustomTd>
            <CustomTd>{produto.idSku}</CustomTd>
            <CustomTd>{produto.nome}</CustomTd>
            <CustomTd>
              <BotaoInfo tooltip={"Exibir Histórico"} size={17} />
            </CustomTd>
            <CustomTd>
              <Form.Control size="sm" type="text" value={produto.quantidade} />
            </CustomTd>
            <CustomTd>{BRLString(produto.ultimoCusto, "R$ ")}</CustomTd>

            <CustomTd></CustomTd>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TabelaProdutosOrdemCompra;
