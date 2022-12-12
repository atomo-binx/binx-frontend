import React, { forwardRef, useState } from "react";

import { Dropdown, Form } from "react-bootstrap";

function DropSearch() {
  const [value, setValue] = useState("");

  const CustomToggle = forwardRef(
    ({ children, onClick, onChange, value }, ref) => (
      <Form.Control
        type="text"
        size="sm"
        ref={ref}
        onClick={(e) => onClick(e)}
        value={value}
        onChange={(e) => onChange(e)}
      />
    )
  );

  CustomToggle.displayName = "CustomToggle";

  const CustomMenu = forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value)
            )}
          </ul>
        </div>
      );
    }
  );

  CustomMenu.displayName = "CustomMenu";

  return (
    <Dropdown>
      <Dropdown.Toggle
        as={CustomToggle}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />

      <Dropdown.Menu>
        <Dropdown.Item eventKey="1">Red</Dropdown.Item>
        <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
        <Dropdown.Item eventKey="3">Orange</Dropdown.Item>
        <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropSearch;
