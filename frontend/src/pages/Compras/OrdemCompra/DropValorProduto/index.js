import React, { useEffect, useState } from "react";

import { Form } from "react-bootstrap";

import { useForm, Controller } from "react-hook-form";

function DropValorProduto({
  idxOrcamento,
  idxProduto,
  situacao,
  valor,
  register,
}) {
  const { control } = useForm();

  const situacaoProduto = situacao === "Disponível" ? valor : situacao;

  const handleMenu = (e) => {
    e.preventDefault();
    console.log("Clicou com o botão direito");
  };

  return (
    <>
      <Controller
        name={`quantidade-${idxProduto}`}
        control={control}
        render={({ field }) => (
          <Form.Control
            onContextMenu={handleMenu}
            list="datalistOptions"
            type="text"
            defaultValue={situacaoProduto}
            size="sm"
            {...field}
            {...register(`orcamento-${idxOrcamento}-produto-${idxProduto}`)}
            onChange={(e) => {
              if (e.target.value === "Não Trabalha")
                e.target.value = "Não Trabalha";
              else if (e.target.value === "Em Falta")
                e.target.value = "Em Falta";
              else e.target.value = e.target.value.replace(/[^$0-9.,]/, "");
            }}
          />
        )}
      />

      <datalist id="datalistOptions">
        <option value="Não Trabalha" />
        <option value="Em Falta" />
        <option value="Parcial" />
      </datalist>
    </>
  );
}

export default DropValorProduto;
