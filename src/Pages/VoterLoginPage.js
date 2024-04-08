// src/pages/VoterLoginPage.js
import React, { useState } from 'react';
import '../Css/VoterLoginPage.css';
import { useNavigate } from 'react-router-dom';



const VoterLoginPage = () => {
    const navigate = useNavigate(); // Hook for navigation
    const [voterId, setVoterId] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [userData, setUserData] = useState(null);



    const handleLogin = async () => {
        try {

            // Perform authentication logic here (e.g., check credentials)
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    voterId,
                    password
                }),
            });

            const result = await response.json();

            if (result.success) {
                // Set user data in state
                setUserData(result.userData);
                navigate(`/VoterDashboard/${voterId}`);



                console.log('log in user data?', userData);

                // Authentication successful, redirect to the dashboard or next page
                navigate('/VoterDashboard');
                console.log('log in user data?', userData);

            } else {
                // Authentication failed, display error message
                setErrorMessage(result.error || 'Invalid username or password.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage('Error during login.');
        }
    };

    const getSHA256 = async (data) => {
        try {
            const response = await fetch('http://localhost:3001/get-sha256', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data,
                }),
            });

            const result = await response.json();

            if (result.success) {
                return result.hashedData;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error fetching SHA-256 hash:', error);
            return null;
        }
    };
    const handleForgotPassword = () => {
        // Add logic for handling forgot password action
        // For example, redirect to a forgot password page or show a modal
        alert('Forgot Password clicked');
    };

    return (
        <div className="login-container d-flex align-items-center justify-content-center">
            <div className="login-form">
                <h1 className="text-center mb-4">Voter Login Page</h1>
                <form>
                    <div className="mb-3">
                        <input
                            type="email"
                            id="voterId"
                            className="form-control"
                            placeholder="Voter ID (Email)"
                            value={voterId}
                            onChange={(e) => setVoterId(e.target.value)}
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
                            type="button"
                            className="login-button"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                    </div>

                    <div className="mb-3">
                        <button
                            type="button"
                            className="forgot-password-button"
                            onClick={handleForgotPassword}
                        >
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

export default VoterLoginPage;
