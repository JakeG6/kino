import { firestore, fieldValue } from '../../firebase.js';

export const getArticle = async (urlString) => {

    return firestore.collection("articles").where("urlString", "==", urlString).get().then(snapshot => {

        let article = snapshot.docs[0].data();

        return article;
        
    }).catch(function(error) {
    
        return console.log("Error getting article: ", error);
    
    });

}

//update movie comment
export const updateArticle = async (id, editedArticle) => {
    console.log(editedArticle);

    const articleRef = firestore.collection("articles").doc(id);

    await articleRef.update({
        tags: editedArticle.tags,
        text: editedArticle.text,
        title: editedArticle.title,
        urlString: editedArticle.title.toLowerCase().split(" ").join("-"),
        lastEdited: fieldValue.serverTimestamp()
    }).then(function() {
        console.log("Article successfully updated!");

    }).catch(function(error) {
        console.error("Error updating document: ", error);
    });

}

export default getArticle;