import React, { useState } from "react";

import Menu from "../../../components/Binx/Menu";

import {
  Container,
  Row,
  Form,
  Button,
  Col,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

import {
  BsFillPlusCircleFill,
  BsFiles,
  BsX,
  BsArrowClockwise,
} from "react-icons/bs";

export default function TabelaComponex() {
  const [infos, setInfos] = useState(["", ""]);
  const [valores, setValores] = useState(["", ""]);
  const [html, setHtml] = useState("");

  const rowEven = `
    <tr class="even" style=" box-sizing: border-box; margin: 0px; padding: 0px; background-color: rgb(255, 255, 255);">
        <td style="box-sizing: border-box; margin: 0px; padding: 10px; border: none">
          <span style="color: rgb(0, 0, 0); font-family: Muli, sans-serif">
            #COLUNA_1
          </span>
        </td>
        <td class="last" style="box-sizing: border-box; margin: 0px; padding: 10px; border: none">
          <span style="color: rgb(0, 0, 0); font-family: Muli, sans-serif">
            #COLUNA_2
          </span>
        </td>
    </tr>
  `;

  const rowOdd = `
    <tr class="odd" style="box-sizing: border-box; margin: 0px; padding: 0px">
      <td style="box-sizing: border-box; margin: 0px; padding: 10px; border: none">
        <span style=" color: rgb(0, 0, 0); font-family: Muli, sans-serif; background-color: rgb(244, 244, 244);">
          #COLUNA_1
        </span>
      </td>
      <td class="last" style="box-sizing: border-box; margin: 0px; padding: 10px; border: none">
        <span style=" color: rgb(0, 0, 0); font-family: Muli, sans-serif; background-color: rgb(244, 244, 244);">
          #COLUNA_2
        </span>
      </td>
    </tr>
  `;

  const baseHtml = `
  <div>
    <table border="0" style=" margin: 0px; padding: 0px; border: 0px; border-collapse: collapse; border-spacing: 0px; empty-cells: show; color: rgb(0, 0, 0); font-family: Muli, sans-serif; background-color: rgb(244, 244, 244);">
      <tbody style="box-sizing: border-box; margin: 0px; padding: 0px">
        #ROWS
      </tbody>
    </table>
  </div>
  `;

  const processarHtml = () => {
    let rows = "";

    let tamanho = infos.length;

    for (let i = 0; i < tamanho; i++) {
      let row = "";

      if (i % 2 === 0) {
        // Par = Even
        row = rowEven.replace("#COLUNA_1", infos[i]);
        row = row.replace("#COLUNA_2", valores[i]);
      } else {
        // Impar = Odd
        row = rowOdd.replace("#COLUNA_1", infos[i]);
        row = row.replace("#COLUNA_2", valores[i]);
      }

      rows += row;
    }

    setHtml(baseHtml.replace("#ROWS", rows));
  };

  const alterarInfos = (value, idx) => {
    infos[idx] = value;
    setInfos(infos);
    processarHtml();
  };

  const alterarValores = (value, idx) => {
    valores[idx] = value;
    setValores(valores);
    processarHtml();
  };

  const novaLinha = () => {
    infos.push("");
    valores.push("");
    setInfos(infos);
    setValores(valores);
    processarHtml();
  };

  const removerLinha = (idx) => {
    infos.splice(idx, 1);
    valores.splice(idx, 1);
    setInfos(infos);
    setValores(valores);
    processarHtml();
  };

  const copiarHtml = () => {
    navigator.clipboard.writeText(html);
  };

  const reiniciar = () => {
    setInfos(["", ""]);
    setValores(["", ""]);
    setHtml(baseHtml);
    processarHtml();
  };

  return (
    <>
      <Menu logged={true} />

      <Container className="p-4 bg-gray binx-container" fluid>
        <Row>
          <h4 className="mb-2">Tabela de Especificação - Componex</h4>
          <p>
            Formulário para criação de tabelas para a descrição de produtos
            durante o cadastro na Componex.
          </p>
        </Row>
        <Row>
          <Col>
            <Row className="mb-2">
              <h4>Edição</h4>
            </Row>
            <Container className="bg-white binx-card p-4" fluid>
              <Row>
                <Form>
                  {infos.map((info, idx) => {
                    return (
                      <Row key={idx} className="mb-2 align-items-center">
                        <Col>
                          <Form.Control
                            onChange={(e) => alterarInfos(e.target.value, idx)}
                            value={infos[idx]}
                          />
                        </Col>
                        <Col>
                          <Form.Control
                            onChange={(e) =>
                              alterarValores(e.target.value, idx)
                            }
                            value={valores[idx]}
                          />
                        </Col>
                        <Col sm={1}>
                          <OverlayTrigger
                            placement="right"
                            overlay={
                              <Tooltip id="remover">Remover Linha</Tooltip>
                            }
                          >
                            <div>
                              <BsX
                                color="red"
                                size={20}
                                className="cursor-hover"
                                onClick={() => removerLinha(idx)}
                              />
                            </div>
                          </OverlayTrigger>
                        </Col>
                      </Row>
                    );
                  })}
                </Form>
              </Row>
              <Row className="justify-content-between">
                <Col sm={"auto"} className="my-2">
                  <Button variant="outline-success" onClick={novaLinha}>
                    <BsFillPlusCircleFill /> Nova Linha
                  </Button>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col>
            <Row className="mb-2">
              <h4>Visualização</h4>
            </Row>
            <Container className="bg-white binx-card p-4" fluid>
              <Row className="justify-content-center py-1">
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: html,
                    }}
                  ></div>
                </div>
              </Row>
              <Row className="justify-content-between">
                <Col sm={"auto"} className="my-2">
                  <Button variant="outline-primary" onClick={copiarHtml}>
                    <BsFiles /> Copiar HTML
                  </Button>
                </Col>
                <Col sm={"auto"} className="my-2">
                  <Button variant="outline-danger" onClick={reiniciar}>
                    <BsArrowClockwise /> Reiniciar
                  </Button>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}
