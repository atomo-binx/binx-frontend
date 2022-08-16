import React, { useState } from "react";
import styled from "styled-components";

import Background from "../../../components/Binx/Background";
import ContentCard from "../../../components/Binx/ContentCard";
import LoadingButton from "../../../components/Binx/LoadingButton";
import Menu from "../../../components/Binx/Menu";
import Page from "../../../components/Binx/Page";
import Sidebar from "../../../components/Binx/Sidebar";
import TabelaResultados from "../../../components/MinMax/TabelaResultados";
import CenterHorizontally from "../../../components/Binx/CenterHorizontally";
import CenterVertically from "../../../components/Binx/CenterVertically";

import {
  Alert,
  Spinner,
  Tab,
  Tabs,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { BsCheck, BsDownload, BsBoxArrowInUpRight } from "react-icons/bs";

import api from "../../../services/api";

import download from "downloadjs";
import ToastSquare from "../../../components/Binx/ToastSquare";

function AnaliseCurva() {
  const [carregandoAnalise, setCarregandoAnalise] = useState(false);
  const [carregandoExcel, setCarregandoExcel] = useState(false);
  const [analiseCompleta, setAnaliseCompleta] = useState(false);

  const [toastSuccess, setToastSuccess] = useState(false);
  const [toastFailure, setToastFailure] = useState(false);
  const [exportar, setExportar] = useState([]);
  const [exportandoBinx, setExportandoBinx] = useState(false);

  const [semCategoria, setSemCategoria] = useState([]);
  const [acessorios, setAcessorios] = useState([]);
  const [componentes, setComponentes] = useState([]);
  const [ferramentas, setFerramentas] = useState([]);
  const [motores, setMotores] = useState([]);
  const [maker, setMaker] = useState([]);
  const [semVenda, setSemVenda] = useState([]);

  const realizarAnalise = async () => {
    setCarregandoAnalise(true);
    setAnaliseCompleta(false);

    await api
      .get("/minmax")
      .then((response) => {
        // Desestruturar cada um dos resultados
        setAcessorios(response.data.acessorios);
        setComponentes(response.data.componentes);
        setFerramentas(response.data.ferramentas);
        setMotores(response.data.motores);
        setMaker(response.data.maker);
        setSemCategoria(response.data.semCategoria);
        setSemVenda(response.data.semVenda);

        // Monta o objeto de exportação caso o usuário deseje exportar os dados para o Binx/Bling
        const objExportar = [
          response.data.semCategoria,
          response.data.acessorios,
          response.data.componentes,
          response.data.ferramentas,
          response.data.motores,
          response.data.maker,
          response.data.maker,
          response.data.semVenda,
        ];

        setExportar(objExportar);

        // Flags de loading
        setAnaliseCompleta(true);
      })
      .catch((error) => {
        console.log("Erro");
        setAnaliseCompleta(false);
      })
      .finally(() => {
        setCarregandoAnalise(false);
      });
  };

  const exportarExcel = async () => {
    setCarregandoExcel(true);

    await api
      .get("/exportarminmax", { responseType: "arraybuffer" })
      .then((response) => {
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        download(blob, "minmax.xlsx");
        console.log("Sucesso na exportação do arquivo excel");
      })
      .catch((error) => {
        console.log("Erro na exportação do arquivo excel");
        console.log(error.message);
      })
      .finally(() => {
        setCarregandoExcel(false);
      });
  };

  const exportarBinx = async () => {
    setExportandoBinx(true);

    await api
      .post("exportarbinxbling", { exportar })
      .then(() => {
        console.log("Exportação dos dados para o Binx e Bling iniciada");
        setToastSuccess(true);
      })
      .catch(() => {
        console.log("Erro ao exportar dados para o Binx e Bling");
        setToastFailure(true);
      })
      .finally(() => {
        setExportandoBinx(false);
      });
  };

  return (
    <>
      <Background>
        <Menu logged={true} />

        <Page>
          <Page.Body>
            <Sidebar startOpen={true}>
              <Sidebar.Title>Opções</Sidebar.Title>

              <Sidebar.Item>
                <LoadingButton
                  variant="outline-primary"
                  block="true"
                  loading={carregandoAnalise}
                  onClick={realizarAnalise}
                >
                  <div className="d-flex">
                    <div className="mx-3">
                      <BsCheck />
                    </div>
                    <div>Gerar Análise</div>
                  </div>
                </LoadingButton>
              </Sidebar.Item>
              <Sidebar.Item>
                <LoadingButton
                  variant="outline-success"
                  block="true"
                  disabled={analiseCompleta ? false : true}
                  loading={exportandoBinx}
                  onClick={exportarBinx}
                >
                  <div className="d-flex">
                    <div className="mx-3">
                      <BsBoxArrowInUpRight />
                    </div>
                    <div>Exportar Binx</div>
                  </div>
                </LoadingButton>
              </Sidebar.Item>
              <Sidebar.Item>
                <LoadingButton
                  variant="outline-secondary"
                  block="true"
                  disabled={analiseCompleta ? false : true}
                  loading={carregandoExcel}
                  onClick={exportarExcel}
                >
                  <div className="d-flex">
                    <div className="mx-3">
                      <BsDownload />
                    </div>
                    <div>Exportar Planilha</div>
                  </div>
                </LoadingButton>
              </Sidebar.Item>
            </Sidebar>
            <Page.Content>
              <Page.Title>Análise de Curva</Page.Title>
              <Page.Subtitle>
                Gerar análise de curva, mínimo e máximo.
              </Page.Subtitle>
              <ContentCard>
                {!carregandoAnalise && !analiseCompleta && (
                  <CenterHorizontally>
                    <p className="text-muted">
                      Realize uma nova análise para visualizar os resultados.
                    </p>
                  </CenterHorizontally>
                )}

                {carregandoAnalise && (
                  <>
                    <CenterHorizontally>
                      <CenterVertically>
                        <Spinner
                          as="span"
                          animation="grow"
                          size="lg"
                          role="status"
                          aria-hidden="true"
                        />
                      </CenterVertically>
                    </CenterHorizontally>
                  </>
                )}

                {!carregandoAnalise && analiseCompleta && (
                  <Tabs
                    defaultActiveKey="acessorios"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                    variant="tabs"
                  >
                    <Tab eventKey="acessorios" title="Acessórios">
                      <TabelaResultados resultados={acessorios} />
                    </Tab>
                    <Tab eventKey="componentes" title="Componentes">
                      <TabelaResultados resultados={componentes} />
                    </Tab>
                    <Tab eventKey="ferramentas" title="Ferramentas">
                      <TabelaResultados resultados={ferramentas} />
                    </Tab>
                    <Tab eventKey="motores" title="Motores">
                      <TabelaResultados resultados={motores} />
                    </Tab>
                    <Tab eventKey="maker" title="Maker">
                      <TabelaResultados resultados={maker} />
                    </Tab>
                    <Tab eventKey="sem-categoria" title="Sem Categoria">
                      <TabelaResultados resultados={semCategoria} />
                    </Tab>
                    <Tab eventKey="sem-venda" title="Sem Venda">
                      <TabelaResultados resultados={semVenda} />
                    </Tab>
                  </Tabs>
                )}
              </ContentCard>
            </Page.Content>
          </Page.Body>
        </Page>
      </Background>

      <ToastContainer position={"top-end"} className="mt-4 pt-4">
        <Toast
          onClose={() => setToastSuccess(false)}
          show={toastSuccess}
          delay={10000}
          autohide
          className="mt-4"
        >
          <Toast.Header>
            <ToastSquare variant="success" />
            <strong className="me-auto">Exportação Concluída</strong>
            <small>{new Date().toLocaleDateString({ locale: "pt-BT" })}</small>
          </Toast.Header>
          <Toast.Body>
            Os dados de curva, estoque mínimo e máximo foram exportados com
            sucesso para o Binx
          </Toast.Body>
        </Toast>
        <Toast
          onClose={() => setToastFailure(false)}
          show={toastFailure}
          delay={10000}
          autohide
          className="mt-4"
        >
          <Toast.Header>
            <ToastSquare variant="danger" />
            <strong className="me-auto">Falha de Exportação</strong>
            <small>{new Date().toLocaleDateString({ locale: "pt-BT" })}</small>
          </Toast.Header>
          <Toast.Body>
            Não foi possível realizar a exportação dos dados para o Binx
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default AnaliseCurva;
