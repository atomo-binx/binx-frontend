import React from "react";

import Background from "../../../components/Binx/Background";
import PageWrapper from "../../../components/Binx/PageWrapper";
import PageContent from "../../../components/Binx/PageContent";
import Page from "../../../components/Binx/Page";
import Sidebar from "../../../components/Binx/Sidebar";
import ContentCard from "../../../components/Binx/ContentCard";
import Menu from "../../../components/Binx/Menu";
import LoadingButton from "../../../components/Binx/LoadingButton";

function FrenteCaixa() {
  return (
    <Background>
      <Menu logged={true} />
      <PageWrapper>
        <Page>
          <Sidebar startOpen={true}>
            <div className="text-center p-4 mt-3">
              <h6>Frente de Caixa</h6>
            </div>

            <div>
              <LoadingButton>Abrir Caixa</LoadingButton>
            </div>
          </Sidebar>
          <PageContent>
            <h3>Frente de Caixa</h3>
            <ContentCard>aaa</ContentCard>
          </PageContent>
        </Page>
      </PageWrapper>
    </Background>
  );
}

export default FrenteCaixa;
