import React, { useState } from "react";
import styled from "styled-components";

import LoadingButton from "../../Binx/LoadingButton";
import Separator from "../../Binx/Separator";
import OffcanvasFooter from "../../Binx/OffcanvasFooter";

import {
  Offcanvas,
  Row,
  Table,
  Form,
  Col,
  Container,
  Button,
} from "react-bootstrap";

import { BsTrash, BsPlus } from "react-icons/bs";

const RemoveIcon = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

function OffcanvasFecharCaixa(props) {
  const { show, setShow, valores } = props;

  const [formasPagamento, setFormasPagamento] = useState([
    { select: "0", valor: 0 },
  ]);

  const handleClose = () => {
    setShow(false);
  };

  const adicionarPagamento = () => {
    setFormasPagamento([...formasPagamento, { select: "0", valor: 0 }]);
  };

  const removerPagamento = (idx) => {
    const pagamentos = formasPagamento;
    pagamentos.splice(idx, 1);
    setFormasPagamento([...pagamentos]);
  };

  const selecionaPagamento = (e, idx) => {
    const pagamentos = formasPagamento;
    pagamentos[idx].select = e.target.value;
    setFormasPagamento([...pagamentos]);
  };

  const definirValor = (e, idx) => {};

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end" md={6}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Fechar Caixa</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Row className="m-0">
          <h5 className="text-muted">Formas de Pagamento</h5>
          <Table>
            <thead>
              <tr>
                <th>Forma de Pagamento</th>
                <th>Valor</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {formasPagamento.map((pagamento, idx) => (
                <tr key={idx}>
                  <td>
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Select
                        size="sm"
                        aria-label="Default select example"
                        value={formasPagamento[idx].select}
                        onChange={(e) => selecionaPagamento(e, idx)}
                      >
                        <option value="0">Selecionar</option>
                        <option value="1296354">
                          Loja - Cartão de Crédito
                        </option>
                        <option value="1296355">Loja - Cartão de Débito</option>
                        <option value="1296356">Loja - Dinheiro</option>
                        <option value="1297718">Loja - Transferência </option>
                        <option value="2179624">Pix - Bling Conta</option>
                      </Form.Select>
                    </Form.Group>
                  </td>
                  <td style={{ width: "100px" }}>
                    <Form.Group>
                      <Form.Control size="sm" type="text" placeholder="0,00" />
                    </Form.Group>
                  </td>
                  <td>
                    <RemoveIcon className="d-flex justify-content-center pt-1">
                      <BsTrash
                        color="red"
                        size="20px"
                        onClick={() => removerPagamento(idx)}
                      />
                    </RemoveIcon>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Container fluid className="m-0 p-0 d-flex justify-content-end">
            <Button
              size="sm"
              variant="outline-success"
              onClick={adicionarPagamento}
            >
              <BsPlus />
              Adicionar forma de pagamento
            </Button>
          </Container>
        </Row>
        <div className="my-5"></div>
        <Row className="m-0">
          <h5 className="text-muted">Valores Registrados</h5>
          <Table hover>
            <thead>
              <tr>
                <th>Forma de Pagamento</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {valores.map((valor) => (
                <tr key={valor.formaPagamento}>
                  <td>{valor.formaPagamento}</td>
                  <td>R$ {valor.registrado}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      </Offcanvas.Body>
      <OffcanvasFooter>
        <Separator />
        <div className="d-flex justify-content-end mt-3">
          <div className="mx-3">
            <LoadingButton block width={100} variant="outline-secondary">
              Cancelar
            </LoadingButton>
          </div>
          <div>
            <LoadingButton block width={100} variant="success">
              Salvar
            </LoadingButton>
          </div>
        </div>
      </OffcanvasFooter>
    </Offcanvas>
  );
}

export default OffcanvasFecharCaixa;
