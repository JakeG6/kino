import React from 'react';
import { BrowserRouter as Router} from "react-router-dom";

// import ScrollToTop from './ScrollToTop.js';
import UserProvider from "./providers/UserProvider.js"
import {LoginModalProvider} from "./providers/LoginModalProvider.js"


import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Router>
        <UserProvider>
            <LoginModalProvider>
                <App />
            </LoginModalProvider>
        </UserProvider>
    </Router>
        
  
, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
