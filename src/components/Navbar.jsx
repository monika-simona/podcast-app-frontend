import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // čuvamo user-a u localStorage
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">Podcast</Link>
      </div>

      <div className="navbar-right">
        {!token ? (
          <>
            <Link to="/login">Prijava</Link>
            <Link to="/register">Registracija</Link>
          </>
        ) : (
          <div className="user-menu">
            <span>👤 {user?.name || "Moj nalog"}</span>
            <div className="dropdown">
              <button onClick={() => navigate("/profile")}>Moj profil</button>
              <button onClick={() => navigate("/my-podcasts")}>Moji podkasti</button>
              <button onClick={handleLogout}>Odjava</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
