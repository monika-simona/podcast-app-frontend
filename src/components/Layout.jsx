// src/components/Layout.jsx
import React from "react";

function Layout({ children }) {
  return (
    <div className="container d-flex flex-column align-items-center py-4">
      {/* Svi elementi će biti centrirani horizontalno */}
      {children}
    </div>
  );
}

export default Layout;
