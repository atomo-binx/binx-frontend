import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../../../services/amplify";
import styled from "styled-components";

import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { BsPersonCircle } from "react-icons/bs";

import NavbarLogo from "../../../assets/logo_3.png";

import { AuthContext } from "../../../contexts/auth";

const UserDropdown = styled.div`
  & .dropdown-user .dropdown-toggle.nav-link::after {
    display: none;
  }
`;

const UserTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 15px;
`;

const UserName = styled.div`
  margin-left: 10px;
`;

const UserIcon = styled.div`
  margin: 0px;
`;

function Menu(props) {
  const navigate = useNavigate();
  const userContext = useContext(AuthContext);

  const [vendasDrop, setVendasDrop] = useState(false);
  const [comprasDrop, setComprasDrop] = useState(false);
  const [expedicaoDrop, setExpedicaoDrop] = useState(false);
  const [cadastrosDrop, setCadastroDrop] = useState(false);
  const [financasDrop, setFinancasDrop] = useState(false);
  const [componexDrop, setComponexDrop] = useState(false);

  const [userDrop, setUserDrop] = useState(false);

  const [vendasActive, setVendasActive] = useState(false);
  const [comprasActive, setComprasActive] = useState(false);
  const [expedicaoActive, setExpedicaoActive] = useState(false);
  const [cadastrosActive, setCadastrosActive] = useState(false);
  const [financasActive, setFinancasActive] = useState(false);
  const [componexActive, setComponexActive] = useState(false);

  useEffect(() => {
    const pathname = window.location.pathname;

    if (pathname.includes("vendas")) setVendasActive(true);
    if (pathname.includes("compras")) setComprasActive(true);
    if (pathname.includes("expedicao")) setExpedicaoActive(true);
    if (pathname.includes("cadastros")) setCadastrosActive(true);
    if (pathname.includes("financas")) setFinancasActive(true);
    if (pathname.includes("componex")) setComponexActive(true);
  }, []);

  const signOut = () => {
    Auth.signOut()
      .catch((error) => {
        console.log("Erro ao realizar logout:", error.message);
      })
      .finally(() => {
        navigate("/");
      });
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container fluid>
          <Link to="/painel" className="m-0 p-0">
            <Navbar.Brand className="">
              <img src={NavbarLogo} width="70" alt="Logo Binx" />
            </Navbar.Brand>
          </Link>

          {props.logged && (
            <>
              <Navbar.Toggle />
              <Navbar.Collapse>
                <Nav className="mr-auto" navbarScroll>
                  {/* Dropdown de Vendas */}
                  <NavDropdown
                    title="Vendas"
                    active={vendasActive}
                    show={vendasDrop}
                    onMouseEnter={() => setVendasDrop(true)}
                    onMouseLeave={() => setVendasDrop(false)}
                  >
                    <NavDropdown.Item
                      as={Link}
                      href="/vendas/frete"
                      to="/vendas/frete"
                    >
                      Cálculo de Frete
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      href="/vendas/margem"
                      to="/vendas/margem"
                    >
                      Cálculo de Margem
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      href="/vendas/prospeccao"
                      to="/vendas/prospeccao"
                    >
                      Prospecção de Clientes
                    </NavDropdown.Item>
                  </NavDropdown>

                  {/* Dropdown de Compras */}
                  <NavDropdown
                    title="Compras"
                    show={comprasDrop}
                    active={comprasActive}
                    onMouseEnter={() => setComprasDrop(!comprasDrop)}
                    onMouseLeave={() => setComprasDrop(false)}
                  >
                    <NavDropdown.Item
                      as={Link}
                      href="/compras/dashboard"
                      to="/compras/dashboard"
                    >
                      Dashboard de Compras
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      href="/compras/relatorios"
                      to="/compras/relatorios"
                    >
                      Relatórios
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      href="/compras/curva"
                      to="/compras/curva"
                    >
                      Análise de Curva
                    </NavDropdown.Item>
                  </NavDropdown>

                  {/* Dropdown da Expedição */}
                  <NavDropdown
                    title="Expedição"
                    show={expedicaoDrop}
                    active={expedicaoActive}
                    onMouseEnter={() => setExpedicaoDrop(!expedicaoDrop)}
                    onMouseLeave={() => setExpedicaoDrop(false)}
                  >
                    <NavDropdown.Item
                      as={Link}
                      href="/expedicao/aprovar"
                      to="/expedicao/aprovar"
                    >
                      Aprovação de Pedidos
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      href="/expedicao/etiquetas"
                      to="/expedicao/etiquetas"
                    >
                      Impressão de Etiquetas
                    </NavDropdown.Item>
                  </NavDropdown>

                  {/* Dropdown da Cadastros */}
                  <NavDropdown
                    title="Cadastros"
                    show={cadastrosDrop}
                    active={cadastrosActive}
                    onMouseEnter={() => setCadastroDrop(!cadastrosDrop)}
                    onMouseLeave={() => setCadastroDrop(false)}
                  >
                    <NavDropdown.Item
                      as={Link}
                      href="/cadastros/produtos"
                      to="/cadastros/produtos"
                    >
                      Produtos
                    </NavDropdown.Item>
                  </NavDropdown>

                  {/* Dropdown da Financeiro */}
                  <NavDropdown
                    title="Finanças"
                    show={financasDrop}
                    active={financasActive}
                    onMouseEnter={() => setFinancasDrop(!financasDrop)}
                    onMouseLeave={() => setFinancasDrop(false)}
                  >
                    <NavDropdown.Item
                      as={Link}
                      href="/financas/caixa"
                      to="/financas/caixa"
                    >
                      Controle de Caixa
                    </NavDropdown.Item>
                  </NavDropdown>

                  {/* Dropdown da Componex */}
                  <NavDropdown
                    title="Componex"
                    show={componexDrop}
                    active={componexActive}
                    onMouseEnter={() => setComponexDrop(!componexDrop)}
                    onMouseLeave={() => setComponexDrop(false)}
                  >
                    <NavDropdown.Item
                      as={Link}
                      href="/componex/tabela"
                      to="/componex/tabela"
                    >
                      Tabela de Especificações
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      href="/componex/exportar"
                      to="/componex/exportar"
                    >
                      Exportar Cadastro
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>

              <Navbar.Collapse className="justify-content-end">
                <Nav navbarScroll>
                  <UserDropdown>
                    <NavDropdown
                      className="dropdown-user"
                      title={
                        <UserTitle>
                          <UserIcon>
                            <BsPersonCircle size={25} />
                          </UserIcon>
                          <UserName>{userContext.userName}</UserName>
                        </UserTitle>
                      }
                      show={userDrop}
                      onMouseEnter={() => setUserDrop(true)}
                      onMouseLeave={() => setUserDrop(false)}
                    >
                      <NavDropdown.Item onClick={signOut}>
                        Sair
                      </NavDropdown.Item>
                    </NavDropdown>
                  </UserDropdown>
                </Nav>
              </Navbar.Collapse>
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default Menu;
