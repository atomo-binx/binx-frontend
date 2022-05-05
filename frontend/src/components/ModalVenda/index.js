import React, { useState, useEffect } from "react";

import {
  Modal,
  Button,
  Table,
} from "react-bootstrap";

import api from "../../services/api";

function ModalVenda(props) {
  // Informações do pedido de venda
  const {
    idpedidovenda,
    datavenda,
    idloja,
    idstatusvenda,
    cliente,
  } = props.sale;

  const [itensLoaded, setItensLoaded] = useState(false);

  // Controle do modal de pedido de venda
  const { showSale, handleClose, setShowSale } = props;

  // Informações dos itens do pedido de venda
  const [itens, setItens] = useState();

  // Busca por itens presentes no pedido de venda em específico
  useEffect(() => {
    loadItens();
  }, [idpedidovenda]);

  const loadItens = async () => {
    await api
      .get(`/vendaproduto/${idpedidovenda}`)
      .then((res) => {
        setItens(res.data);
        setItensLoaded(true);
      })
      .catch((error) => {
        console.log("Erro ao adquirir itens presentes no pedido de venda");
        console.log(error.message);
      });
  };

  return (
    <>
      <Modal Modal show={showSale} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {idpedidovenda} - {cliente}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {itensLoaded && (
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Descrição</th>
                  <th>Qntd.</th>
                </tr>
              </thead>
              <tbody>
                {itens.map((item) => (
                  <tr key={item.idsku}>
                    <td style={{ width: "2%" }}>{item.idsku}</td>
                    <td style={{ width: "45%" }}>{item.nome}</td>
                    <td style={{ width: "4%" }}>{item.quantidade}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-success">Abrir em uma Guia Separada</Button>
          <Button variant="secondary" onClick={() => setShowSale(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalVenda;
