import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";

const ProtectedRoute = React.lazy(() => import("./components/Binx/ProtectedRoute"));
const LoggedOutRoute = React.lazy(() => import("./components/Binx/LoggedOutRoute"));
const Login = React.lazy(() => import("./pages/Login"));
const Painel = React.lazy(() => import("./pages/Painel"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const DashboardCompras = React.lazy(() => import("./pages/DashboardCompras"));
const AprovarPedidos = React.lazy(() => import("./pages/Expedicao/AprovarPedidos"));
const Etiquetas = React.lazy(() => import("./pages/Expedicao/Etiquetas"));
const FreteVendas = React.lazy(() => import("./pages/Vendas/FreteVendas"));
const CalculoMargem = React.lazy(() => import("./pages/Vendas/CalculoMargem"));
const NovaProspeccao = React.lazy(() => import("./pages/Vendas/NovaProspeccao"));
const Prospeccoes = React.lazy(() => import("./pages/Vendas/Prospeccoes"));
const Produtos = React.lazy(() => import("./pages/Produtos"));
const Disponibilidade = React.lazy(() => import("./pages/Disponibilidade"));
const ControleCaixa = React.lazy(() => import("./pages/Financeiro/ControleCaixa"));
const Caixa = React.lazy(() => import("./pages/Financeiro/Caixa"));
const TabelaComponex = React.lazy(() => import("./pages/Componex/TabelaComponex"));
const ExportarComponex = React.lazy(() => import("./pages/Componex/Exportar"));
const Relatorios = React.lazy(() => import("./pages/Compras/Relatorios"));
const EventBridge = React.lazy(() => import("./pages/EventBridge"));
const AnaliseCurva = React.lazy(() => import("./pages/Compras/AnaliseCurva"));
const RelatorioGeral = React.lazy(() => import("./pages/Compras/RelatorioGeral"));

const FreteLogistica = React.lazy(() => import("./pages/Logistica/CalculoFrete"));

export default function Routes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<></>}>
        <Switch>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/" element={<LoggedOutRoute element={Login} />} />
          <Route path="/painel" element={<ProtectedRoute element={Painel} />} />

          <Route path="/componex/tabela" element={<ProtectedRoute element={TabelaComponex} />} />
          <Route path="/componex/exportar" element={<ProtectedRoute element={ExportarComponex} />} />

          <Route path="/expedicao/aprovar" element={<ProtectedRoute element={AprovarPedidos} />} />
          <Route path="/expedicao/etiquetas" element={<ProtectedRoute element={Etiquetas} />} />

          <Route path="/vendas/margem" element={<ProtectedRoute element={CalculoMargem} />} />
          <Route path="/vendas/frete" element={<ProtectedRoute element={FreteVendas} />} />
          <Route path="/vendas/prospeccao" element={<ProtectedRoute element={Prospeccoes} />} />
          <Route path="/vendas/prospeccao/incluir" element={<ProtectedRoute element={NovaProspeccao} />} />

          <Route path="/cadastros/produtos" element={<ProtectedRoute element={Produtos} />} />

          <Route path="/compras/dashboard" element={<ProtectedRoute element={DashboardCompras} />} />
          <Route path="/compras/disponibilidade" element={<ProtectedRoute element={Disponibilidade} />} />
          <Route path="/compras/relatorios" element={<ProtectedRoute element={Relatorios} />} />
          <Route path="/compras/curva" element={<ProtectedRoute element={AnaliseCurva} />} />
          <Route path="/compras/relatorios/geral" element={<ProtectedRoute element={RelatorioGeral} />} />

          <Route path="/financas/caixa" element={<ProtectedRoute element={ControleCaixa} />} />
          <Route path="/financas/caixa/:id" element={<ProtectedRoute element={Caixa} />} />

          <Route path="/event" element={<ProtectedRoute element={EventBridge} />} />

          <Route path="/logistica/frete" element={<ProtectedRoute element={FreteLogistica} />} />

          <Route path="*" element={<ProtectedRoute element={NotFound} />} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}
