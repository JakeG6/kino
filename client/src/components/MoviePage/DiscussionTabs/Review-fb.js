import { firestore, fieldValue } from '../../../firebase.js';

export const updateReview = (id, editedReview) => {

    const reviewRef = firestore.collection("movieReviews").doc(id);

    reviewRef.update({
        rating: editedReview.rating,
        text: editedReview.text,
        title: editedReview.title,
        lastEdited: fieldValue.serverTimestamp()

    }).then(function() {
        // console.log("Review successfully updated!");

    }).catch(function(error) {
        console.error("Error updating document: ", error);
    });

}