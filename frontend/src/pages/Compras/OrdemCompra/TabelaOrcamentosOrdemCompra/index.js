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

function TabelaOrcamentosOrdemCompra({
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
          {orcamentos.map((orcamento) => (
            <CustomTh key={orcamento.idFornecedor} width={120}>
              <DropFornecedor fornecedores={fornecedores} />
            </CustomTh>
          ))}

          <th className="d-flex justify-content-end">
            <BotaoIncluirOrcamento onClick={() => incluirOrcamento()} />
          </th>
        </tr>
      </thead>
      <tbody>
        {produtos.map((produto, idx) => (
          <tr key={produto.idSku}>
            {orcamentos.map((orcamento) => (
              <CustomTd key={orcamento.idFornecedor}>
                <Form.Control
                  type="text"
                  size="sm"
                  value={BRLString(orcamento.produtos[idx].valor) || ""}
                />
              </CustomTd>
            ))}

            <CustomTd></CustomTd>
          </tr>
        ))}

        {orcamentos.length > 0 && (
          <tr>
            {orcamentos.map((orcamento, idx) => (
              <td key={orcamento.idFornecedor}>
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

export default TabelaOrcamentosOrdemCompra;
