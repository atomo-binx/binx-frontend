import React, { useEffect, forwardRef, useState } from "react";

import { Dropdown, Form, Container, ListGroup } from "react-bootstrap";

import { BsArrowDown, BsPlusCircleFill, BsXCircle } from "react-icons/bs";

function DropSearch({ fornecedores }) {
  const [value, setValue] = useState(fornecedores || []);
  const [fornecedor, setFornecedor] = useState(null);

  const CustomToggle = forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      style={{
        textDecoration: "none",
        color: "#198754",
      }}
    >
      {children}
    </a>
  ));

  CustomToggle.displayName = "CustomToggle";

  const CustomMenu = forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      const [value, setValue] = useState("");

      return (
        <div
          ref={ref}
          className={className}
          style={{
            ...style,
            maxHeight: "250px",
            minWidth: "500px",
            maxWidth: "500px",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <div className="d-flex flex-row align-items-center">
            <Form.Control
              autoFocus
              className="ms-3 my-2"
              style={{ width: "88%" }}
              placeholder="Pesquisar Fornecedores"
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
            <BsXCircle
              className="mx-3"
              size={15}
              color={"#DC3545"}
              role="button"
              onClick={() => setValue("")}
            />
          </div>
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value ||
                child.props.children.toLowerCase().includes(value.toLowerCase())
            )}

            {fornecedores.filter((fornecedor) =>
              fornecedor.nomeFornecedor
                .toLowerCase()
                .includes(value.toLowerCase())
            ).length == 0 && (
              <Dropdown.Item>
                <Container
                  fluid
                  className="p-0 d-flex flex-row align-items-center"
                >
                  <ListGroup className="w-100">
                    <ListGroup.Item>
                      <BsPlusCircleFill
                        color="#198754"
                        size={20}
                        className="me-3"
                      />
                      Cadastrar Novo Fornecedor
                    </ListGroup.Item>
                  </ListGroup>
                </Container>
              </Dropdown.Item>
            )}
          </ul>
        </div>
      );
    }
  );

  CustomMenu.displayName = "CustomMenu";

  function selecionarFornecedor(idFornecedor, nomeFornecedor) {
    setFornecedor({ idFornecedor, nomeFornecedor });
  }

  return (
    <Dropdown drop="down-centered">
      <Dropdown.Toggle as={CustomToggle}>
        {!fornecedor && (
          <>
            Fornecedor
            <BsArrowDown color={"#198754"} size={13} />
          </>
        )}

        {fornecedor && (
          <Form.Control
            size="sm"
            type="text"
            value={fornecedor.nomeFornecedor}
            readOnly
            style={{ fontWeight: "bold", fontSize: "0.8rem" }}
          />
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu}>
        {fornecedores.map((fornecedor) => (
          <Dropdown.Item
            key={fornecedor.idFornecedor}
            onClick={() =>
              selecionarFornecedor(
                fornecedor.idFornecedor,
                fornecedor.nomeFornecedor
              )
            }
          >
            {fornecedor.nomeFornecedor}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropSearch;
