import { firestore } from '../../firebase.js';

const getArticle = async (title) => {
    console.log('the beginning of getArticle')

    // let article;

    return firestore.collection("articles").where("title", "==", title).get().then(snapshot => {
        console.log(snapshot)

        let article = snapshot.docs[0].data();
        console.log(article);
        console.log('the end of get article')
        return article;
        
    }).catch(function(error) {
    
        return console.log("Error getting article: ", error);
    
    });

}

export default getArticle;