import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

const Login = React.lazy(() => import("./pages/Login"));
const Painel = React.lazy(() => import("./pages/Painel"));
const DashboardCompras = React.lazy(() => import("./pages/DashboardCompras"));
const AprovarPedidos = React.lazy(() => import("./pages/AprovarPedidos"));
const FreteVendas = React.lazy(() => import("./pages/FreteVendas"));
const Configuracoes = React.lazy(() => import("./pages/Configuracoes"));
const MinMax = React.lazy(() => import("./pages/MinMax"));
const CalculoMargem = React.lazy(() => import("./pages/CalculoMargem"));
const NovaProspeccao = React.lazy(() => import("./pages/NovaProspeccao"));
const Prospeccoes = React.lazy(() => import("./pages/Prospeccoes"));
const Produtos = React.lazy(() => import("./pages/Produtos"));
const Disponibilidade = React.lazy(() => import("./pages/Disponibilidade"));
const Etiquetas = React.lazy(() => import("./pages/Etiquetas"));
const TabelaComponex = React.lazy(() => import("./pages/TabelaComponex"));

export default function Routes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<></>}>
        <Switch>
          <Route exact path="/componex" component={TabelaComponex} />

          <Route path="/" element={<Login />} />

          <Route
            path="/configuracoes"
            element={<ProtectedRoute component={Configuracoes} redirect="/" />}
          />

          <Route
            path="/painel"
            element={<ProtectedRoute component={Painel} redirect="/" />}
          />

          <Route
            path="/compras/dashboard"
            element={
              <ProtectedRoute component={DashboardCompras} redirect="/" />
            }
          />

          <Route
            path="/vendas/frete"
            element={<ProtectedRoute component={FreteVendas} redirect="/" />}
          />

          <Route
            path="/relatorios/minmax"
            element={<ProtectedRoute component={MinMax} redirect="/" />}
          />

          <Route
            path="/vendas/margem"
            element={<ProtectedRoute component={CalculoMargem} redirect="/" />}
          />

          <Route
            path="/expedicao/aprovar"
            element={<ProtectedRoute component={AprovarPedidos} redirect="/" />}
          />

          <Route
            path="/expedicao/etiquetas"
            element={<ProtectedRoute component={Etiquetas} redirect="/" />}
          />

          <Route
            path="/vendas/prospeccao"
            element={<ProtectedRoute component={Prospeccoes} redirect="/" />}
          />

          <Route
            path="/vendas/prospeccao/incluir"
            element={<ProtectedRoute component={NovaProspeccao} redirect="/" />}
          />

          <Route
            path="/cadastros/produtos"
            element={<ProtectedRoute component={Produtos} redirect="/" />}
          />

          <Route
            path="/compras/disponibilidade"
            element={
              <ProtectedRoute component={Disponibilidade} redirect="/" />
            }
          />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}
