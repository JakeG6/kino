import { firestore } from '../../firebase.js';

const getArticles = async username => {

    let artArr = [];

    return firestore.collection("articles").where("username", "==", username).get().then(snapshot => {
        
        snapshot.docs.forEach(doc => {
            
            artArr.push( doc.data() )} 
        
            );

        return artArr;
        
    }).catch(function(error) {
    
        return console.log("Error getting articles: ", error);
    
    });

}

export default getArticles