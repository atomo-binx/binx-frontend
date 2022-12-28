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

  const [situacaoProduto, setSituacaoProduto] = useState(
    situacao === "Disponível" ? valor : situacao
  );

  return (
    <>
      <Controller
        name={`quantidade-${idxProduto}`}
        control={control}
        render={({ field }) => (
          <Form.Control
            list="datalistOptions"
            type="text"
            defaultValue={situacaoProduto}
            size="sm"
            {...field}
            {...register(`orcamento-${idxOrcamento}-produto-${idxProduto}`)}
            onChange={(e) => {
              if (e.target.value.match("^[0-9]*$")) {
                field.onChange();
              }
            }}
          />
        )}
      />

      <datalist id="datalistOptions">
        <option value="Não Trabalha" />
        <option value="Indisponível" />
      </datalist>
    </>
  );
}

export default DropValorProduto;
