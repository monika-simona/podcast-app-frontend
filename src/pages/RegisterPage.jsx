import React, { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import api from "../api";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post("/register", {
        name,
        email,
        password,
        password_confirmation: confirmPassword,
        role,
      });
      navigate("/login");
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

  return (
    <Layout>
      <div
        className="login-page"
        style={{ maxWidth: "400px", margin: "50px auto" }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          Registracija
        </h1>

        <InputField
          label="Ime"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Unesite ime"
        />
        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Unesite email"
        />
        <InputField
          label="Lozinka"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Unesite lozinku"
        />
        <InputField
          label="Potvrdi lozinku"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Ponovite lozinku"
        />

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Izaberite ulogu:
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          >
            <option value="user">Korisnik</option>
            <option value="author">Autor</option>
          </select>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <Button onClick={handleRegister}>Registruj se</Button>
          <Button onClick={() => navigate("/login")} className="cancel-btn">
            Prijavi se
          </Button>
        </div>
      </div>
    </Layout>
  );
}

export default RegisterPage;
