import { firestore, fieldValue } from '../../firebase.js';

//post article to firestore
const postArticle = async (articleData, user) => {

    let email = user.email;
    let authorId;
    let username;

    await firestore.collection("users").where("email", "==", email).get().then(snapshot => {

        username = snapshot.docs[0].data().username;
        authorId = user.uid;
    
    }).catch(function(error) {
    
        console.log("Error getting documents: ", error);

    });

    return firestore.collection("articles").add({
        username: username,
        authorId: authorId,
        date: fieldValue.serverTimestamp(),
        title: articleData.title,
        text: articleData.text,
        tags: articleData.tags,
        points: 0,
        upvoters: [],
        downvoters: [],
        urlString: articleData.title.toLowerCase().split(" ").join("-")
        
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