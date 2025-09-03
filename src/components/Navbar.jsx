import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function Navbar() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch (err) {
      console.error(err);
    }
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/">YourPodcast</Link>
        </div>

        <ul className={`menu ${menuOpen ? "menu-open" : ""}`}>
          <li>
            <Link to="/podcasts">Podcasts</Link>
          </li>
          <li>
            <Link to="/episodes">Episodes</Link>
          </li>

          {!user ? (
            <>
              <li>
                <Link to="/login">Prijava</Link>
              </li>
              <li>
                <Link to="/register">Registracija</Link>
              </li>
            </>
          ) : (
            <li className="user-dropdown">
              <span onClick={() => setMenuOpen(!menuOpen)}>{user.name}</span>
              {menuOpen && (
                <ul className="dropdown">
                  <li>
                    <Link
                      to="/profile"
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = "/profile";
                      }}
                    >
                      Moj profil
                    </Link>
                  </li>
                  {user.role === "author" && (
                    <li>
                      <Link to="/my-podcasts">Moji podkasti</Link>
                    </li>
                  )}
                  {user.role === "admin" && (
                    <>
                      <li>
                        <Link to="/admin">Admin stranica</Link>
                      </li>
                      <li>
                        <Link to="/statistics">Statistika</Link>
                      </li>
                    </>
                  )}
                  <li>
                    <button onClick={handleLogout}>Odjavi se</button>
                  </li>
                </ul>
              )}
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
