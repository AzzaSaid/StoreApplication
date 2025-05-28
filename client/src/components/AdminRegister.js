import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AdminRegister = () => {
    const [adminData, setAdminData] = useState({
        username: '',
        password: '',
        email: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdminData({
            ...adminData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/admin/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(adminData)
            });
            if (response.ok) {
                // Handle successful registration (e.g., redirect to login)
                alert('Admin Register Successfully')
                navigate('/admin/login');
            } else {
                // Handle errors (e.g., show error message)
                alert('Unsuccessfully Admin Registeration')
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Admin Registration</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" value={adminData.username} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={adminData.password} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={adminData.email} onChange={handleChange} required />
                </div>
                <button type="submit">Register</button>
            </form>
            <p>
                Already have an account? <Link to="/admin/login">Login here</Link>
            </p>
        </div>
    );
};

export default AdminRegister;