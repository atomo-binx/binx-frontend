import React, { useState, useEffect } from "react";

import Background from "../../../components/Binx/Background";
import ContentCard from "../../../components/Binx/ContentCard";
import LoadingButton from "../../../components/Binx/LoadingButton";
import Menu from "../../../components/Binx/Menu";
import Page from "../../../components/Binx/Page";
import CenterHorizontally from "../../../components/Binx/CenterHorizontally";
import CenterVertically from "../../../components/Binx/CenterVertically";

import { Spinner, Container } from "react-bootstrap";
import {
  BsDownload,
  BsArrowClockwise,
  BsBoxArrowInUpRight,
} from "react-icons/bs";

import TabelaResultados from "../../../components/Compras/AnaliseCurvaNew";

import api from "../../../services/api";

import download from "downloadjs";

function AnaliseCurva() {
  const [carregando, setCarregando] = useState(false);
  const [analiseCompleta, setAnaliseCompleta] = useState(false);

  const [curvas, setCurvas] = useState([]);

  useEffect(() => {
    realizarAnalise();
  }, []);

  const realizarAnalise = async () => {
    setCarregando(true);
    setAnaliseCompleta(false);

    await api
      .get("/analisecurva")
      .then((response) => {
        setAnaliseCompleta(true);
        setCurvas(response.data.curvas);
      })
      .catch(() => {
        setAnaliseCompleta(false);
      })
      .finally(() => {
        setCarregando(false);
      });
  };

  return (
    <>
      <Background>
        <Menu logged={true} />

        <Page>
          <Page.Body>
            <Page.Content>
              <Page.Title>Análise de Curva</Page.Title>
              <Page.Subtitle>
                Gerar análise de curva, mínimo e máximo.
              </Page.Subtitle>
              <ContentCard>
                {analiseCompleta && (
                  <>
                    <div className="d-flex justify-content-end mb-3">
                      <LoadingButton
                        className="mx-2"
                        variant="outline-primary"
                        block={true}
                        loading={false}
                        onClick={() => {}}
                        size="sm"
                      >
                        <div className="d-flex">
                          <div className="mx-3">
                            <BsArrowClockwise />
                          </div>
                          <div className="me-3">Limpar Filtros</div>
                        </div>
                      </LoadingButton>
                      <LoadingButton
                        className="mx-2"
                        variant="outline-success"
                        block={true}
                        onClick={() => {}}
                        size="sm"
                      >
                        <div className="d-flex">
                          <div className="mx-3">
                            <BsBoxArrowInUpRight />
                          </div>
                          <div className="me-3">Exportar Binx</div>
                        </div>
                      </LoadingButton>
                      <LoadingButton
                        className="ms-2"
                        variant="outline-secondary"
                        block={true}
                        onClick={() => {}}
                        size="sm"
                      >
                        <div className="d-flex">
                          <div className="mx-3">
                            <BsDownload />
                          </div>
                          <div className="me-3">Exportar Planilha</div>
                        </div>
                      </LoadingButton>
                    </div>
                  </>
                )}

                {!carregando && !analiseCompleta && (
                  <CenterHorizontally>
                    <p className="text-muted">
                      Realize uma nova análise para visualizar os resultados.
                    </p>
                  </CenterHorizontally>
                )}

                {carregando && (
                  <>
                    <CenterHorizontally>
                      <CenterVertically>
                        <Spinner animation="grow" size="lg" />
                      </CenterVertically>
                    </CenterHorizontally>
                  </>
                )}

                {analiseCompleta && (
                  <>
                    <Container fluid className="p-0 mt-4 mb-5 pb-5">
                      <TabelaResultados curvas={curvas} />
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

export default AnaliseCurva;
