import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

const NoMatch = () => {
    return (
        <div>
            404
        </div>
    )
    
}

export default NoMatch;