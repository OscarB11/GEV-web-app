import React from 'react';
import { Link } from 'react-router-dom';
import GreenTickImage from '../images/img.png'; // Import the image
import '../Css/RegConfirm.css';

const RegConfirm = () => {
    return (
        <div className="reg-confirm-container d-flex align-items-center justify-content-center">
            <div className="reg-confirm-form">
                <h1 className="text-center mb-4">Voter Registration Successful!</h1>
                <p className="text-center">
                    Thank you for registering as a voter. Your registration is successful.
                </p>

                <div className="text-center mt-4">
                    <img
                        src={GreenTickImage} // Use the imported image
                        alt="Green Tick"
                        className="green-tick-image"
                    />
                </div>

                <div className="text-center mt-4">
                    <Link to="/VoterLoginPage" className="RegConfirm-btn-primary">
                        Voter login
                    </Link>
                </div>


            </div>
        </div>
    );
};
export default RegConfirm;
