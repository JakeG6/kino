import React, { createContext, useState, useEffect } from "react";
import { auth } from "../firebase.js";

export const UserContext = createContext(null);

const UserProvider = ({children}) => {
    
  const [user, setUser] = useState(null);

  //waiting for context to pass down user credentials
  const [pending, setPending] = useState(true);

  useEffect(() => {

    auth.onAuthStateChanged(user => {
      // console.log("a user is detected")
      setUser(user)
      setPending(false);
      // console.log(user)
    });

  },[]) 

  if (pending) {
    return <>Loading...</>
  }

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
  
}



export default UserProvider;