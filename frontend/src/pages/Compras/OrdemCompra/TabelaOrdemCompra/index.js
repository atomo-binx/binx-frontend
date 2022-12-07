import React, { useState } from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

import { Container, Table } from "react-bootstrap";

import IndicadorSituacao from "../IndicadorSituacao";
import IndicadorOcorrencia from "../IndicadorOcorrencia";
import ModalOcorrencias from "../ModalOcorrencias";
import BotaoOpcoes from "../BotaoOpcoes";

function TabelaOrdemCompra({ ordens }) {
  const navigation = useNavigate();

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
            <tr key={ordem.idOrdemCompra}>
              <td>{ordem.idOrdemCompra}</td>
              <td>{dateFormatter(ordem.data)}</td>
              <td>{ordem.observacoes}</td>
              <td>{ordem.tipo}</td>
              <td>{ordem.comprador}</td>
              <td>
                <Container
                  fluid
                  className="m-0 p-0 d-flex flex-row align-items-center"
                >
                  <IndicadorSituacao
                    className="me-3 mt-1"
                    situacao={ordem.situacao}
                  />
                  <IndicadorOcorrencia
                    onClick={() => selecionarOrdemCompra(ordem.idOrdemCompra)}
                  />
                  <span className="ms-3">{ordem.situacao}</span>
                </Container>
              </td>
              <td>{dateFormatter(ordem.dataFinalizacao)}</td>
              <td>
                {/* <BsThreeDotsVertical size={15} role="button" /> */}
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
