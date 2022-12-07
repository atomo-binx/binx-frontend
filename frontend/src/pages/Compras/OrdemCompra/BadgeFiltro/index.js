import React from "react";
import { Badge } from "react-bootstrap";
import { BsXLg } from "react-icons/bs";

const situacoes = {
  1: "Em Aberto",
  2: "Em Orçamento",
  3: "Parcialmente Finalizada",
  4: "Finalizada",
  5: "Cancelada",
};

const tipos = {
  1: "Reposição de Estoque",
  2: "Atender Venda",
};

function BadgeFiltro(props) {
  const { campo, valor, removerFiltro } = props;

  return (
    <>
      {campo !== "busca" && (
        <Badge
          bg="success"
          className="ms-1 d-flex align-items-center"
          pill={false}
        >
          {campo === "situacao" && <>{situacoes[valor]}</>}
          {campo === "tipo" && <>{tipos[valor]}</>}
          <BsXLg
            role="button"
            className="ms-1"
            size={10}
            onClick={() => removerFiltro(campo)}
          />
        </Badge>
      )}
    </>
  );
}

export default BadgeFiltro;
