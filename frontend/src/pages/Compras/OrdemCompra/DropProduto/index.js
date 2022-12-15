import React, { useEffect, forwardRef, useState } from "react";

import { Dropdown, Form, Container, ListGroup, Badge } from "react-bootstrap";

import { BsArrowDown, BsPlusCircleFill, BsXCircle } from "react-icons/bs";

function DropProduto({
  idxOrcamento,
  cacheProdutos,
  idSku,
  nomeProduto,
  atribuirProduto,
}) {
  const [produto, setProduto] = useState({
    idSku,
    nomeProduto,
  });

  const [dicionarioProdutos, setDicionarioProdutos] = useState({});

  useEffect(() => {
    console.log("Gerando dicionário");

    const dicionario = {};

    cacheProdutos.forEach((produto) => {
      dicionario[produto.idSku] = {
        ...produto,
      };
    });

    setDicionarioProdutos({ ...dicionario });

    console.log(dicionarioProdutos);
  }, []);

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
            {/* {React.Children.toArray(children).map((children) => {
              console.log(children);
            })} */}

            {React.Children.toArray(children).filter(
              (child) =>
                !value ||
                dicionarioProdutos[child.key.replace(".$", "")].nome
                  .toLowerCase()
                  .includes(value.toLowerCase()) ||
                dicionarioProdutos[child.key.replace(".$", "")].idSku
                  .toLowerCase()
                  .includes(value.toLowerCase())
            )}
          </ul>
        </div>
      );
    }
  );

  CustomMenu.displayName = "CustomMenu";

  function selecionarProduto(idSku, nomeProduto) {
    setProduto({ idSku, nomeProduto });

    atribuirProduto(idxOrcamento, idSku, nomeProduto);
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
            value={produto.nomeProduto}
            readOnly
            style={{ fontWeight: "bold", fontSize: "0.8rem" }}
          />
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu}>
        {cacheProdutos.map((produto) => (
          <Dropdown.Item
            key={produto.idSku}
            onClick={() =>
              selecionarProduto(produto.idSku, produto.nomeProduto)
            }
          >
            <Badge>{produto.idSku}</Badge>
            {produto.nome}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropProduto;
