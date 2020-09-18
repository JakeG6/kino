import React, { createContext, useState, useEffect } from "react";

export const LoginModalContext = createContext();

export const LoginModalProvider = ({children}) => { 

  const [loginShow, setLoginShow] = useState(false);

  useEffect(() => {
  }, [loginShow])

  return (
      <LoginModalContext.Provider value={{loginShow, setLoginShow}}>
        {children}
      </LoginModalContext.Provider>
  );
    
}