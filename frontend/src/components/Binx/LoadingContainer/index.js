import React from "react";

import CenterHorizontally from "../CenterHorizontally";
import CenterVertically from "../CenterVertically";

import { Spinner } from "react-bootstrap";

function LoadingContainer(props) {
  return (
    <>
      {props.loading && (
        <CenterHorizontally>
          <CenterVertically>
            <Spinner animation="grow" size="md" />
          </CenterVertically>
        </CenterHorizontally>
      )}

      {!props.loading && <>{props.children}</>}
    </>
  );
}

export default LoadingContainer;
