import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav>
      <Link to="/items">Items</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/orders">Orders</Link>
      <Link to="/add-item">Additems</Link>
      <Link to="/login">Logout</Link>
    </nav>
  );
}

export default Navbar;
