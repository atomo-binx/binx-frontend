import React, { useState, useEffect } from "react";

import {
  Col,
  Collapse,
  Container,
  Row,
  Button,
  Card,
  Image,
  Spinner,
} from "react-bootstrap";

import { BsFillBackspaceFill, BsGrid } from "react-icons/bs";

import Menu from "../../components/Menu";

import ButtonBlock from "../../components/ButtonBlock";
import PageContent from "../../components/PageContent";

import GridFillWhite from "../../assets/grid-fill.svg";

import api from "../../services/api";
import HistoricoDisponibilidade from "../../components/DashCompras/HistoricoDisponibilidade";

import "./styles.css";

const Drawer = (props) => {
  const { open, setOpen } = props;

  const [drawerStateClass, setDrawerStateClass] = useState("drawer-closed");

  const handleDrawerToggle = () => {
    if (open) {
      setOpen(false);
      setDrawerStateClass("drawer-closed");
    } else {
      setOpen(true);
      setDrawerStateClass("drawer-opened");
    }
  };

  const OpenDrawer = () => {
    return (
      <div className="drawer-open-button-div" onClick={handleDrawerToggle}>
        <Image src={GridFillWhite} width="16px" />
      </div>
    );
  };

  return (
    <>
      <OpenDrawer />
      <Container
        as={Col}
        className={`drawer-div ${drawerStateClass}`}
        xs={10}
        sm={4}
        lg={3}
        xl={2}
      >
        <BsFillBackspaceFill
          className="close-icon"
          size={25}
          onClick={handleDrawerToggle}
        />
        <div className="drawer-content ">
          <div className="drawer-header">
            <h5 style={{ fontSize: "1.2rem" }}>Disponibilidade</h5>
          </div>
          <div>
            <p style={{ fontSize: "0.8rem" }}>
              Percentual de disponibilidade de produtos
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default function Disponibilidade() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const [carregado, setCarregado] = useState(false);
  const [dados, setDados] = useState([]);

  useEffect(async () => {
    await api
      .get("/compras/disponibilidade")
      .then((res) => {
        setDados(res.data);
        setCarregado(true);
      })
      .catch((error) => {
        console.log(
          "Erro na requisição de atualização dos dados da dashboard de compras"
        );
      });
  }, []);

  return (
    <>
      <Menu logged={true} />

      <Container className="bg-gray binx-container" fluid>
        <Row className="flex-xl-nowrap pt-4">
          <Col
            xs={openDrawer ? 10 : 1}
            sm={openDrawer ? 4 : 1}
            lg={openDrawer ? 3 : 1}
            xl={openDrawer ? 2 : 1}
          >
            <Drawer open={openDrawer} setOpen={setOpenDrawer} />
          </Col>
          <PageContent open={openDrawer}>
            <Container fluid className="bg-white binx-container binx-card p-4">
              {carregado && (
                <div style={{ height: "500px" }}>
                  <HistoricoDisponibilidade disponibilidades={dados} />
                </div>
              )}

              {!carregado && (
                <Container fluid className="text-center binx-container">
                  <Container fluid className="center-vertically">
                    <Spinner
                      animation="grow"
                      size="md"
                      role="status"
                      aria-hidden="true"
                    />
                  </Container>
                </Container>
              )}
            </Container>
          </PageContent>
        </Row>
      </Container>
    </>
  );
}
