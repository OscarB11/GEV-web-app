// src/pages/VoterRegPage.js
import React, { useEffect, useState, useRef } from 'react';
import '../Css/VoterRegPage.css';
import {Html5QrcodeScanner} from "html5-qrcode";
import { Link, useNavigate } from 'react-router-dom';


const VoterRegPage = () => {
    const navigate = useNavigate(); // Hook for navigation
    const readerRef = useRef(null);
    const [scanResult, setScanResult] = useState(null);

    const [voterId, setVoterId] = useState('');
    const [fullName, setFullName] = useState('');
    const [dob, setDOB] = useState('');
    const [password, setPassword] = useState('');
    const [constituency, setConstituency] = useState('');
    const [uvc, setUVC] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const readerElement = readerRef.current;
        // Ensure that the element with ID "reader" exists before rendering the scanner
        if (!readerElement) {
            console.error('Element with ID "reader" not found.');
            return;
        }
        const scanner =  new Html5QrcodeScanner('reader',{
            qrbox: {
                width:250,
                height: 150,
            },
            fps: 10,
        });
        scanner.render(success, error);
        function success(result){
            setScanResult(result);
            scanner.clear();

        }        function error(err){
            console.warn(err);

        }
        return () => {
            if (scanner) {
                scanner.clear();
            }
        };

    },[]);


    useEffect(() => {
        // Set the scanned result in the UVC field
        if (scanResult) {
            setUVC(scanResult);
        }
    }, [scanResult]);


    const handleRegister = async () => {
        // Validate each field
        if (!voterId || !fullName || !dob || !password || !constituency || !uvc) {
            setErrorMessage('All fields must be filled before registration.');
            return;
        }

        // Convert the user-entered constituency to its corresponding ID
        const constituencyId = await getConstituencyId(constituency);

        if (!constituencyId) {
            setErrorMessage('Invalid Constituency');
            return;
        }

        // Additional validations for fields (you can customize this based on your requirements)
        if (password.length < 6) {
            setErrorMessage('Password must be at least 6 characters long.');
            return;
        }

        // Perform voter registration logic here
        try {
            const response = await fetch('http://localhost:3001/register-voter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    voterId,
                    fullName,
                    dob,
                    password,
                    constituency: constituencyId,
                    uvc,
                }),
            });

            const result = await response.json();

            if (result.success) {
                // Registration successful, navigate to confirmation page
                navigate('/RegConfirm');
            } else {
                // Registration failed, display error message
                setErrorMessage(result.error || 'Error in voter registration.');
            }
        } catch (error) {
            console.error('Error registering voter:', error);
            setErrorMessage('Error in voter registration.');
        }
    };


    const getConstituencyId = async (constituencyName) => {
        try {
            const response = await fetch(`http://localhost:3001/get-constituency-id?name=${constituencyName}`);
            const result = await response.json();

            if (result.success) {
                return result.constituencyId;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error fetching constituency ID:', error);
            return null;
        }
    };



    return (
        <div className="voter-reg-container d-flex align-items-center justify-content-center">
            <div className="voter-reg-form">
                <h1 className="text-center mb-4">Voter Registration Page</h1>
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
                            type="text"
                            id="fullName"
                            className="form-control"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="date"
                            id="dob"
                            className="form-control"
                            placeholder="Date of Birth"
                            value={dob}
                            onChange={(e) => setDOB(e.target.value)}
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
                        <input
                            type="text"
                            id="constituency"
                            className="form-control"
                            placeholder="Constituency"
                            value={constituency}
                            onChange={(e) => setConstituency(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            id="uvc"
                            className="form-control"
                            placeholder="Unique Voter Code (UVC)"
                            value={uvc}
                            onChange={(e) => setUVC(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <button
                            type="button"
                            className="btn btn-primary btn-block"
                            onClick={handleRegister}
                        >
                            Register
                        </button>
                    </div>


                    <div className="mb-3">
                        <button
                            type="button"
                            className="btn btn-primary btn-block"

                        >
                            Scan QR Code
                        </button>
                    </div>

                    {scanResult ? (
                        <div>Success: <a href={'http://' + scanResult}>{scanResult}</a></div>
                    ) : (
                        <div ref={readerRef} id="reader"></div>

                    )}
                </form>

                {errorMessage && (
                    <p className="error-message mt-3 text-danger">{errorMessage}</p>
                )}
            </div>
        </div>
    );
};

export default VoterRegPage;
