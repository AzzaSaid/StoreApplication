import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AdminHeader({ admin, setAdmin }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    setAdmin(null);
    navigate('/admin/login');
  };
  return (
    <header>
      <nav>
        <Link to="/admin">Home</Link> | <Link to="/admin/manage-items">Manage Items</Link> | 
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <div>Hello, {admin.username}!</div>
    </header>
  );
}
export default AdminHeader;