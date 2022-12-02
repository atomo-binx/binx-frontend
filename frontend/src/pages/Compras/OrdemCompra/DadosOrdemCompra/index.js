import React, { useState, useEffect, useContext } from "react";
import { Container, Spinner } from "react-bootstrap";
import { BsPlus } from "react-icons/bs";
import { useParams } from "react-router-dom";

import Background from "../../../../components/Binx/Background";
import ContentCard from "../../../../components/Binx/ContentCard";
import LoadingButton from "../../../../components/Binx/LoadingButton";
import Menu from "../../../../components/Binx/Menu";
import Page from "../../../../components/Binx/Page";
import { AuthContext } from "../../../../contexts/auth";

import api from "../../../../services/api";

function DadosOrdemCompra() {
  const userContext = useContext(AuthContext);
  const { idOrdemCompra } = useParams();

  console.log(idOrdemCompra);

  const [ordensCompra, setOrdensCompra] = useState([]);
  const [carregando, setCarregando] = useState(true);

  return (
    <>
      <Background>
        <Menu logged={true} />

        <Page>
          <Page.Body>
            <Page.Content>
              <Page.Title>Ordem de Compra</Page.Title>
              <Page.Subtitle>...</Page.Subtitle>
              <ContentCard>
                {carregando && (
                  <Container
                    fluid
                    className="p-0 d-flex justify-content-center py-5 my-5"
                  >
                    <Spinner animation="grow" size="sm" />
                  </Container>
                )}

                {!carregando && <></>}
              </ContentCard>
            </Page.Content>
          </Page.Body>
        </Page>
      </Background>
    </>
  );
}

export default DadosOrdemCompra;
