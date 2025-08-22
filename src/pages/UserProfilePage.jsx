import React, { useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button";

function UserProfilePage() {
  const { user, login, logout } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  });
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEditClick = () => {
    setFormData({ name: user.name, email: user.email, password: "" });
    setEditing(true);
    setMessage("");
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCancel = () => {
    setEditing(false);
    setMessage("");
    setError("");
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const token = sessionStorage.getItem('access_token');
      const res = await api.put(`/users/${user.id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      login(res.data);
      setEditing(false);
      setMessage("Profil uspešno ažuriran!");
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Greška prilikom ažuriranja.");
      } else {
        setError("Greška prilikom ažuriranja.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Da li si siguran/na da želiš da obrišeš nalog?")) {
      try {
        const token = sessionStorage.getItem('access_token');
        await api.delete(`/user`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("Nalog obrisan.");
        logout();
        window.location.href = "/login";
      } catch (err) {
        console.error(err);
        alert("Došlo je do greške prilikom brisanja naloga.");
      }
    }
  };

  if (!user) return <p>Učitavanje korisnika...</p>;

  return (
    <div>
      <h2>Moj profil</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

      {!editing ? (
        <div>
          <p><strong>Ime:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Uloga:</strong> {user.role}</p>
          <Button onClick={handleEditClick}>Izmeni profil</Button>
          <Button onClick={handleDeleteAccount} className="bg-red-500 hover:bg-red-600 mt-2">
            Obriši nalog
          </Button>
        </div>
      ) : (
        <div>
          <label>
            Ime:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
          <br />
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>
          <br />
          <label>
            Lozinka:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ostavi prazno da se ne menja"
            />
          </label>
          <br />
          <Button onClick={handleSave} disabled={loading}>{loading ? "Čuvanje..." : "Sačuvaj"}</Button>
          <Button onClick={handleCancel} disabled={loading}>Otkaži</Button>
        </div>
      )}
    </div>
  );
}

export default UserProfilePage;
