// src/pages/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Gọi API backend => /api/user/login
      const res = await axios.post('http://localhost:3000/api/user/login', {
        username,
        password
      });
      if (res.data.success) {
        const token = res.data.token;
        // Lưu token localStorage
        localStorage.setItem('token', token);
        alert('Login success');
        // Chuyển hướng sang /products hoặc /admin
        window.location.href = '/products';
      } else {
        alert(res.data.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      alert('Error login');
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
