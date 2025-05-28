import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Welcome to the Login Page</h1>
            <button onClick={() => navigate('/admin/login')}>Login as Admin</button>
      <button onClick={() => navigate('/customer/login')}>Login as Customer</button>
        </div>
    );
};

export default MainPage;