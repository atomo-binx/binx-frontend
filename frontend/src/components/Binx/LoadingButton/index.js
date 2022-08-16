import React from "react";
import { Button, Spinner } from "react-bootstrap";

function LoadingButton(props) {
  const { block, loading, ...forward } = props;

  return (
    <>
      <div
        className={block ? "d-grid gap-2" : ""}
        style={block ? { width: forward.width } : {}}
      >
        <Button {...forward}>
          {loading && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
          {!loading && <>{props.children}</>}
        </Button>
      </div>
    </>
  );
}

export default LoadingButton;
