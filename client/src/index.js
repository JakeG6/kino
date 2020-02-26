import React from 'react';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui'
import { BrowserRouter as Router} from "react-router-dom";

// import ScrollToTop from './ScrollToTop.js';
import { Provider } from 'react-redux'
import store from './redux/store'

import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Kino's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC3usqlGSgcOMzxPhedMV7wlmjbuE06IcU",
    authDomain: "kino-e29ae.firebaseapp.com",
    databaseURL: "https://kino-e29ae.firebaseio.com",
    projectId: "kino-e29ae",
    storageBucket: "kino-e29ae.appspot.com",
    messagingSenderId: "467026513874",
    appId: "1:467026513874:web:6adab093d9b2a7b590020b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


ReactDOM.render(
    <Provider store={store}>
        <App /> 
    </Provider>
, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
