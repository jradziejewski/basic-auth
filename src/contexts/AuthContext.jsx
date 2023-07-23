import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import propTypes from "prop-types";

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  function signup(email, password) {
    auth.createUserWithEmailAndPassword(email, password);
  }

  const value = {
    currentUser,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: propTypes.node.isRequired,
};
