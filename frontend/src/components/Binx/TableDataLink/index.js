import React from "react";
import { useNavigate } from "react-router-dom";

function TableDataLink({ children, to }) {
  const navigate = useNavigate();

  return (
    <td role="button" onClick={() => navigate(to)}>
      {children}
    </td>
  );
}

export default TableDataLink;
