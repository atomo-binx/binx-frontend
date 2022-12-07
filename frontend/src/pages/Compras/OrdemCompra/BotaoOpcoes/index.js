import React, { forwardRef } from "react";
import { Container, Dropdown } from "react-bootstrap";

import { BsThreeDotsVertical, BsChevronRight } from "react-icons/bs";

function BotaoOpcoes() {
  const CustomToggle = forwardRef(({ children, onClick }, ref) => (
    <span
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <BsThreeDotsVertical role="button" size={15} />
    </span>
  ));

  CustomToggle.displayName = "CustomToggle";

  const CustomMenu = forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <Container fluid className="m-0 p-0 d-flex justify-content-center">
            Alterar Situação
          </Container>
          <ul className="list-unstyled">
            {React.Children.toArray(children).map((children) => (
              <>{children}</>
            ))}
          </ul>
        </div>
      );
    }
  );

  CustomMenu.displayName = "CustomMenu";

  return (
    <>
      <Dropdown drop="start">
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" />

        <Dropdown.Menu as={CustomMenu}>
          <Dropdown.Divider />

          <Dropdown.Item eventKey="1">
            <Container
              fluid
              className="m-0 p-0 d-flex flex-row align-items-center"
            >
              <BsChevronRight className="me-2" />
              Em Aberto
            </Container>
          </Dropdown.Item>
          <Dropdown.Item eventKey="2">
            <Container
              fluid
              className="m-0 p-0 d-flex flex-row align-items-center"
            >
              <BsChevronRight className="me-2" />
              Em Orçamento
            </Container>
          </Dropdown.Item>
          <Dropdown.Item eventKey="3">
            <Container
              fluid
              className="m-0 p-0 d-flex flex-row align-items-center"
            >
              <BsChevronRight className="me-2" />
              Parcialmente Finalizada
            </Container>
          </Dropdown.Item>
          <Dropdown.Item eventKey="1">
            <Container
              fluid
              className="m-0 p-0 d-flex flex-row align-items-center"
            >
              <BsChevronRight className="me-2" />
              Finalizada
            </Container>
          </Dropdown.Item>
          <Dropdown.Item eventKey="1">
            <Container
              fluid
              className="m-0 p-0 d-flex flex-row align-items-center"
            >
              <BsChevronRight className="me-2" />
              Cancelada
            </Container>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default BotaoOpcoes;
