import { firestore, fieldValue } from '../../../firebase.js';

//update movie comment
export const updateComment = (id, editedText) => {

    const commentRef = firestore.collection("comments").doc(id);

    commentRef.update({
        text: editedText,
        lastEdited: fieldValue.serverTimestamp()
    }).then(function() {
        // console.log("Comment text successfully updated!");

    }).catch(function(error) {
        console.error("Error updating document: ", error);
    });

}

//Update user points value
export const updateUserPoints = async (authorId) => {

    const userRef = firestore.collection("users").doc(authorId);
    const userCommentsRef = firestore.collection("comments").where("authorId", "==", authorId);
   
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

export const toggleUpvote = async (commentId, user) => {

    const commentRef = firestore.collection("comments").doc(commentId);

    const removeFromUpvoters = { upvoters: fieldValue.arrayRemove(user.uid) };
    const removeFromDownvoters = { downvoters: fieldValue.arrayRemove(user.uid) };
    const addToUpvoters = { upvoters: fieldValue.arrayUnion(user.uid) };

    let comment = undefined;
    let pointChange;

    let doc = await commentRef.get();

    comment = doc.data();
    
    //remove the user from upvoters if they've upvoted already
    if (comment.upvoters.includes(user.uid)) {
        await commentRef.update(removeFromUpvoters);
        await commentRef.update({ points: fieldValue.increment(-1)});
        pointChange = -1;
    
    }
    // add the user to upvoters if they're in downvoters, and compensate for points lost from downvoting
    else if (comment.downvoters.includes(user.uid)) {
        await commentRef.update(removeFromDownvoters);
        await commentRef.update(addToUpvoters);
        await commentRef.update({ points: fieldValue.increment(2)});
        pointChange = 2;
                
    }
    //add the user to upvoters if they haven't voted on the comment
    else {
        await commentRef.update(addToUpvoters);
        await commentRef.update({ points: fieldValue.increment(1)});
        pointChange = 1;
            
    }

    updateUserPoints(comment.authorId)

}

export const toggleDownvote = async (commentId, user) => {

    const commentRef = firestore.collection("comments").doc(commentId);

    const removeFromUpvoters = { upvoters: fieldValue.arrayRemove(user.uid) };
    const removeFromDownvoters = { downvoters: fieldValue.arrayRemove(user.uid) };
    const addToDownvoters = { downvoters: fieldValue.arrayUnion(user.uid) };

    let comment = undefined;
    let pointChange = 0;

    let doc = await commentRef.get();
    
    comment = doc.data();
        
    //remove the user from downvoters if they've downvoted already
    if (comment.downvoters.includes(user.uid)) {

        await commentRef.update(removeFromDownvoters);
        await commentRef.update({ points: fieldValue.increment(1)});
        pointChange = 1;
   
    }

    // add the user to downvoters if they're in upvoters, and compensate for points gained from upvoting
    else if (comment.upvoters.includes(user.uid)) {

        await commentRef.update(removeFromUpvoters);
        await commentRef.update(addToDownvoters);
        await commentRef.update({ points: fieldValue.increment(-2)});
        pointChange = -2;
       
    }
    
    //add the user to upvoters if they haven't voted on the comment
    else {
        
        await commentRef.update(addToDownvoters);
        await commentRef.update({ points: fieldValue.increment(-1)});
        pointChange = -1;

    }

    updateUserPoints(comment.authorId)

}

export const deleteComment = (id) => {

    const commentRef = firestore.collection("comments").doc(id);

    commentRef.delete().then(function() {

    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });

}