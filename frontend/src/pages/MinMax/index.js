import React, { useState, useEffect } from "react";
import Menu from "../../components/Binx/Menu";
import TabelaResultados from "../../components/MinMax/TabelaResultados";
import download from "downloadjs";

import api from "../../services/api";

import ModalExportarBinxBling from "../../components/MinMax/ModalExportarBinxBling";
import ModalInfo from "../../components/MinMax/ModalInfo";

import {
  Card,
  Container,
  Row,
  Button,
  Col,
  Tabs,
  Tab,
  Spinner,
  Alert,
} from "react-bootstrap";

import {
  BsDownload,
  BsBoxArrowInUpRight,
  BsInfoCircle,
  BsGear,
  BsCheck,
} from "react-icons/bs";

function MinMax() {
  const [loadingAnalise, setLoadingAnalise] = useState(false);
  const [analiseCompleta, setAnaliseCompleta] = useState(false);

  const [semCategoria, setSemCategoria] = useState([]);
  const [acessorios, setAcessorios] = useState([]);
  const [componentes, setComponentes] = useState([]);
  const [ferramentas, setFerramentas] = useState([]);
  const [motores, setMotores] = useState([]);
  const [maker, setMaker] = useState([]);
  const [semVenda, setSemVenda] = useState([]);
  const [estatisticas, setEstatisticas] = useState({});
  const [exportar, setExportar] = useState([]);

  // Controle dos Modais
  const [showExport, setShowExport] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleClose = () => {
    setShowExport(false);
    setShowInfo(false);
  };

  const realizarAnalise = async () => {
    setLoadingAnalise(true);
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

        // Desestruturas estatisticas da análise
        setEstatisticas(response.data.estatisticas);

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
        setLoadingAnalise(false);
        setAnaliseCompleta(true);
      })
      .catch((error) => {
        console.log("Erro");
        setLoadingAnalise(false);
        setAnaliseCompleta(false);
      });
  };

  const exportarExcel = async () => {
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
      });
  };

  return (
    <>
      <Menu logged={true} />

      <Container className="mt-4" fluid="lg">
        <Row>
          <Card className="p-3" style={{ width: "115%" }}>
            <Card.Title className="mt-2">
              Análise de Estoque Mínimo e Máximo
            </Card.Title>
            <Card.Subtitle className="my-2 text-muted">
              A análise é executada conforme os parâmetros salvos
            </Card.Subtitle>

            <Row className="my-3">
              <Col>
                <div className="d-grid gap-2">
                  <Button block variant="primary" onClick={realizarAnalise}>
                    {loadingAnalise && (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    )}
                    {!loadingAnalise && (
                      <>
                        Gerar Nova Análise <BsCheck />
                      </>
                    )}
                  </Button>
                </div>
              </Col>
              <Col>
                <div className="d-grid gap-2">
                  <Button
                    block
                    variant="primary"
                    disabled={loadingAnalise ? true : false}
                    disabled
                  >
                    Configurar <BsGear />
                  </Button>
                </div>
              </Col>
              <Col>
                <div className="d-grid gap-2">
                  <Button
                    block
                    variant="secondary"
                    // disabled={analiseCompleta ? false : true}
                    disabled
                    onClick={() => setShowInfo(true)}
                  >
                    Informações <BsInfoCircle />
                  </Button>
                </div>
              </Col>
              <Col>
                <div className="d-grid gap-2">
                  <Button
                    block
                    // variant={analiseCompleta ? "success" : "outline-success"}
                    variant="success"
                    disabled={analiseCompleta ? false : true}
                    onClick={() => setShowExport(true)}
                  >
                    Exportar Binx/Bling <BsBoxArrowInUpRight />
                  </Button>
                </div>
              </Col>
              <Col>
                <div className="d-grid gap-2">
                  <Button
                    block
                    // variant={analiseCompleta ? "info" : "outline-info"}
                    variant="info"
                    disabled={analiseCompleta ? false : true}
                    onClick={exportarExcel}
                  >
                    Exportar Planilha <BsDownload />
                  </Button>
                </div>
              </Col>
            </Row>

            {!loadingAnalise && !analiseCompleta && (
              <>
                <Alert className="mt-2" variant="warning">
                  Realize uma nova anaĺise para visualizar os resultados.
                </Alert>
              </>
            )}

            <Card.Body>
              {loadingAnalise && (
                <>
                  <Container className="text-center">
                    <Spinner
                      as="span"
                      animation="border"
                      size="lg"
                      role="status"
                      aria-hidden="true"
                    />
                  </Container>
                </>
              )}

              {!loadingAnalise && analiseCompleta && (
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
            </Card.Body>
          </Card>
        </Row>
      </Container>

      {/* Modais */}
      <ModalExportarBinxBling
        showExport={showExport}
        handleClose={handleClose}
        setShowExport={setShowExport}
        objExportar={exportar}
      />

      <ModalInfo
        showInfo={showInfo}
        handleClose={handleClose}
        setShowInfo={setShowInfo}
        estatisticas={estatisticas}
      />
    </>
  );
}

export default MinMax;
