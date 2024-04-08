// src/pages/HomePage.js
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import '../Css/HomePage.css';


const HomePage = () => {


    return (
        <div className="homepage-container">
            <header>
                <h1>Shangri-La Election Commission</h1>
                <p>Parliamentary Democracy General Election Voting System</p>
            </header>

            <section className="election-info">
                <h2>About the Election</h2>
                <p>
                    Shangri-La is a parliamentary democracy. The political party that wins an overall majority
                    in a General Election will form the new government. All eligible voters can choose one
                    candidate to serve as their Member of Parliament (MP) to represent them.
                </p>
                <p>
                    The candidate with the highest vote in a constituency becomes the MP, regardless of
                    achieving a majority (50% or more) of the votes cast.
                </p>
            </section>

            <section className="action-buttons">
                <Link to="/VoterLoginPage" className="button-card user-login">
                    <p>Voter Login</p>
                </Link>
                <Link to="/AdminLoginPage" className="button-card admin-login">
                    <p>Admin Login</p>
                </Link>
                <Link to="/VoterRegPage" className="button-card register">
                    <p>Register To Vote</p>
                </Link>
            </section>



            <footer>
                <p>Made by Best Oscar-Osifo Student Number: BOO12</p>
            </footer>
        </div>
    );
};

export default HomePage;
