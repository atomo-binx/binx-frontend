import React, { useState } from "react";

import { Container, Table } from "react-bootstrap";

import IndicadorSituacao from "../IndicadorSituacao";
import IndicadorOcorrencia from "../IndicadorOcorrencia";
import ModalOcorrencias from "../ModalOcorrencias";
import BotaoOpcoes from "../BotaoOpcoes";

import TableDataLink from "../../../../components/Binx/TableDataLink";

function TabelaOrdemCompra({ ordens }) {
  const [exibirOcorrencias, setExibirOcorrencias] = useState(false);
  const [ordemSelecionada, setOrdemSelecionada] = useState(null);

  function selecionarOrdemCompra(idOrdemCompra) {
    setOrdemSelecionada(idOrdemCompra);
    setExibirOcorrencias(true);
  }

  function dateFormatter(date) {
    if (date !== null) {
      return new Date(date).toLocaleDateString();
    }
  }

  return (
    <>
      <ModalOcorrencias
        show={exibirOcorrencias}
        closeFunction={setExibirOcorrencias}
        idOrdemCompra={ordemSelecionada}
      />

      <Table hover>
        <thead>
          <tr>
            <th style={{ width: "5%" }}>Número</th>
            <th className="col-1">Data</th>
            <th>Observações</th>
            <th>Tipo</th>
            <th className="col-1">Comprador</th>
            <th style={{ width: "20%" }}>Situação</th>
            <th className="col-1">Finalização</th>
            <th style={{ width: "1%" }}></th>
          </tr>
        </thead>
        <tbody>
          {ordens.map((ordem) => (
            <tr key={ordem.id}>
              <TableDataLink to={`/compras/ordemcompra/${ordem.id}`}>
                {ordem.id}
              </TableDataLink>
              <TableDataLink to={`/compras/ordemcompra/${ordem.id}`}>
                {dateFormatter(ordem.data)}
              </TableDataLink>
              <TableDataLink to={`/compras/ordemcompra/${ordem.id}`}>
                {ordem.observacoes}
              </TableDataLink>
              <TableDataLink to={`/compras/ordemcompra/${ordem.id}`}>
                {ordem.tipo}
              </TableDataLink>
              <TableDataLink to={`/compras/ordemcompra/${ordem.id}`}>
                {ordem.comprador}
              </TableDataLink>
              <td to={`/compras/ordemcompra/${ordem.id}`}>
                <Container
                  fluid
                  className="m-0 p-0 d-flex flex-row align-items-center"
                >
                  <IndicadorSituacao
                    className="me-3 mt-1"
                    situacao={ordem.situacao}
                  />
                  <IndicadorOcorrencia
                    onClick={() => selecionarOrdemCompra(ordem.id)}
                  />
                  <span className="ms-3">{ordem.situacao}</span>
                </Container>
              </td>
              <TableDataLink to={`/compras/ordemcompra/${ordem.id}`}>
                {dateFormatter(ordem.dataFinalizacao)}
              </TableDataLink>
              <td>
                <BotaoOpcoes />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default TabelaOrdemCompra;
