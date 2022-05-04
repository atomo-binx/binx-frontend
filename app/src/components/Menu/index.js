import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../../services/amplify";

import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { BsPersonCircle } from "react-icons/bs";

import NavbarLogo from "../../assets/logo_3.png";

import AuthContext from "../../contexts/auth";

import "./styles.css";

function Menu(props) {
  const navigate = useNavigate();

  const [vendasDrop, setVendasDrop] = useState(false);
  const [comprasDrop, setComprasDrop] = useState(false);
  const [expedicaoDrop, setExpedicaoDrop] = useState(false);
  const [relatoriosDrop, setRelatoriosDrop] = useState(false);
  const [cadastrosDrop, setCadastrosDrops] = useState(false);
  const [userDrop, setUserDrop] = useState(false);

  const [vendasActive, setVendasActive] = useState(false);
  const [comprasActive, setComprasActive] = useState(false);
  const [expedicaoActive, setExpedicaoActive] = useState(false);
  const [relatoriosActive, setRelatoriosActive] = useState(false);
  const [cadastrosActive, setCadastrosActive] = useState(false);

  const [userName, setUserName] = useState("");

  const userContext = useContext(AuthContext);

  useEffect(() => {
    const pathname = window.location.pathname;

    if (pathname.includes("vendas")) setVendasActive(true);
    if (pathname.includes("compras")) setComprasActive(true);
    if (pathname.includes("expedicao")) setExpedicaoActive(true);
    if (pathname.includes("relatorios")) setRelatoriosActive(true);
    if (pathname.includes("cadastros")) setCadastrosActive(true);

    if (userContext) {
      setUserName(userContext.attributes["custom:displayname"]);
    } else {
      setUserName("Convidado");
    }
  }, [userContext]);

  const signOut = () => {
    Auth.signOut()
      .then((data) => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/");
      });
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container fluid>
          <Link to="/" className="m-0 p-0">
            <Navbar.Brand className="">
              <img src={NavbarLogo} width="70" alt="Logo Binx" />
            </Navbar.Brand>
          </Link>

          <Navbar.Toggle />

          {props.logged && (
            <>
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
                      href="/expedicao/aprovar"
                      to="/expedicao/aprovar"
                    >
                      Aprovação de Pedidos
                    </NavDropdown.Item>
                  </NavDropdown>

                  {/* Dropdown de Relatórios */}
                  <NavDropdown
                    title="Relatórios"
                    show={relatoriosDrop}
                    active={relatoriosActive}
                    onMouseEnter={() => setRelatoriosDrop(!relatoriosDrop)}
                    onMouseLeave={() => setRelatoriosDrop(false)}
                  >
                    <NavDropdown.Item
                      href="/relatorios/minmax"
                      to="/relatorios/minmax"
                    >
                      Estoque Mínimo e Máximo
                    </NavDropdown.Item>
                  </NavDropdown>

                  {/* Dropdown da Cadastros */}
                  <NavDropdown
                    title="Cadastros"
                    show={cadastrosDrop}
                    active={cadastrosActive}
                    onMouseEnter={() => setCadastrosDrops(!cadastrosDrop)}
                    onMouseLeave={() => setCadastrosDrops(false)}
                  >
                    <NavDropdown.Item
                      href="/cadastros/produtos"
                      to="/cadastros/produtos"
                    >
                      Produtos
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>

              <Navbar.Collapse className="justify-content-end">
                <Nav className="mr-auto" navbarScroll>
                  <BsPersonCircle />
                  <NavDropdown
                    className="dropdown-user"
                    title={
                      <div className="user-dropdown-div ">
                        <div className="m-0">
                          <BsPersonCircle size={25} />
                        </div>
                        <div className="user-name">{userName}</div>
                      </div>
                    }
                    show={userDrop}
                    onMouseEnter={() => setUserDrop(true)}
                    onMouseLeave={() => setUserDrop(false)}
                  >
                    <NavDropdown.Item onClick={signOut}>Sair</NavDropdown.Item>
                  </NavDropdown>
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
