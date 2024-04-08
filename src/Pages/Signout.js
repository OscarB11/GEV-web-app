import React from 'react';
import { Link } from 'react-router-dom';

const Signout = () => {
    return (
        <div className="sign-out-container d-flex align-items-center justify-content-center">
            <div className="sign-out-form">
                <h1 className="text-center mb-4">Sign Out</h1>
                <p className="text-center">
                    You have been successfully signed out. Thank you for using our services.
                </p>

                <div className="text-center mt-4">
                    <Link to="/" className="sign-out-btn-primary">
                        Return to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signout;
