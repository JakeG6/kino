import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui'

import firebaseConfig from "./firebaseConfig.js"

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//add new user to site firebase.
export const signupNewUser = (username, password, email) => {
    console.log("we're signing up the new user")

    const usernameQuery =  firestore.collection("users").where("username", "==", username);
    const emailQuery = firestore.collection("users").where("email", "==", email);

    console.log(usernameQuery);
    console.log(emailQuery);

    if (!usernameQuery.exists && !emailQuery.exists) {

        console.log("good news: they don't exist")

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

//sign in user
export const signinUser = (email, password) => {

    let userPromise = auth.signInWithEmailAndPassword(email, password);

    userPromise.then((result) => {
        console.log(result);
         // updare the context
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });

}

//logout User
export const logoutUser = () => {
    auth.signOut().then(promise => {
        //signout succesful
        console.log("signout succesful")
        console.log(promise);
    }).catch(error => {
        // An error happened.
    });
}