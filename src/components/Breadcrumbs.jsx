import React from 'react';
import { Link } from 'react-router-dom';

function Breadcrumbs({ paths }) {
  return (
    <nav className="breadcrumbs">
      {paths.map((path, index) => (
        <span key={index}>
          {path.link ? (
            <Link to={path.link}>{path.label}</Link>
          ) : (
            <span>{path.label}</span>
          )}
          {index < paths.length - 1 && " > "}
        </span>
      ))}
    </nav>
  );
}

export default Breadcrumbs;
