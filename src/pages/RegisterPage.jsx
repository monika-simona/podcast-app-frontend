import React, { useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';

function RegisterPage() {
  const [name, setName] = useState('');         // ime korisnika
  const [email, setEmail] = useState('');       // email
  const [password, setPassword] = useState(''); // lozinka
  const [confirmPassword, setConfirmPassword] = useState(''); // potvrda lozinke
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setMessage("⚠️ Lozinke se ne poklapaju!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); // odmah ulogujemo usera
        setMessage("✅ Uspešna registracija!");
      } else {
        setMessage("⚠️ Greška: " + (data.message || "Proverite podatke"));
      }
    } catch (err) {
      setMessage("⚠️ Došlo je do greške: " + err.message);
    }
  };

  return (
    <div className='register-page'>
      <h1>Registracija</h1>
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
      <Button onClick={handleRegister}>Registruj se</Button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default RegisterPage;
