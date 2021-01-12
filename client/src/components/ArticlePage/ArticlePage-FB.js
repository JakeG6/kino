import { firestore } from '../../firebase.js';

const getArticle = async (urlString) => {

    return firestore.collection("articles").where("urlString", "==", urlString).get().then(snapshot => {

        let article = snapshot.docs[0].data();

        return article;
        
    }).catch(function(error) {
    
        return console.log("Error getting article: ", error);
    
    });

}

export default getArticle;