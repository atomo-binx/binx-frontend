import React from "react";

import { Button, Spinner } from "react-bootstrap";

function LoadingButton(props) {
  return (
    <>
      <div className={props.block ? "d-grid gap-2" : ""}>
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
      </div>
    </>
  );
}

export default LoadingButton;
