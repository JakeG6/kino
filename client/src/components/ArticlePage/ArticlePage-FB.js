import { firestore } from '../../firebase.js';

const getArticle = async (title) => {

    return firestore.collection("articles").where("title", "==", title).get().then(snapshot => {

        let article = snapshot.docs[0].data();

        return article;
        
    }).catch(function(error) {
    
        return console.log("Error getting article: ", error);
    
    });

}

export default getArticle;