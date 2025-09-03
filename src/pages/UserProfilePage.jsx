import React, { useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";
import Layout from "../components/Layout";
import Button from "../components/Button";
import InputField from "../components/InputField";

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
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
      const token = sessionStorage.getItem("access_token");
      const res = await api.put(`/users/${user.id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      login(res.data);
      setEditing(false);
      setMessage("Profil uspešno ažuriran!");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Greška prilikom ažuriranja.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Da li si siguran/na da želiš da obrišeš nalog?")) {
      try {
        const token = sessionStorage.getItem("access_token");
        await api.delete(`/user`, {
          headers: { Authorization: `Bearer ${token}` },
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
    <Layout>
      <div
        style={{
          maxWidth: "500px",
          margin: "20px auto",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
          Moj profil
        </h2>

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        {message && (
          <p style={{ color: "green", textAlign: "center" }}>{message}</p>
        )}

        {!editing ? (
          <div>
            <p>
              <strong>Ime:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Uloga:</strong> {user.role}
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "20px",
                flexWrap: "wrap",
              }}
            >
              <Button onClick={handleEditClick}>Izmeni profil</Button>
              <Button
                onClick={handleDeleteAccount}
                className="bg-red-500 hover:bg-red-600"
              >
                Obriši nalog
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <InputField
              label="Ime"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
            <InputField
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <InputField
              label="Lozinka"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ostavi prazno da se ne menja"
            />

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "10px",
                flexWrap: "wrap",
              }}
            >
              <Button onClick={handleSave} disabled={loading}>
                {loading ? "Čuvanje..." : "Sačuvaj"}
              </Button>
              <Button
                onClick={handleCancel}
                disabled={loading}
                className="bg-gray-500 hover:bg-gray-600"
              >
                Otkaži
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default UserProfilePage;
