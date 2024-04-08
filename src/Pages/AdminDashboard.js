// AdminDashboard.js
import React, { useState, useEffect, useRef } from "react";

import { Link, useNavigate } from "react-router-dom";
import "../Css/AdminDashboard.css";

import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';




const AdminDashboard = () => {
    // State and functions for controlling election state and results
    const [userData, setUserData] = useState(null);
    const [selectedParty, setSelectedParty] = useState("");

    const [electionStarted, setElectionStarted] = useState(false);
    const [electionResults, setElectionResults] = useState([]);
    const [constituencies, setConstituencies] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchRealTimeResults = async () => {
            try {
                const response = await fetch('http://localhost:3001/get-real-time-results');
                const data = await response.json();

                // Update election results state
                setElectionResults(data);
            } catch (error) {
                console.error('Error fetching real-time results:', error);
            }
        };

        // Fetch real-time results when component mounts
        fetchRealTimeResults();

        // Schedule fetching at intervals (e.g., every 30 seconds)
        const intervalId = setInterval(fetchRealTimeResults, 30000);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, []);




    const transformDataForChart = () => {
        const labels = electionResults.map((result) => result.candidate);
        const data = electionResults.map((result) => result.vote_count);

        return {
            labels: labels,
            datasets: [
                {
                    label: "Votes",
                    data: data,
                    backgroundColor: "rgba(75,192,192,0.6)", // Customize the bar color
                    borderColor: "rgba(75,192,192,1)",
                    borderWidth: 1,
                },
            ],
        };
    };

    // Define a function to create the chart
    const chartCanvasRef = useRef(null);



    const createChart = () => {
        // Use the ref to get the canvas element
        const canvas = chartCanvasRef.current;

        // Check if there's an existing chart instance and destroy it
        if (canvas.chart) {
            canvas.chart.destroy();
        }

        // Create a new chart on the canvas element
        canvas.chart = new Chart(canvas, {
            type: "bar",
            data: transformDataForChart(),
            options: {
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
            },
        });
    };



    // Use a useEffect hook to create the chart when the election results change
    useEffect(() => {
        if (electionResults.length > 0) {
            createChart();
        }
    }, [electionResults]); // Add electionResults as a dependency to run the effect when it changes




    // Function to start the election
    const startElection = () => {
        setElectionStarted(true);
        // Additional logic for starting the election
    };

    // Function to end the election and calculate results
    const endElection = () => {
        setElectionStarted(false);
        // Additional logic for ending the election and calculating results
    };

    // Placeholder function for announcing the winner
    const announceWinner = () => {
        // Additional logic for announcing the winner
    };

    // Placeholder function for declaring a "Hung Parliament"
    const declareHungParliament = () => {
        // Additional logic for declaring a "Hung Parliament"
    };

    // Placeholder function for updating election results
    const updateResults = () => {
        // Additional logic for updating election results
    };


    // UseEffect for updating results when electionResults changes
    useEffect(() => {
        updateResults();
    }, [electionResults]);

    return (
        <div className="admin-dashboard-container">
            <nav className="admin-dashboard-nav">
                <h1>Election Commission Dashboard</h1>
                <div className="admin-dashboard-nav-buttons">
                    <Link to="/profile" className="admin-dashboard-profile-button">
                        Your <br/>Profile
                    </Link>
                    <Link to="/signout" className="admin-dashboard-signout-button">
                        Sign <br/> Out
                    </Link>
                </div>
            </nav>

            <main className="admin-dashboard-main">
                <div className="admin-dashboard-election-controls">
                    {!electionStarted ? (
                        <button onClick={startElection}>Start Election</button>
                    ) : (
                        <button onClick={endElection}>End Election</button>
                    )}
                </div>

                <div className="admin-dashboard-election-results">
                    <h2>Real-time Election Results</h2>
                    {electionResults.length > 0 ? (
                        <div>
                            {/* Display real-time results here */}
                            {electionResults.map((result, index) => (
                                <div key={index}>
                                    <h3>{result.constituency_name}</h3>
                                    <ul>
                                        {/* Display candidate, party, and vote count */}
                                        <li>
                                            {result.candidate} ({result.party}): {result.vote_count} votes
                                        </li>
                                    </ul>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No election results available</p>
                    )}
                </div>


                <div className="admin-dashboard-chart">
                    <h2>Result Visualization</h2>
                    <canvas ref={chartCanvasRef} id="myChart" />


                </div>

                <div className="admin-dashboard-announcement">
                    {electionResults.length > 0 && (
                        <>
                            {announceWinner()}
                            {declareHungParliament()}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;




