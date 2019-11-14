import React, { useState, useEffect } from 'react';
import { BrowserRouter as Link } from "react-router-dom";

import Spinner from 'react-bootstrap/Spinner';

const LoadingSpinner = () => {
    return (
        <Spinner animation="border" variant="light" size="lg" />

    )
}

export default LoadingSpinner;
