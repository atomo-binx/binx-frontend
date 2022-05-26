import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";

const ProtectedRoute = React.lazy(() => import("./components/ProtectedRoute"));

const Login = React.lazy(() => import("./pages/Login"));
const Painel = React.lazy(() => import("./pages/Painel"));
const DashboardCompras = React.lazy(() => import("./pages/DashboardCompras"));
const AprovarPedidos = React.lazy(() =>
  import("./pages/Expedicao/AprovarPedidos")
);
const Etiquetas = React.lazy(() => import("./pages/Expedicao/Etiquetas"));
const FreteVendas = React.lazy(() => import("./pages/FreteVendas"));
const Configuracoes = React.lazy(() => import("./pages/Configuracoes"));
const MinMax = React.lazy(() => import("./pages/MinMax"));
const CalculoMargem = React.lazy(() => import("./pages/CalculoMargem"));
const NovaProspeccao = React.lazy(() => import("./pages/NovaProspeccao"));
const Prospeccoes = React.lazy(() => import("./pages/Prospeccoes"));
const Produtos = React.lazy(() => import("./pages/Produtos"));
const Disponibilidade = React.lazy(() => import("./pages/Disponibilidade"));
const ControleCaixa = React.lazy(() =>
  import("./pages/Financeiro/ControleCaixa")
);
const Caixa = React.lazy(() => import("./pages/Financeiro/Caixa"));
const TabelaComponex = React.lazy(() => import("./pages/TabelaComponex"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

export default function Routes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<></>}>
        <Switch>
          <Route path="/" element={<Login />} />

          <Route
            path="/configuracoes"
            element={<ProtectedRoute element={Configuracoes} redirect="/" />}
          />

          <Route
            path="/painel"
            element={<ProtectedRoute element={Painel} redirect="/" />}
          />

          <Route
            path="/compras/dashboard"
            element={<ProtectedRoute element={DashboardCompras} redirect="/" />}
          />

          <Route
            path="/vendas/frete"
            element={<ProtectedRoute element={FreteVendas} redirect="/" />}
          />

          <Route
            path="/relatorios/minmax"
            element={<ProtectedRoute element={MinMax} redirect="/" />}
          />

          <Route
            path="/vendas/margem"
            element={<ProtectedRoute element={CalculoMargem} redirect="/" />}
          />

          <Route
            path="/expedicao/aprovar"
            element={<ProtectedRoute element={AprovarPedidos} redirect="/" />}
          />

          <Route
            path="/expedicao/etiquetas"
            element={<ProtectedRoute element={Etiquetas} redirect="/" />}
          />

          <Route
            path="/vendas/prospeccao"
            element={<ProtectedRoute element={Prospeccoes} redirect="/" />}
          />

          <Route
            path="/vendas/prospeccao/incluir"
            element={<ProtectedRoute element={NovaProspeccao} redirect="/" />}
          />

          <Route
            path="/cadastros/produtos"
            element={<ProtectedRoute element={Produtos} redirect="/" />}
          />

          <Route
            path="/compras/disponibilidade"
            element={<ProtectedRoute element={Disponibilidade} redirect="/" />}
          />

          <Route
            path="/componex"
            element={<ProtectedRoute element={TabelaComponex} redirect="/" />}
          />

          <Route
            path="/financas/controlecaixa"
            element={<ProtectedRoute element={ControleCaixa} redirect="/" />}
          />

          <Route
            path="/financas/caixa/:id"
            element={<ProtectedRoute element={Caixa} redirect="/" />}
          />

          <Route
            path="*"
            element={<ProtectedRoute element={NotFound} redirect="/" />}
          />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}
