// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h2>Welcome to Loosia Frontend</h2>
      <Link to="/login">Login</Link> | <Link to="/products">View Products</Link>
    </div>
  );
}

export default HomePage;
