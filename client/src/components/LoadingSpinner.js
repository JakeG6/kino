import React, { useState, useEffect } from 'react';
import { BrowserRouter as Link } from "react-router-dom";

import Spinner from 'react-bootstrap/Spinner';

const LoadingSpinner = () => {
    return (
        <div className="spinner-page">
            <Spinner animation="border" variant="light" />
        </div>

    )
}

export default LoadingSpinner;
