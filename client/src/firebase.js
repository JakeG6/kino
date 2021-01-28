import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import firebaseConfig from "./firebaseConfig.js"
import { counter } from '@fortawesome/fontawesome-svg-core';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// auth and firestore
export const auth = firebase.auth();
export const firestore = firebase.firestore();

//google provider
const googleProvider = new firebase.auth.GoogleAuthProvider();

//facebook provider
const facebookProvider = new firebase.auth.FacebookAuthProvider();
facebookProvider.addScope('email');


//add new user to site firebase.
export const signupNewUser = async (username, password, email) => {

    const usernameQuery =  firestore.collection("users").where("username", "==", username);
    const emailQuery = firestore.collection("users").where("email", "==", email);

    if (!usernameQuery.exists && !emailQuery.exists) {


        await auth.createUserWithEmailAndPassword(email, password).catch( error => {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(`${errorCode} ${errorMessage}`)
            // ...
        })

        const id = new Date().getTime().toString();

        firestore.collection("users").doc(id).set({
            //use unix millisecond timestamp for field id
            id: id,
            email: email,
            password: password,
            privilege: "user",
            userPoints: 0,
            username: username
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

    return auth.signInWithEmailAndPassword(email, password).then((result) => {
        console.log(result)
        // return result;

         // update the context
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        return error;
    });

}

//sign in user via google with a redirect
export const googleSignin = () => {

  auth.signInWithRedirect(googleProvider);

}

export const getGoogleAuthResult = () => {

    auth.getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });

}

//sign in user via facebook with a redirect
export const facebookSignin = () => {

    auth.signInWithPopup(facebookProvider).catch(error => {
        console.log(error);
      });

    auth.getRedirectResult().then(function(result) {
        console.log(result)
        if (result.credential) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          console.log(token)
        
          // ...
        }
        // The signed-in user info.
        var user = result.user;
        console.log(user)
      }).catch(function(error) {
          console.log(error)
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });

}

//logout User
export const logoutUser = () => {
    auth.signOut();
}

//retrieve user data
export const getUserData = async user => {

    let userObj;

    await firestore.collection("users").where("email", "==", user.email).get().then(snapshot => {

        userObj = snapshot.docs[0].data();    
        
    }).catch(function(error) {
    
        console.log("Error getting user: ", error);
    
    });

    return userObj;

}

//Update user points value
export const updateUserPoints = async (authorId) => {

    const userRef = firestore.collection("users").doc(authorId);
    const userCommentsRef = firestore.collection("movieComments").where("authorId", "==", authorId);
   
    let userCommentsArr = [];
    let newPointTotal = 0;

    await userCommentsRef.get().then(snapshot => {

        snapshot.forEach(doc => {
            userCommentsArr.push(doc.data());
        })
        
    })

    userCommentsArr.forEach(comment => (newPointTotal += comment.points))

    userRef.update({userPoints: newPointTotal})

}

