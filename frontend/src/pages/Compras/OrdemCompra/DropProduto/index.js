import React, { forwardRef, useState } from "react";

import { Dropdown, Form, Badge } from "react-bootstrap";

import { BsArrowDown, BsXCircle } from "react-icons/bs";

function DropProduto({ idxProduto, cacheProdutos, atribuirProduto }) {
  const [produto, setProduto] = useState({});

  const CustomToggle = forwardRef(({ children, onClick }, ref) => (
    <Form.Control
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      readOnly
      type="text"
      size="sm"
      placeholder="Selecionar Produto"
    />
    // <a
    //   href=""
    //   ref={ref}
    //   onClick={(e) => {
    //     e.preventDefault();
    //     onClick(e);
    //   }}
    //   style={{
    //     textDecoration: "none",
    //     color: "#198754",
    //   }}
    // >
    //   {children}
    // </a>
  ));

  CustomToggle.displayName = "CustomToggle";

  const CustomDropdownItem = ({ produto }) => {
    return (
      <Dropdown.Item
        key={produto.idSku}
        className="d-flex flex-row"
        onClick={() => selecionarProduto(produto)}
      >
        <div style={{ width: "50px" }}>
          <Badge bg="primary">{produto.idSku}</Badge>
        </div>
        <div>{produto.nome}</div>
      </Dropdown.Item>
    );
  };

  const CustomMenu = forwardRef(({ style, className }, ref) => {
    const [value, setValue] = useState("");

    return (
      <div
        ref={ref}
        className={className}
        style={{
          ...style,
          minHeight: "250px",
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
            placeholder="Pesquisar Produtos"
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
          {value.length >= 2 &&
            cacheProdutos
              .filter((produto) => produto.idSku.startsWith(value))
              .map((produto) => {
                return (
                  <CustomDropdownItem key={produto.idSku} produto={produto} />
                );
              })}

          {value.length >= 3 &&
            cacheProdutos
              .filter((produto) =>
                produto.nome.toLowerCase().includes(value.toLowerCase())
              )
              .map((produto) => {
                return (
                  <CustomDropdownItem key={produto.idSku} produto={produto} />
                );
              })}
        </ul>
      </div>
    );
  });

  CustomMenu.displayName = "CustomMenu";

  function selecionarProduto(produto) {
    setProduto(produto);
    atribuirProduto(idxProduto, produto);
  }

  return (
    <Dropdown drop="down-centered">
      <Dropdown.Toggle as={CustomToggle}>
        {!produto.idSku && (
          <>
            Produto
            <BsArrowDown color={"#198754"} size={13} />
          </>
        )}

        {produto.idSku && (
          <Form.Control
            size="sm"
            type="text"
            value={produto.nome}
            readOnly
            style={{ fontWeight: "bold", fontSize: "0.8rem" }}
          />
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu} />
    </Dropdown>
  );
}

export default DropProduto;
