import React from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import {useState} from 'react';


function LoginPage() {

  const [email, setEmail] = useState('');      // stanje za email
  const [password, setPassword] = useState(''); // stanje za password

  //za prijavljivanje
  const handleLogin = () => 
  { 
    console.log('Email:', email, 'Password:', password);
  };

  return (
    <div className='login-page'>
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
  );
}

export default LoginPage;
