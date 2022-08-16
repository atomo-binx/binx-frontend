import React, { useState } from "react";

import { Modal, Button, Alert } from "react-bootstrap";

import api from "../../../services/api";

function ModalExportarBinxBling(props) {
  const { showExport, handleClose, setShowExport, objExportar } = props;

  const [exportando, setExportando] = useState(false);

  const exportar = async () => {
    setExportando(true);

    await api
      .post("exportarbinxbling", { exportar: objExportar })
      .then(() => {
        console.log("Exportação dos dados para o Binx e Bling iniciada");
      })
      .catch(() => {
        console.log("Erro ao exportar dados para o Binx e Bling");
        setExportando(false);
      });
  };

  return (
    <>
      <Modal Modal show={showExport} onHide={handleClose} centered size="md">
        <Modal.Header closeButton>
          <Modal.Title>Exportar Análise para o Binx e Bling</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {!exportando && (
            <Alert variant="warning">
              Ao exportar a análise, os valores de estoque mínimo, máximo e
              curva serão sobrescritos, confira os parâmetros utilizados.
            </Alert>
          )}
          {exportando && (
            <Alert variant="success" className="">
              O procedimento de exportação foi iniciado e está sendo executado
              em segundo plano, e pode levar vários minutos para ser concluído.
            </Alert>
          )}

          <Alert variant="secondary">
            Ainda não é possível realizar a exportação para o Bling, a
            exportação será realiza apenas para o Binx e afetará apenas as
            informações no dashboard de compras.
          </Alert>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="primary"
            disabled={exportando ? true : false}
            onClick={exportar}
          >
            Exportar
          </Button>
          <Button variant="secondary" onClick={() => setShowExport(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalExportarBinxBling;
