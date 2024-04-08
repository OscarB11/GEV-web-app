// src/pages/AdminLoginPage.js
import React, { useState } from 'react';
import '../Css/AdminLoginPage.css';
import { useNavigate } from 'react-router-dom';


const AdminLoginPage = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [adminId, setAdminId] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = () => {
        // Perform form validation
        if (!adminId || !password) {
            setErrorMessage('Both fields must be filled.');
            return;
        }

        // Perform authentication logic for admin login here
        // For simplicity, let's assume an error for demonstration
        setErrorMessage('Invalid admin credentials.');

        // Check if the credentials match the admin credentials
        const adminUsername = 'election@shangrila.gov.sr';
        const adminPassword = 'shangrila2024$';

        if (adminId === adminUsername && password === adminPassword) {
            // Clear error message on successful login
            setErrorMessage('');

            // Navigate to AdminDashboard upon successful login
            navigate('/AdminDashboard');
        }
    };

    const handleForgotPassword = () => {
        // Add logic for handling forgot password action for admin
        // For example, redirect to a forgot password page or show a modal
        alert('Admin Forgot Password clicked');
    };

    return (
        <div className="admin-login-container d-flex align-items-center justify-content-center">
            <div className="admin-login-form">
                <h1 className="text-center mb-4">Admin Login Page</h1>
                <form>
                    <div className="mb-3">
                        <input
                            type="text"
                            id="adminId"
                            className="form-control"
                            placeholder="Admin ID"
                            value={adminId}
                            onChange={(e) => setAdminId(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <button
                            className="admin-Login-button"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                    </div>

                    <div className="mb-3">
                        <button className="admin-forgot-password-button" onClick={handleForgotPassword}>
                            Forgot Password?
                        </button>
                    </div>
                </form>

                {errorMessage && (
                    <p className="error-message mt-3 text-danger">{errorMessage}</p>
                )}
            </div>
        </div>
    );
};

export default AdminLoginPage;
