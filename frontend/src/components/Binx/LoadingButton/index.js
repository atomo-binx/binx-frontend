import React from "react";

import { Button, Spinner } from "react-bootstrap";

function LoadingButton(props) {
  return (
    <>
      <Button {...props}>
        {props.loading && (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        )}
        {!props.loading && <>{props.children}</>}
      </Button>
    </>
  );
}

export default LoadingButton;
