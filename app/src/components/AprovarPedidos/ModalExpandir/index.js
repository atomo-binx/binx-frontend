import { React } from "react";

import BlingLogo from "../../../assets/bling_fundo_transparente.png";
import MagentoLogo from "../../../assets/magento_fundo_transparente.png";
import Calendario from "../../../assets/calendario2.png";

import {
  Modal,
  Button,
  ListGroup,
  Figure,
} from "react-bootstrap";

function ModalExpandir(props) {
  const { showModal, handleClose, setShowModal, tipoModal, pedidosModal } = props;

  return (
    <>
      <Modal Modal show={showModal} onHide={handleClose} centered size="md" scrollable>
        <Modal.Header closeButton>
          {tipoModal === "aprovar" && <Modal.Title>Pedidos para Aprovar</Modal.Title>}
          {tipoModal === "cancelar" && <Modal.Title>Pedidos para Cancelar</Modal.Title>}
          {tipoModal === "prazo" && (
            <Modal.Title>Cancelar por Falta de Pagamento</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {pedidosModal.map((pedido) => (
              <ListGroup.Item className="text-center" key={pedido["bling"]}>
                <Figure.Image
                  width={18}
                  alt="Logo Bling"
                  src={BlingLogo}
                  className="mx-3"
                />
                <span>{pedido["bling"]}</span>
                <Figure.Image
                  width={13}
                  alt="Logo Bling"
                  src={MagentoLogo}
                  className="mx-3"
                />
                <span>{pedido["magento"]}</span>
                {tipoModal === "prazo" && (
                  <>
                    <Figure.Image
                      width={15}
                      alt="Logo Calendário"
                      src={Calendario}
                      className="mx-3"
                    />
                    <span>{pedido["data"]}</span>
                  </>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalExpandir;
