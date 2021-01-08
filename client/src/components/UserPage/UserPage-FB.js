import { firestore } from '../../firebase.js';

const getUser = async username => {
    
    let userObj;

    await firestore.collection("users").where("username", "==", username).get().then(snapshot => {

        userObj = snapshot.docs[0].data();
      
    }).catch(function(error) {
    
        console.log("Error getting user: ", error);
    
    });

    return userObj;
}

export default getUser;