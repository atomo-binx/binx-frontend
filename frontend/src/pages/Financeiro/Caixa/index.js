import React from "react";
import { useParams } from "react-router-dom";

import Background from "../../../components/Binx/Background";
import Menu from "../../../components/Binx/Menu";
import Page from "../../../components/Binx/Page";

function Caixa() {
  const { id } = useParams();

  return (
    <>
      <Background>
        <Menu logged={true} />
        <Page></Page>
      </Background>
    </>
  );
}

export default Caixa;
