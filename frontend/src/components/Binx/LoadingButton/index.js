import React from "react";
import { Button, Spinner } from "react-bootstrap";

function LoadingButton(props) {
  const { block, loading, LeftIcon, RightIcon, iconSize, ...forward } = props;

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
          {!loading && (
            <>
              <div className="d-flex justify-content-center">
                {LeftIcon && (
                  <div className="mx-2">
                    <LeftIcon size={iconSize} />
                  </div>
                )}
                {props.children}
                {RightIcon && (
                  <div className="mx-2">
                    <LeftIcon size={iconSize} />
                  </div>
                )}
              </div>
            </>
          )}
        </Button>
      </div>
    </>
  );
}

export default LoadingButton;
