import React, { useState, useEffect } from "react";

import Background from "../../../components/Binx/Background";
import ContentCard from "../../../components/Binx/ContentCard";
import Menu from "../../../components/Binx/Menu";
import Page from "../../../components/Binx/Page";

import api from "../../../services/api";

function OrdemCompra() {
  const [ordensCompra, setOrdensCompra] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    api
      .get("/ordemcompra")
      .then((response) => {
        setOrdensCompra(response.data.ordensCompra);
      })
      .catch(() => {
        console.log("Erro");
      })
      .finally(() => {
        setCarregando(true);
      });
  }, []);

  return (
    <>
      <Background>
        <Menu logged={true} />

        <Page>
          <Page.Body>
            <Page.Content>
              <Page.Title>Ordens de Compra</Page.Title>
              <Page.Subtitle>
                Criação e manipulação de ordens de compras.
              </Page.Subtitle>
              <ContentCard></ContentCard>
            </Page.Content>
          </Page.Body>
        </Page>
      </Background>
    </>
  );
}

export default OrdemCompra;
