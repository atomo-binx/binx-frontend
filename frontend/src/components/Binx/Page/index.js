import React from "react";
import { Row } from "react-bootstrap";

function Page(props) {
  return <Row className="m-0 pt-4">{props.children}</Row>;
}

export default Page;
