import React, { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.init";



export const AuthContext = createContext(null);
export const auth = getAuth(app);

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState(false);


const createUser = (email,password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password)
}

const signIn = (email,password)=>{
    return signInWithEmailAndPassword(auth,email,password)
}

const logOut =()=>{
    setLoading(true)
    return signOut(auth)
}

const googleSign =()=>{
  return signInWithPopup(provider,auth)
}

const profileInfo = (updatedData) => {
  return updateProfile(auth.currentUser,updatedData)
};


  useEffect(()=>{
   const unsubscribe= onAuthStateChanged(auth,currentUser=>{
        setUser(currentUser)
        setLoading(false)
        console.log(currentUser);
    })

    return ()=>{
        return unsubscribe()
    }

  },[])

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
    profileInfo,
    googleSign,
    student,
    setStudent
  };

  return (
         <AuthContext.Provider value={authInfo}>
        {children}
        </AuthContext.Provider>
  );
};

export default AuthProvider;
