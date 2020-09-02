import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui'
import "./firebaseConfig.js";
import { BrowserRouter as Router} from "react-router-dom";

import firebaseConfig from "./firebaseConfig.js"

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//add new user to site firebase.
const signupNewUser = (username, password, email) => {
    console.log("we're signing up the new user")

    const usernameQuery =  firestore.collection("users").where("username", "==", username);
    const emailQuery = firestore.collection("users").where("email", "==", email);

    console.log(usernameQuery);
    console.log(emailQuery);

    if (!usernameQuery.exists && !emailQuery.exists) {

        console.log("they don't exist")

        auth.createUserWithEmailAndPassword(email, password).catch( error => {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            // ...
        });

        firestore.collection("users").add({
            email: email,
            password: password,
            privilege: "user",
            userPoints: 1,
            username: username
            
        }).then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
        
    }
    else {
        console.log("something wrong")
    }

}

export default signupNewUser;