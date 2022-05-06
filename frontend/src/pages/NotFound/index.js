import React from "react";
import { Link } from "react-router-dom";

import Menu from "../../components/Menu";
import { Container } from "react-bootstrap";

import notfound from "../../assets/notfound.svg";
import logoCorner from "../../assets/logo_corner.svg";

import "./styles.css";

function NotFound() {
  return (
    <>
      <Menu logged={true} />

      <Container fluid className="p-5 text-center">
        <img
          id="not-found-img"
          alt="Logo de página não encontrada"
          src={notfound}
        ></img>
        <h1 style={{ color: "#086EB6", marginTop: "20px" }}>
          Oops, página não encontrada
        </h1>
        <p style={{ marginTop: "20px" }}>
          Nosso robô não encontrou nenhum resultado para essa solicitação.
        </p>
        <p>
          Verifique se o endereço foi digitado corretamente, ou volte para a{" "}
          <Link to="/painel">página inicial.</Link>
        </p>
        <div id="footer">
          <Link to="/painel">
            <img src={logoCorner} alt="Logo do Binx" width="80%"></img>
          </Link>
        </div>
      </Container>
    </>
  );
}

export default NotFound;
