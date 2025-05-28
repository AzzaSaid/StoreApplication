import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <header>
      <nav>
        <Link to="/">Home</Link> | <Link to="/items">Items</Link> | <Link to="/cart">Cart</Link> | 
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <div>Hello, {user.username}!</div>
    </header>
  );
}

export default Header;