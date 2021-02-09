import { firestore, serverTimestamp } from '../../../firebase.js';


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

    let commentObj = {
        type: type,
        movieId: id,
        username: username,
        authorId: user.uid,
        date: serverTimestamp(),
        text: text,
        points: 0,
        upvoters: [],
        downvoters: []
    }

    //add the article id or movie id depending on the comment type
    if (commentObj.type == "movie") {
        commentObj.movieId = id;
    }

    if (commentObj.type == "article") {
        commentObj.articleId = id;
    }

    return firestore.collection("comments").add(commentObj).then(function(docRef) {
        //add UID as property
        let freshComment = firestore.collection("comments").doc(docRef.id);
            
        return freshComment.set({
            commentId: docRef.id
        }, {merge: true})

    })
    .catch(function(error) {
        console.error("Error adding comment: ", error);
    });

}

//retrieve comments for movie or article page's comment tab
export const getComments = async (type, id) => {

    let commentArr = [];

    if (type === "movie") {

        await firestore.collection("comments").where("movieId", "==", id).get().then(snapshot => {
            snapshot.forEach(doc => {
    
                commentArr.push(doc.data());
            })

            
      
        })

        return commentArr;

    }
    else if (type === "article") {
        await firestore.collection("comments").where("articleId", "==", id).get().then(snapshot => {
            snapshot.forEach(doc => {
                console.log(doc.data());
                commentArr.push(doc.data());
            })

            
      
        })

        return commentArr;
        
    }
    else {
        return commentArr;
    }

}