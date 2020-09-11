import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui'

import firebaseConfig from "./firebaseConfig.js"
import { counter } from '@fortawesome/fontawesome-svg-core';

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

//retrieve user data
export const getUserData = user => {

    let userObj;

    firestore.collection("users").where("email", "==", user.email).get().then(snapshot => {

        userObj = snapshot.docs[0].data();
        
    }).catch(function(error) {
    
        console.log("Error getting user: ", error);
    
    });

    return userObj;

}

//create distributed counters for likes and dislikes for posts and reviews.
const createCounter = (ref, num_shards) => {
    let batch = firestore.batch();

    // Initialize the counter document
    batch.set(ref, { num_shards: num_shards });

    // Initialize each shard with count=0
    for (let i = 0; i < num_shards; i++) {
        let shardRef = ref.collection('shards').doc(i.toString());
        batch.set(shardRef, { count: 0 });
    }

    // Commit the write batch
    return batch.commit();
}

//use this function to increment the count for posts and review
const incrementCounter = (db, ref, num_shards) => {
    // Select a shard of the counter at random
    const shard_id = Math.floor(Math.random() * num_shards).toString();
    const shard_ref = ref.collection('shards').doc(shard_id);

    // Update count
    return shard_ref.update("count", firebase.firestore.FieldValue.increment(1));
}

//get the total count from a shard subcollection
const getCount = ref => {

     // Sum the count of each shard in the subcollection
     return ref.collection('shards').get().then(snapshot => {
        let total_count = 0;
        snapshot.forEach(doc => {
            total_count += doc.data().count;
        });

        return total_count;
    });

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
        points: 0,
        upvoters: [],
        downvoters: []
        
    }).then(function(docRef) {
        //add UID as property
        let freshComment = firestore.collection("movieComments").doc(docRef.id);

        freshComment.set({
            commentId: docRef.id
        }, {merge: true})

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

export const postMovieReview = async (movieId, reviewData, user) => {

    let email = user.email
    let username;

    await firestore.collection("users").where("email", "==", email).get().then(snapshot => {

        username = snapshot.docs[0].data().username;
        // console.log(username)
    
    }).catch(function(error) {
    
        console.log("Error getting document: ", error);
    
    });

    firestore.collection("movieReviews").add({
        date: firebase.firestore.FieldValue.serverTimestamp(),
    
        movieId: movieId,
        points: 0,
        rating: reviewData.rating,
        text: reviewData.text,
        title: reviewData.title,
        username: username
        
        
    }).then(function(docRef) {
        console.log("Review written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding comment: ", error);
    });
}

export const getMovieReviews = async movieId => {

    let reviewsArr = []

    await firestore.collection("movieReviews").where("movieId", "==", movieId).get().then(snapshot => {
        snapshot.forEach(doc => {

            reviewsArr.push(doc.data());
        })
        
        console.log(reviewsArr)
  
    })

    return reviewsArr;

}

export const upvote = async (commentId, user) => {

    const commentRef = firestore.collection("movieComments").doc(commentId);

    //remove the user from downvoters if they're upvoting.
    let comment = undefined;

    await commentRef.get().then(doc => {

        comment = doc.data();

        if (comment.downvoters.includes(user.email)) {
            commentRef.update({ downvoters: firebase.firestore.FieldValue.arrayRemove(user.email) });
            
        }

    })

    await commentRef.update({ upvoters: firebase.firestore.FieldValue.arrayUnion(user.email) });
    
    commentRef.update({ points: firebase.firestore.FieldValue.increment(1)})

}

export const downvote = async (commentId, user) => {

    const commentRef = firestore.collection("movieComments").doc(commentId);

    //remove the user from upvoters if they're downvoting.

    let comment = undefined;

    await commentRef.get().then(doc => {

        comment = doc.data();

        if (comment.upvoters.includes(user.email)) {
            commentRef.update({ upvotes: firebase.firestore.FieldValue.arrayRemove(user.email) });
        }

    })

    await commentRef.update({ downvoters: firebase.firestore.FieldValue.arrayUnion(user.email) });
    commentRef.update({ points: firebase.firestore.FieldValue.increment(-1)})

}

export const unvote = async (commentId, vote, user) => {

    const commentRef = firestore.collection("movieComments").doc(commentId);

    if (vote === "upvote") {
        await commentRef.update({ upvoters: firebase.firestore.FieldValue.arrayUnion(user.email) });
        commentRef.update({ points: firebase.firestore.FieldValue.increment(-1)})
    }

    if (vote === "downvote") {
        await commentRef.update({ downvoters: firebase.firestore.FieldValue.arrayRemove(user.email) });
        commentRef.update({ points: firebase.firestore.FieldValue.increment(1)})
    }
}

// export const downvote = async (commentId, user) => {

//     const commentRef = firestore.collection("movieComments").doc(commentId);

//     commentRef

//     await commentRef.update({ downvoters: firebase.firestore.FieldValue.arrayRemove(user.email) });

// }