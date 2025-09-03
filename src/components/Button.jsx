import React from "react";

// Dugme
function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <button type={type} onClick={onClick} className="btn btn-primary">
      {children}
    </button>
  );
}

export default Button;
