// src/AppRouter.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import VoterLoginPage from "./Pages/VoterLoginPage";
import AdminLoginPage from "./Pages/AdminLoginPage";
import VoterRegPage from "./Pages/VoterRegPage";
import RegConfirm from "./Pages/RegConfirm";
import VoterDashboard from "./Pages/VoterDashboard";
import AdminDashboard from "./Pages/AdminDashboard";
import Signout from './Pages/Signout';  // Import the new component


const AppRouter = () => {


    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/VoterLoginPage" element={<VoterLoginPage  />}/>
                <Route path="/VoterDashboard" element={<VoterDashboard />}/>
                <Route path="/AdminLoginPage" element={<AdminLoginPage />} />
                <Route path="/VoterRegPage" element={<VoterRegPage />} />
                <Route path="/RegConfirm" element={<RegConfirm />} />
                <Route path="/VoterDashboard" element={<VoterDashboard />} />
                <Route path="/AdminDashboard" element={<AdminDashboard />} />
                <Route path="/Signout" element={<Signout />} />

            </Routes>
        </Router>
    );
};

export default AppRouter;
