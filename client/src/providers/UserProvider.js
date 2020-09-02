import React, { Component, createContext, useState, useEffect } from "react";
import { auth } from "../firebase.js";

export const UserContext = createContext(null);

const UserProvider = props => {
    
    const [user, setUser] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged(userAuth => {
            setUser(userAuth);
        });
    });
  
    return (
      <UserContext.Provider value={user}>
        {props.children}
      </UserContext.Provider>
    );
  
}

export default UserProvider;