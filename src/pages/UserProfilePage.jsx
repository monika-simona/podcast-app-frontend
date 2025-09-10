import React, { useState, useContext, useEffect } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";
import Layout from "../components/Layout";
import Button from "../components/Button";
import InputField from "../components/InputField";

function UserProfilePage() {
  const { user, login, logout } = useContext(AuthContext);

  // Lokalni state za formu, inicijalno prazan
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Kada se učita user, popuni lokalni state
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPassword("");
    }
  }, [user]);

  const handleEditClick = () => {
    // inicijalizuj formu **samo kada se klikne edit**
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPassword("");
    }
    setEditing(true);
    setMessage("");
    setError("");
  };

  const handleCancel = () => {
    setEditing(false);
    setMessage("");
    setError("");
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPassword("");
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const token = sessionStorage.getItem("access_token");
      const res = await api.put(
        `/users/${user.id}`,
        { name, email, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      login(res.data.data);
      setEditing(false);
      setMessage("Profil uspešno ažuriran!");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.data?.message || "Greška prilikom ažuriranja.");
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
          border: "1px solid #c8c4c4ff",
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              label="Lozinka"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
