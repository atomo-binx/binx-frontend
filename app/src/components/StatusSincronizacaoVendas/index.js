import React, { useEffect, useState } from "react";

import { Badge } from "react-bootstrap";

function StatusSincronizacaoVendas(props) {
  const { status } = props;

  const [loaded, setLoaded] = useState(false);
  const [variant, setVariant] = useState("secondary");
  const [text, setText] = useState("...");


  useEffect(() => {
    switch (status) {
      case "sincronizando":
        setVariant("warning");
        setText("Sincronizando");
        break;
      case "sincronizado":
        setVariant("success");
        setText("Sincronizado");
        break;
      case "erro":
        setVariant("danger");
        setText("Erro de sincronização");
        break;
      default:
        break;
    }
    setLoaded(true);
  }, [status]);

  return <Badge variant={variant}>{text}</Badge>;
}

export default StatusSincronizacaoVendas;
