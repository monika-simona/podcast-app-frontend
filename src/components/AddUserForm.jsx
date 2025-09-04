import React, { useState } from "react";
import Button from "./Button";
import api from "../api";

function AddUserForm({ onClose, onUserAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert("Sva polja su obavezna!");
      return;
    }

    try {
      const token = sessionStorage.getItem("access_token");
      await api.post("users", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      onUserAdded(); // obnavlja listu korisnika
      onClose(); // zatvara formu
    } catch (err) {
      alert("Greška pri dodavanju korisnika.");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#1f1f1f",
          padding: "20px",
          borderRadius: "10px",
          width: "400px",
          color: "white",
        }}
      >
        <h3>Dodaj korisnika</h3>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <input
            type="text"
            name="name"
            placeholder="Ime"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Lozinka"
            value={formData.password}
            onChange={handleChange}
          />
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="user">Korisnik</option>
            <option value="creator">Kreator</option>
            <option value="admin">Admin</option>
          </select>

          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
          >
            <Button type="button" onClick={onClose}>
              Otkaži
            </Button>
            <Button type="submit">Sačuvaj</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUserForm;
