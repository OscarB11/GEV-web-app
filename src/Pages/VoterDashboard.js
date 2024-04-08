import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Css/VoterDashboard.css";

const VoterDashboard = () => {
    const [userData, setUserData] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [selectedParty, setSelectedParty] = useState("");
    const navigate = useNavigate();
    const [voterId, setVoterId] = useState("");  // State to store the voter ID

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Fetch user data
                const response = await fetch('/get-user-data');
                const userData = await response.json();

                if (userData.success) {
                    // Set user data in state
                    setUserData(userData.userData);
                } else {
                    // Handle user data retrieval failure
                    console.error('User data retrieval failed:', userData.error);
                }
            } catch (error) {
                console.error('Error during user data retrieval:', error);
            }
        };

        // Fetch user data when component mounts
        fetchUserData();
    }, []);

    const handleSelect = (id) => {
        // Handle candidate selection logic
    };

    const handleSubmit = () => {
        // Handle vote submission logic
    };

    const handleSignOut = () => {
        // Handle sign-out logic
        navigate("/");
    };

    return (
        <div className="voter-dashboard-container">
            <nav className="voter-dashboard-nav">
                <h1>Voter Dashboard</h1>
                <div className="voter-dashboard-nav-buttons">
                    <Link to="/profile" className="voter-dashboard-profile-button">
                        Your Profile
                    </Link>
                    <Link to="/signout" className="voter-dashboard-signout-button">
                        Sign <br /> Out
                    </Link>
                </div>
            </nav>

            <main className="voter-dashboard-main">


                <div className="voter-dashboard-label">
                </div>

                <div className="voter-id-display">
                    <p>Voter ID: {voterId}  </p>
                    <p>Voter ID: {userData?.voter_id}</p>


                </div>

                <h2>Select Your Candidate</h2>
                <p>
                    Welcome to the voter dashboard. Here you can cast your vote for the
                    candidate of your choice. Please note that you can only vote once and
                    you cannot change your vote after submission.
                </p>

                <div className="voter-dashboard-parties">
                    <div className="voter-dashboard-party blue">Blue Party</div>
                    <div className="voter-dashboard-party red">Red Party</div>
                    <div className="voter-dashboard-party yellow">Yellow Party</div>
                    <div className="voter-dashboard-party independent">Independent*</div>
                </div>

                <div className="voter-dashboard-dropdown-container">
                    <label htmlFor="partyDropdown">Select Party:</label>
                    <select
                        id="partyDropdown"
                        className="voter-dashboard-party-dropdown"
                        value={selectedParty}
                    >
                        <option value="">All Parties</option>
                        <option value="Blue Party">Blue Party</option>
                        <option value="Red Party">Red Party</option>
                        <option value="Yellow Party">Yellow Party</option>
                        <option value="Independent">Independent*</option>
                    </select>
                </div>

                <button
                    className="voter-dashboard-submit-button"
                    onClick={handleSubmit}
                    disabled={submitted}
                >
                    Submit Vote
                </button>
            </main>
        </div>
    );
};

export default VoterDashboard;
