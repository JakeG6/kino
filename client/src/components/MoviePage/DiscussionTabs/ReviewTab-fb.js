import { firestore, fieldValue } from '../../../firebase.js';

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
        date: fieldValue.serverTimestamp(),
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
