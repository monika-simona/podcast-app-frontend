import React, { useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import api from '../api';
import { useNavigate } from 'react-router-dom';


function RegisterPage() {
  const [name, setName] = useState('');         
  const [email, setEmail] = useState('');       
  const [password, setPassword] = useState(''); 
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  
  const navigate = useNavigate();

  const handleRegister = async () => {

    try {

      await api.post('/register', {
        name,
        email,
        password,
        password_confirmation: confirmPassword,
        role, // uzima vrednost iz select polja
      });

      navigate('/login');
      
    } catch (err) {
      console.error(err.response?.data || err);
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
      <label>
        Izaberite ulogu:
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="user">Korisnik</option>
          <option value="author">Autor</option>
        </select>
      </label>

      <Button onClick={handleRegister}>Registruj se</Button>
    </div>
  );
}

export default RegisterPage;
