import React, { useEffect } from "react";

import { useForm, Controller } from "react-hook-form";

import styled from "styled-components";

import TableNumberIndex from "../../../../components/Binx/TableNumberIndex";
import LoadingButton from "../../../../components/Binx/LoadingButton";

import BotaoIncluirOrcamento from "../BotaoIncluirOrcamento";
import BotaoLixeira from "../BotaoLixeira";
import BotaoInfo from "../BotaoInfo";

import { BRLString } from "../../../../util/money";

import { Form, Table } from "react-bootstrap";

import DropFornecedor from "../DropFornecedor";
import DropProduto from "../DropProduto";
import DropValorProduto from "../DropValorProduto";

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
  cacheFornecedores,
  dicionarioFornecedores,
  cacheProdutos,
  incluirOrcamento,
  removerOrcamento,
  atribuirFornecedor,
  removerProduto,
  atribuirProduto,
  register,
}) {
  const { control } = useForm();

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

          {Array.from(orcamentos).map(([idFornecedor]) => {
            return (
              <CustomTh key={uuidv4()} width={120}>
                <DropFornecedor
                  cacheFornecedores={cacheFornecedores}
                  idFornecedor={idFornecedor}
                  dicionarioFornecedores={dicionarioFornecedores}
                  atribuirFornecedor={atribuirFornecedor}
                />
              </CustomTh>
            );
          })}

          <th className="d-flex justify-content-end">
            <BotaoIncluirOrcamento onClick={() => incluirOrcamento()} />
          </th>
        </tr>
      </thead>
      <tbody>
        {produtos.map((produto, idxProduto) => (
          <tr key={produto.id}>
            <CustomTd>
              <TableNumberIndex number={idxProduto + 1} />
            </CustomTd>
            <CustomTd>
              <BotaoLixeira
                onClick={() => removerProduto(idxProduto)}
                tooltip={"Remover Produto"}
                size={17}
              />
            </CustomTd>
            <CustomTd>{produto.idSku}</CustomTd>
            <CustomTd>
              {produto.idSku && <>{produto.nome}</>}
              {!produto.idSku && (
                <DropProduto
                  idxProduto={idxProduto}
                  cacheProdutos={cacheProdutos}
                  atribuirProduto={atribuirProduto}
                />
              )}
            </CustomTd>
            <CustomTd>
              <BotaoInfo tooltip={"Exibir Histórico"} size={17} />
            </CustomTd>
            <CustomTd>
              <Controller
                name={`quantidade-${idxProduto}`}
                control={control}
                render={({ field }) => (
                  <Form.Control
                    type="text"
                    defaultValue={produto.quantidade}
                    size="sm"
                    {...field}
                    {...register(`quantidade-${idxProduto}`, {
                      pattern: /^[0-9]*$/,
                    })}
                    onChange={(e) => {
                      e.target.value = e.target.value.replace(/[^$0-9]/, "");
                    }}
                  />
                )}
              />
            </CustomTd>
            <CustomTd>{BRLString(produto.ultimoCusto, "R$ ")}</CustomTd>

            {Array.from(orcamentos).map(([idFornecedor, produtos]) => {
              console.log(produtos[produto.idSku].valor);

              return (
                <CustomTd key={uuidv4()}>
                  <DropValorProduto
                    idxProduto={idxProduto}
                    situacao={produtos[produto.idSku].situacao}
                    valor={produtos[produto.idSku].valor}
                    register={register}
                  />
                </CustomTd>
              );
            })}

            <CustomTd></CustomTd>
          </tr>
        ))}

        {/* {orcamentos.length > 0 && (
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
        )} */}
      </tbody>
    </Table>
  );
}

export default TabelaProdutosOrdemCompra;