//update user profile WIP
export const updateUserProfile = async (arg, newVal) => {
    
    const usersRef =  firestore.collection("users");
    let currentUser = auth.currentUser;   
    let userId;
    
    if (arg = "password") {

        await currentUser.updateProfile({
            password: newVal           
        })

        await usersRef.where("email", "==", currentUser.email).get().then(snapshot => {   
            userId = snapshot.docs[0].data().id;
        })
        
        usersRef.doc(userId).update({password: newVal});

    }

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
export const postComment = async (type, id, text, user) => {

    let email = user.email;
    let authorId;
    let username;

    await firestore.collection("users").where("email", "==", email).get().then(snapshot => {

        let userData = snapshot.docs[0].data();

        username = userData.username;
        authorId = userData.id;
    
    }).catch(function(error) {
    
        console.log("Error getting documents: ", error);

    });

    if (type == "movie") {

        return firestore.collection("movieComments").add({
            movieId: id,
            username: username,
            authorId: authorId,
            date: firebase.firestore.FieldValue.serverTimestamp(),
            text: text,
            points: 0,
            upvoters: [],
            downvoters: []
            
        }).then(function(docRef) {
            //add UID as property
            let freshComment = firestore.collection("movieComments").doc(docRef.id);
                
            return freshComment.set({
                commentId: docRef.id
            }, {merge: true})
    
        })
        .catch(function(error) {
            console.error("Error adding comment: ", error);
        });

    }

    if (type == "article") {

        return firestore.collection("articleComments").add({
            articleId: id,
            authorId: authorId,
            username: username,
            date: firebase.firestore.FieldValue.serverTimestamp(),
            text: text,
            points: 0,
            upvoters: [],
            downvoters: []
            
            
        }).then(function(docRef) {
            //add UID as property
            let freshComment = firestore.collection("articleComments").doc(docRef.id);
    
            return freshComment.set({
                commentId: docRef.id
            }, {merge: true})
    
        })
        .catch(function(error) {
            console.error("Error adding comment: ", error);
        });

    }

}

//retrieve comments for moviepage
export const getComments = async (type, id) => {

    let commentArr = [];

    if (type === "movie") {

        await firestore.collection("movieComments").where("movieId", "==", id).get().then(snapshot => {
            snapshot.forEach(doc => {
    
                commentArr.push(doc.data());
            })
      
        })

    }

    if (type === "article") {
        await firestore.collection("articleComments").where("articleId", "==", id).get().then(snapshot => {
            snapshot.forEach(doc => {
    
                commentArr.push(doc.data());
            })
      
        })
    }

    return commentArr;

}

export const postMovieReview = async (movieId, reviewData, user) => {
    
    let email = user.email
    let authorId = user.uid
    let username;

    await firestore.collection("users").where("email", "==", email).get().then(snapshot => {
        username = snapshot.docs[0].data().username;

    }).catch(function(error) {
        console.log("Error getting document: ", error);
    });
    await firestore.collection("movieReviews").add({
        date: firebase.firestore.FieldValue.serverTimestamp(),
        movieId: movieId,
        authorId: authorId,
        points: 0,
        rating: reviewData.rating,
        text: reviewData.reviewText,
        title: reviewData.title,
        username: username
    }).then(function(docRef) {
        let freshReview = firestore.collection("movieReviews").doc(docRef.id);
        return freshReview.set({ reviewId: docRef.id }, {merge: true})
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
  
    })

    return reviewsArr;

}

export const toggleUpvote = async (commentId, user) => {

    const commentRef = firestore.collection("movieComments").doc(commentId);

    const removeFromUpvoters = { upvoters: firebase.firestore.FieldValue.arrayRemove(user.uid) };
    const removeFromDownvoters = { downvoters: firebase.firestore.FieldValue.arrayRemove(user.uid) };
    const addToUpvoters = { upvoters: firebase.firestore.FieldValue.arrayUnion(user.uid) };

    let comment = undefined;
    let pointChange;

    let doc = await commentRef.get();

    comment = doc.data();
    
    //remove the user from upvoters if they've upvoted already
    if (comment.upvoters.includes(user.uid)) {
        await commentRef.update(removeFromUpvoters);
        await commentRef.update({ points: firebase.firestore.FieldValue.increment(-1)});
        pointChange = -1;
    
    }
    // add the user to upvoters if they're in downvoters, and compensate for points lost from downvoting
    else if (comment.downvoters.includes(user.uid)) {
        await commentRef.update(removeFromDownvoters);
        await commentRef.update(addToUpvoters);
        await commentRef.update({ points: firebase.firestore.FieldValue.increment(2)});
        pointChange = 2;
                
    }
    //add the user to upvoters if they haven't voted on the comment
    else {
        await commentRef.update(addToUpvoters);
        await commentRef.update({ points: firebase.firestore.FieldValue.increment(1)});
        pointChange = 1;
            
    }

    updateUserPoints(comment.authorId)

}

export const toggleDownvote = async (commentId, user) => {

    const commentRef = firestore.collection("movieComments").doc(commentId);

    const removeFromUpvoters = { upvoters: firebase.firestore.FieldValue.arrayRemove(user.uid) };
    const removeFromDownvoters = { downvoters: firebase.firestore.FieldValue.arrayRemove(user.uid) };
    const addToDownvoters = { downvoters: firebase.firestore.FieldValue.arrayUnion(user.uid) };

    let comment = undefined;
    let pointChange = 0;

    let doc = await commentRef.get();
    
    comment = doc.data();
        
    //remove the user from downvoters if they've downvoted already
    if (comment.downvoters.includes(user.uid)) {

        await commentRef.update(removeFromDownvoters);
        await commentRef.update({ points: firebase.firestore.FieldValue.increment(1)});
        pointChange = 1;
   
    }

    // add the user to downvoters if they're in upvoters, and compensate for points gained from upvoting
    else if (comment.upvoters.includes(user.uid)) {

        await commentRef.update(removeFromUpvoters);
        await commentRef.update(addToDownvoters);
        await commentRef.update({ points: firebase.firestore.FieldValue.increment(-2)});
        pointChange = -2;
       
    }
    
    //add the user to upvoters if they haven't voted on the comment
    else {
        
        await commentRef.update(addToDownvoters);
        await commentRef.update({ points: firebase.firestore.FieldValue.increment(-1)});
        pointChange = -1;

    }

    updateUserPoints(comment.authorId)

}

export const deleteComment = (id) => {

    const commentRef = firestore.collection("movieComments").doc(id);

    commentRef.delete().then(function() {

    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });

}

export const deleteReview = (id) => {

    const commentRef = firestore.collection("movieReviews").doc(id);

    commentRef.delete().then(function() {
        
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });

}

//Reset Password
export const passwordReset = email => {
    auth.sendPasswordResetEmail(email);
}

//check password
export const checkPassword = async password => {

    const usersRef =  firestore.collection("users");
    let currentUser = auth.currentUser;  

    let userPW;

    await usersRef.where("email", "==", currentUser.email).get().then(snapshot => {   
        userPW = snapshot.docs[0].data().password;
    })

    return (password === userPW ? true : false);
    
}

export const checkUser = () => {
    // console.log("check user: ", auth.currentUser)
    if (auth.currentUser) { return true; }
    else { return false; }
}