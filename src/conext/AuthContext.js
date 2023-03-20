import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [curentUser, setCurentUser] = useState({});
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      setCurentUser(user);
      //   console.log(user);
    });

    return () => {
      unSub();
    };
  }, []);
  return (
    <AuthContext.Provider value={{ curentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
