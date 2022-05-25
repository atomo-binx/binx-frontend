import React, { useState } from "react";

import Background from "../../../components/Binx/Background";
import Menu from "../../../components/Binx/Menu";
import Sidebar from "../../../components/Binx/Sidebar";
import PageContent from "../../../components/PageContent";

import { Row, Col, Container, Button, Collapse, Card } from "react-bootstrap";

function ControleCaixa() {
  const [open, setOpen] = useState(false);

  return (
    <Background>
      <Menu logged={true} />

      <Container fluid>
        <>
          <Button
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
          >
            click
          </Button>
          <div style={{ minHeight: "150px" }}>
            <Row className="d-flex flex-direction-column">
              <Collapse in={open} dimension="width">
                <div id="example-collapse-text">
                  <Card body style={{ width: "400px" }}>
                    Anim pariatur cliche reprehenderit, enim eiusmod high life
                    accusamus terry richardson ad squid. Nihil anim keffiyeh
                    helvetica, craft beer labore wes anderson cred nesciunt
                    sapiente ea proident.
                  </Card>
                </div>
              </Collapse>
              <h1>Olá meu amigo</h1>
              <p> tudo bem tudo bem tudo bem?</p>
            </Row>
          </div>
        </>
      </Container>

      {/* <Container fluid className="m-0 p-0 pt-4">
        <Sidebar>
          <h3>Oi</h3>
          <p>Olá</p>
        </Sidebar>
        <Container fluid>
          <h1> olá </h1>
          <p>Olá</p>
        </Container>
      </Container> */}
    </Background>
  );
}

export default ControleCaixa;
