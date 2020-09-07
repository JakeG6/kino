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
            
        }).then(docRef => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(error => {
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

export const getUserData = user => {

    let userObj;

    firestore.collection("users").where("email", "==", user.email).get().then(snapshot => {

        userObj = snapshot.docs[0].data();
        
    }).catch(function(error) {
    
        console.log("Error getting user: ", error);
    
    });

    return userObj;

}

//post movie comment to firestore
export const postMovieComment = async (movieId, text, user) => {
    // console.log(movieId, text, user.email)

    let email = user.email
    let username;

    await firestore.collection("users").where("email", "==", email).get().then(snapshot => {

        username = snapshot.docs[0].data().username;
        // console.log(username)
    
    }).catch(function(error) {
    
        console.log("Error getting documents: ", error);
    
    });

    firestore.collection("movieComments").add({
        movieId: movieId,
        username: username,
        date: firebase.firestore.FieldValue.serverTimestamp(),
        text: text,
        points: 0
        
    }).then(function(docRef) {
        console.log("Comment written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding comment: ", error);
    });
}

//retrieve comments for moviepage
export const getMovieComments = async movieId => {

    let commentArr = []

    await firestore.collection("movieComments").where("movieId", "==", movieId).get().then(snapshot => {
        snapshot.forEach(doc => {

            commentArr.push(doc.data());
        })
        
        console.log(commentArr)
  
    })

    return commentArr;

}