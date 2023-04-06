import dayjs from "dayjs";
import React, { useState, useEffect, useContext } from "react";

import {
  Col,
  Container,
  Row,
  Image,
  Spinner,
  Form,
  Button,
} from "react-bootstrap";

import { AuthContext } from "../../contexts/auth";

import Background from "../../components/Binx/Background";

import Menu from "../../components/Binx/Menu";
import Page from "../../components/Binx/Page";
import Sidebar from "../../components/Binx/Sidebar";
import LoadingContainer from "../../components/Binx/LoadingContainer";

import api from "../../services/api";

import HistoricoDisponibilidade from "./HistoricoDisponibilidade";
import BinxCard from "../../components/Binx/BinxCard";
import ContentCard from "../../components/Binx/ContentCard";
import ButtonBlock from "../../components/ButtonBlock";

export default function Disponibilidade() {
  const userContext = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [dados, setDados] = useState([]);

  const [exibirDatePicker, setExibirDatePicker] = useState(false);

  const [dataInicio, setDataInicio] = useState(
    dayjs().subtract(30, "days").endOf("day").format("YYYY-MM-DD")
  );
  const [dataFinal, setDataFinal] = useState(
    dayjs().startOf("day").format("YYYY-MM-DD")
  );

  const selecionarPeriodo = (value) => {
    setExibirDatePicker(value == 3 ? true : false);

    let subtrair = 30;

    if (value == 0) subtrair = 30;
    if (value == 1) subtrair = 60;
    if (value == 2) subtrair = 90;

    setDataInicio(
      dayjs().subtract(subtrair, "days").endOf("day").format("YYYY-MM-DD")
    );
    setDataFinal(dayjs().startOf("day").format("YYYY-MM-DD"));
  };

  const carregarDisponibilidade = () => {
    setLoading(true);

    api
      .get("/compras/disponibilidade", {
        params: {
          dataInicio: dayjs(dataInicio).format("DD/MM/YYYY"),
          dataFinal: dayjs(dataFinal).format("DD/MM/YYYY"),
        },
        headers: {
          Authorization: `Bearer ${userContext.accessToken}`,
        },
      })
      .then((res) => {
        setDados(res.data);
      })
      .catch(() => {
        console.log(
          "Erro na requisição de atualização dos dados da dashboard de compras"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    carregarDisponibilidade();
  }, []);

  return (
    <Background>
      <Menu logged={true} />
      <Page>
        <Page.Body>
          <Sidebar startOpen={true} showCloseButton={false}>
            <Sidebar.Title>Filtros</Sidebar.Title>

            <Sidebar.Item>
              <Form.Label>Período</Form.Label>
              <Form.Select
                onChange={(e) => selecionarPeriodo(e.target.value)}
                defaultValue="0"
                className="mb-3"
              >
                <option value="0">Últimos 30 dias</option>
                <option value="1">Últimos 60 dias</option>
                <option value="2">Últimos 90 dias</option>
                <option value="3">Período customizado</option>
              </Form.Select>
            </Sidebar.Item>

            {exibirDatePicker && (
              <Sidebar.Item>
                <div className="my-2">
                  <Form.Group className="mb-3">
                    <Form.Label>Data Inicial</Form.Label>
                    <Form.Control
                      type="date"
                      value={dataInicio}
                      onChange={(e) => setDataInicio(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Data Final</Form.Label>
                    <Form.Control
                      type="date"
                      value={dataFinal}
                      onChange={(e) => setDataFinal(e.target.value)}
                    />
                  </Form.Group>
                </div>
              </Sidebar.Item>
            )}

            <Container fluid className="p-0 m-0">
              <ButtonBlock>
                <Button variant="primary" onClick={carregarDisponibilidade}>
                  Filtrar
                </Button>
              </ButtonBlock>
            </Container>
          </Sidebar>
          <Page.Content>
            <ContentCard>
              <Container fluid className="m-0 p-0" style={{ height: "85%" }}>
                <LoadingContainer loading={loading}>
                  {Object.keys(dados).length > 0 && (
                    <HistoricoDisponibilidade
                      disponibilidades={dados.disponibilidades}
                    />
                  )}
                </LoadingContainer>
              </Container>
            </ContentCard>
          </Page.Content>
        </Page.Body>
      </Page>
    </Background>
  );
}
