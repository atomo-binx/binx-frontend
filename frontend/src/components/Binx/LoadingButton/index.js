import React from "react";
import { Button, Spinner } from "react-bootstrap";

function LoadingButton(props) {
  const { block, loading, LeftIcon, iconSize, ...forward } = props;

  return (
    <>
      <div
        className={block ? "d-grid gap-2" : ""}
        style={block ? { width: forward.width } : {}}
      >
        <Button {...forward}>
          {loading && (
            <div className="px-5">
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            </div>
          )}
          {!loading && <>{props.children}</>}
        </Button>
      </div>
    </>
  );
}

export default LoadingButton;
