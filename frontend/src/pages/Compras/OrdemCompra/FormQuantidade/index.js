import React, { memo, useState } from "react";
import { Form } from "react-bootstrap";

const FormQuantidade = memo(({ idxProduto, quantidade, alterarQuantidade }) => {
  const [value, setValue] = useState(quantidade);

  console.log("Renderizando Form de Quantidade");

  const inputNumerico = (value, setFunction) => {
    if (value.match("^[0-9]*$")) {
      setFunction(value);
      alterarQuantidade(idxProduto, Number(value));
    }
  };

  return (
    <Form.Control
      size="sm"
      type="text"
      value={value}
      onChange={(e) => inputNumerico(e.target.value, setValue)}
    />
  );
});

FormQuantidade.displayName = "FormQuantidade";

// const FormQuantidade({ idxProduto, quantidade, alterarQuantidade }) {
//   const [value, setValue] = useState(quantidade);

//   console.log("Renderizando Form de Quantidade");

//   const inputNumerico = (value, setFunction) => {
//     if (value.match("^[0-9]*$")) {
//       setFunction(value);
//       alterarQuantidade(idxProduto, value);
//     }
//   };

//   return (
//     <Form.Control
//       size="sm"
//       type="text"
//       value={value}
//       onChange={(e) => inputNumerico(e.target.value, setValue)}
//     />
//   );
// }

export default FormQuantidade;
