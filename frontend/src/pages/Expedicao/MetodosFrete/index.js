import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { utils, writeFileXLSX } from "xlsx";

import api from "../../../services/api";

import { AuthContext } from "../../../contexts/auth";

import Background from "../../../components/Binx/Background";
import Page from "../../../components/Binx/Page";
import LoadingButton from "../../../components/Binx/LoadingButton";
import Menu from "../../../components/Binx/Menu";
import ContentCard from "../../../components/Binx/ContentCard";

import TabelaResultados from "./TabelaResultados";

import { Spinner, Container } from "react-bootstrap";
import { BsDownload, BsArrowClockwise } from "react-icons/bs";
import { dateToFilename } from "../../../util/date";

function MetodosFrete() {
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();

  const [resultados, setResultados] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const [carregandoExportar, setCarregandoExportar] = useState(false);
  const [carregandoAtualizar, setCarregandoAtualizar] = useState(false);

  const carregarPedidos = async () => {
    await api
      .get("/puppeteer/manual", {
        headers: {
          authorization: `Bearer ${userContext.accessToken}`,
        },
      })
      .then((response) => {
        setResultados(response.data.pedidos);
      })
      .catch((error) => {
        console.log("Erro ao realizar requisição a API");
      })
      .finally(() => {
        setCarregando(false);
        setCarregandoAtualizar(false);
      });
  };

  useEffect(() => {
    carregarPedidos();
  }, []);

  const atualizar = async () => {
    console.log("VAI VAI VAI ");

    setCarregando(true);
    setCarregandoAtualizar(true);

    const listaPedidos = resultados.map((resultado) => resultado.idpedidovenda);

    await api
      .get("/pedidovenda/sincroniza", {
        params: {
          pedidos: listaPedidos.join(", "),
          sincrono: true,
        },
        headers: {
          authorization: `Bearer ${userContext.accessToken}`,
        },
      })
      .then((response) => {
        setResultados(response.data.pedidos);
      })
      .catch((error) => {
        console.log("Erro ao realizar requisição a API");
      })
      .finally(() => {
        carregarPedidos();
      });
  };

  const exportarExcel = () => {
    setCarregandoExportar(true);

    const workSheet = utils.json_to_sheet(resultados, {
      header: ["idpedidovenda", "cliente", "servico"],
    });

    const workBook = utils.book_new();

    utils.book_append_sheet(workBook, workSheet, "Métodos de Frete");

    utils.sheet_add_aoa(workSheet, [["Pedido", "Cliente", "Serviço"]], {
      origin: "A1",
    });

    writeFileXLSX(workBook, `Métodos de Frete - ${dateToFilename()}.xlsx`);

    setCarregandoExportar(false);
  };

  return (
    <>
      <Background>
        <Menu logged={true} />
        <Page>
          <Page.Body>
            <Page.Content className="px-5">
              <Page.Title>Métodos de Frete</Page.Title>
              <Page.Subtitle>
                Escolha automática do melhor método de frete para um pedido de
                venda.
              </Page.Subtitle>
              <ContentCard className="mt-2 p-4">
                <div className="d-flex justify-content-end mb-3">
                  <LoadingButton
                    loading={carregandoExportar}
                    className="ms-2"
                    variant="outline-secondary"
                    block={true}
                    onClick={exportarExcel}
                    size="sm"
                    disabled={carregando}
                  >
                    <div className="d-flex">
                      <div className="mx-2">
                        <BsDownload />
                      </div>
                      <div className="me-3">Exportar</div>
                    </div>
                  </LoadingButton>

                  <LoadingButton
                    loading={carregandoAtualizar}
                    className="mx-2"
                    variant="success"
                    block={true}
                    onClick={atualizar}
                    size="sm"
                    disabled={carregando}
                  >
                    <div className="d-flex">
                      <div className="mx-2">
                        <BsArrowClockwise />
                      </div>
                      <div className="me-3">Atualizar</div>
                    </div>
                  </LoadingButton>
                </div>

                {carregando && (
                  <>
                    <Container fluid className="text-center binx-container">
                      <Container fluid className="center-vertically">
                        <Spinner
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      </Container>
                    </Container>
                  </>
                )}

                {!carregando && (
                  <>
                    <Container>
                      <TabelaResultados metodos={resultados} />
                    </Container>
                  </>
                )}
              </ContentCard>
            </Page.Content>
          </Page.Body>
        </Page>
      </Background>
    </>
  );
}

export default MetodosFrete;
