import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import Menu from "../../components/Menu";

import "./styles.css";

function Painel() {
  return (
    <>
      <Menu logged={true} />

      <Container className="bg-gray container-binx" fluid>
        <Container className="panel-container">
          <Row>
            <Col>
              <div className="card-panel">
                <div className="gray-panel"></div>
                <div className="white-panel p-4">
                  <h5 className="panel-header">Vendas</h5>
                  <div className="panel-links">
                    <Link to="/vendas/frete" className="panel-link text-muted">
                      Cálculo de Frete
                    </Link>
                    <Link to="/vendas/margem" className="panel-link text-muted">
                      Cálculo de Margem
                    </Link>
                    <Link
                      to="/vendas/prospeccao"
                      className="panel-link text-muted"
                    >
                      Prospecção de Clientes
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
            <Col>
              <div className="card-panel">
                <div className="gray-panel"></div>
                <div className="white-panel p-4">
                  <h5 className="panel-header">Compras</h5>
                  <div className="panel-links">
                    <Link
                      to="/compras/dashboard"
                      className="panel-link text-muted"
                    >
                      Dashboard
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="card-panel">
                <div className="gray-panel"></div>
                <div className="white-panel p-4">
                  <h5 className="panel-header">Expedição</h5>
                  <div className="panel-links">
                    <Link
                      to="/expedicao/aprovar"
                      className="panel-link text-muted"
                    >
                      Aprovação de Pedidos
                    </Link>
                    <Link
                      to="/expedicao/etiquetas"
                      className="panel-link text-muted"
                    >
                      Impressão de Etiquetas
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
            <Col>
              <div className="card-panel">
                <div className="gray-panel"></div>
                <div className="white-panel p-4">
                  <h5 className="panel-header">Relatórios</h5>
                  <div className="panel-links">
                    <Link
                      to="/relatorios/minmax"
                      className="panel-link text-muted"
                    >
                      Estoque Máximo e Mínimo
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default Painel;
