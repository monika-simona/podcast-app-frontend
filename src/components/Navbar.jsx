import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () =>  {
    try {
      await api.post('/logout');
    } catch (err) {
    console.error(err);
    }
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/podcasts">Podcast</Link>
      </div>

      <div className="navbar-right">
        {!user ? (
          <>
            <Link to="/login">Prijava</Link>
            <Link to="/register">Registracija</Link>
          </>
        ) : (
          <div className="user-menu">
            
            {/*korisnikove informacije*/}
            <div className="user-info" onClick={() => setMenuOpen(!menuOpen)}>
              <span>{user.name}</span>
            </div>
            {menuOpen && (
              <div className="dropdown">
                <Link to="/profile">Moj profil</Link>

                {/* Ako je autor */}
                {user.role === 'author' && (
                  <>
                    <Link to="/my-podcasts">Moji podkasti</Link>
                  </>
                )}

                {/* Ako je admin */}
                {user.role === 'admin' && (
                  <>
                    <Link to="/admin/users">Upravljanje korisnicima</Link>
                    <Link to="/admin/podcasts">Kontrola podkasta</Link>
                  </>
                )}
                <button onClick={handleLogout}>Odjavi se</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
