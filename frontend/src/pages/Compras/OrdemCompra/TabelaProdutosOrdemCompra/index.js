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

import { v4 as uuidv4 } from "uuid";

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
  atribuirFornecedor,
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

          {orcamentos.map((orcamento, idxOrcamento) => (
            <CustomTh key={uuidv4()} width={120}>
              <DropFornecedor
                fornecedores={fornecedores}
                idxOrcamento={idxOrcamento}
                idFornecedor={orcamento.idFornecedor}
                nomeFornecedor={orcamento.nomeFornecedor}
                atribuirFornecedor={atribuirFornecedor}
              />
            </CustomTh>
          ))}

          <th className="d-flex justify-content-end">
            <BotaoIncluirOrcamento onClick={() => incluirOrcamento()} />
          </th>
        </tr>
      </thead>
      <tbody>
        {produtos.map((produto, idxProduto) => (
          <tr key={uuidv4()}>
            <CustomTd>
              <TableNumberIndex number={idxProduto + 1} />
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
              <Form.Control
                size="sm"
                type="text"
                value={produto.quantidade}
                onChange={(e) => {}}
              />
            </CustomTd>
            <CustomTd>{BRLString(produto.ultimoCusto, "R$ ")}</CustomTd>

            {orcamentos.map((orcamento, idxOrcamento) => (
              <CustomTd key={uuidv4()}>
                <Form.Control
                  type="text"
                  size="sm"
                  value={BRLString(orcamento.produtos[idxProduto].valor) || ""}
                  onChange={(e) => {}}
                />
              </CustomTd>
            ))}

            <CustomTd></CustomTd>
          </tr>
        ))}

        {orcamentos.length > 0 && (
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            {orcamentos.map((orcamento, idx) => (
              <td key={uuidv4()}>
                <LoadingButton
                  block
                  size="sm"
                  variant="outline-danger"
                  onClick={() => removerOrcamento(idx)}
                >
                  Remover
                </LoadingButton>
              </td>
            ))}
            <td></td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default TabelaProdutosOrdemCompra;
