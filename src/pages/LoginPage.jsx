import React from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import {useState} from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import Layout from "../components/Layout";



function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const navigate = useNavigate();


  //za prijavljivanje
  const handleLogin = async () => {
    try {
      //slanje zahteva
      const response = await api.post('/login', {email,password});

      const { access_token, user} = response.data;

      //cuvanje podataka

      sessionStorage.setItem('access_token', access_token);
      sessionStorage.setItem('user', JSON.stringify(user));

      navigate('/');

    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

  return (
    <Layout>
      <div className="login-page">
        <h1>Login</h1>
        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Unesite email"
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Unesite lozinku"
        />
        <Button onClick={handleLogin}>Prijavi se</Button>
      </div>
    </Layout>
  );
}

export default LoginPage;
