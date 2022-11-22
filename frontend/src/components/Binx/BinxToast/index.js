import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import ToastSquare from "../ToastSquare";

export function BinxToast({ show, setShow, variant, title, content }) {
  return (
    <Toast
      onClose={() => setShow(false)}
      show={show}
      delay={8000}
      autohide
      className="mt-4"
    >
      <Toast.Header>
        <ToastSquare variant={variant} />
        <strong className="me-auto">{title}</strong>
      </Toast.Header>
      <Toast.Body>{content}</Toast.Body>
    </Toast>
  );
}

export function BinxToastContainer(props) {
  return (
    <ToastContainer position={"top-end"} className="m-4 pt-4">
      {props.children}
    </ToastContainer>
  );
}
