import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const CustomerRegister = () => {
    const [customerData, setCustomerData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerData({
            ...customerData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/customer/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(customerData)
            });
            if (response.ok) {
                // Handle successful registration (e.g., redirect or show a message)
                alert('Customer Register Successfully')
                navigate('/customer-login');
            } else {
                // Handle errors (e.g., show an error message)
                alert('Unsuccessfully Customer Registeration')
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Customer Registration</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={customerData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={customerData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={customerData.password} onChange={handleChange} required />
                </div>
                <button type="submit">Register</button>
            </form>
            <p>
                Already have an account? <Link to="/customer/login">Login here</Link>
            </p>
        </div>
    );
};

export default CustomerRegister;