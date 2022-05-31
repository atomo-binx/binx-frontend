import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import FrenteCaixa from "./pages/Vendas/FrenteCaixa";

const ProtectedRoute = React.lazy(() => import("./components/Binx/ProtectedRoute"));
const LoggedOutRoute = React.lazy(() => import("./components/Binx/LoggedOutRoute"));
const Login = React.lazy(() => import("./pages/Login"));
const Painel = React.lazy(() => import("./pages/Painel"));
const DashboardCompras = React.lazy(() => import("./pages/DashboardCompras"));
const AprovarPedidos = React.lazy(() => import("./pages/Expedicao/AprovarPedidos"));
const Etiquetas = React.lazy(() => import("./pages/Expedicao/Etiquetas"));
const FreteVendas = React.lazy(() => import("./pages/FreteVendas"));
const Configuracoes = React.lazy(() => import("./pages/Configuracoes"));
const MinMax = React.lazy(() => import("./pages/MinMax"));
const CalculoMargem = React.lazy(() => import("./pages/CalculoMargem"));
const NovaProspeccao = React.lazy(() => import("./pages/NovaProspeccao"));
const Prospeccoes = React.lazy(() => import("./pages/Prospeccoes"));
const Produtos = React.lazy(() => import("./pages/Produtos"));
const Disponibilidade = React.lazy(() => import("./pages/Disponibilidade"));
const ControleCaixa = React.lazy(() => import("./pages/Financeiro/ControleCaixa"));
const Caixa = React.lazy(() => import("./pages/Financeiro/Caixa"));
const TabelaComponex = React.lazy(() => import("./pages/TabelaComponex"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Relatorios = React.lazy(() => import("./pages/Compras/Relatorios"));

export default function Routes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<></>}>
        <Switch>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/" element={<LoggedOutRoute element={Login} />} />
          <Route path="/configuracoes" element={<ProtectedRoute element={Configuracoes} />} />
          <Route path="/painel" element={<ProtectedRoute element={Painel} />} />

          <Route path="/relatorios/minmax" element={<ProtectedRoute element={MinMax} />} />

          <Route path="/componex" element={<ProtectedRoute element={TabelaComponex} />} />

          <Route path="/expedicao/aprovar" element={<ProtectedRoute element={AprovarPedidos} />} />
          <Route path="/expedicao/etiquetas" element={<ProtectedRoute element={Etiquetas} />} />

          <Route path="/vendas/margem" element={<ProtectedRoute element={CalculoMargem} />} />
          <Route path="/vendas/frete" element={<ProtectedRoute element={FreteVendas} />} />
          <Route path="/vendas/prospeccao" element={<ProtectedRoute element={Prospeccoes} />} />
          <Route path="/vendas/prospeccao/incluir" element={<ProtectedRoute element={NovaProspeccao} />} />
          <Route path="/vendas/frentecaixa" element={<ProtectedRoute element={FrenteCaixa} />} />

          <Route path="/cadastros/produtos" element={<ProtectedRoute element={Produtos} />} />

          <Route path="/compras/dashboard" element={<ProtectedRoute element={DashboardCompras} />} />
          <Route path="/compras/disponibilidade" element={<ProtectedRoute element={Disponibilidade} />} />
          <Route path="/compras/relatorios" element={<ProtectedRoute element={Relatorios} />} />

          <Route path="/financas/controlecaixa" element={<ProtectedRoute element={ControleCaixa} />} />
          <Route path="/financas/caixa/:id" element={<ProtectedRoute element={Caixa} />} />

          <Route path="*" element={<ProtectedRoute element={NotFound} />} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}
