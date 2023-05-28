import { React, createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [Auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{Auth, setAuth}}>
      {children}
    </AuthContext.Provider>
  );
}