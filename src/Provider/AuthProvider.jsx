import { createContext, useEffect, useState } from "react";
import auth from "./../firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);

  const createUser = (email, password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logInUser = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOutUser = () => {
    setLoader(true);
    return signOut(auth);
  };

  // useEffect(() => {
  //   const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     //   console.log(currentUser);
  //     setUser(currentUser);
  //     setLoader(false);
  //   });
  //   return () => {
  //     unSubscribe();
  //   };
  // }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const userEmail = currentUser?.email || user?.email;
      setUser(currentUser);
      console.log("current user", userEmail);
      setLoader(false);
      console.log(currentUser);
      if (currentUser) {
        //  const loggedUser = {email: currentUser?.email}

        axios
          .post(
            "https://assignment-11-jwt-server.vercel.app/jwtS",
            { email: userEmail },
            { withCredentials: true }
          )
          .then((res) => {
            console.log("token", res.data);
          });
      } else {
        axios
          .post(
            "https://assignment-11-jwt-server.vercel.app/logout",
            { email: userEmail },
            { withCredentials: true }
          )
          .then((res) => {
            console.log(res.data);
          });
      }
    });
    return () => {
      return unsubscribe();
    };
  }, [user?.email]);

  const authInfo = {
    user,
    loader,
    createUser,
    logInUser,
    logOutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
