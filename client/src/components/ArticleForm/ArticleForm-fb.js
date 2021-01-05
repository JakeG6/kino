import * as firebase from 'firebase';
import { firestore } from '../../firebase.js';

//post article to firestore
const postArticle = async (articleData, user) => {

    let email = user.email;
    let authorId;
    let username;

    await firestore.collection("users").where("email", "==", email).get().then(snapshot => {

        username = snapshot.docs[0].data().username;
        authorId = snapshot.docs[0].data().id;
    
    }).catch(function(error) {
    
        console.log("Error getting documents: ", error);

    });

    await firestore.collection("articles").add({
        username: username,
        authorId: authorId,
        date: firebase.firestore.FieldValue.serverTimestamp(),
        title: articleData.title,
        text: articleData.text,
        tags: articleData.tags,
        points: 0,
        upvoters: [],
        downvoters: []
        
    }).then(function(docRef) {

        //add UID as property
        let freshArticle = firestore.collection("articles").doc(docRef.id);

        freshArticle.set({
            articleId: docRef.id
        }, {merge: true})

    })
    .catch(function(error) {
        console.error("Error adding comment: ", error);
    });

}

export default postArticle;