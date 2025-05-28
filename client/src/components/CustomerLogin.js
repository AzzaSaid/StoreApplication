import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CustomerLogin = ({ setCustomer }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/customer/login', { email, password });
            // Handle successful login (e.g., redirect to customer dashboard)
            console.log(response.data);
            navigate('/home')
        } catch (error) {
            console.error('Login failed:', error);
            // Handle login failure (e.g., show error message)
        }
    };

    return (
        <div>
            <h2>Customer Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <Link to="/customer/register">Register here</Link>
            </p>
        </div>
    );
};

export default CustomerLogin;