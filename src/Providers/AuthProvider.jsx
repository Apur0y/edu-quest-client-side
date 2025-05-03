import React, { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.init";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";



export const AuthContext = createContext(null);
export const auth = getAuth(app);

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState(false);
  const [theme, setTheme] = useState(true)

    const {data:allUsers} =useQuery({
    queryKey:["userData"],
    queryFn: async ()=>{
      const res =await axios.get("https://eduquest-server-side.vercel.app/users")
      return res.data
    }
  })



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

        if(currentUser){
         
          const userInfo = {email: currentUser.email};
          axios.post('http://localhost:5000/jwt', userInfo,{
            withCredentials:true
          })
          .then(res=>{
            console.log(res)
            // if(res.data.token){
              
            //   localStorage.setItem('access-token', res.data.token)
            // }
          })

        }
        // else{
        //   localStorage.removeItem('access-token')

        // }
        setLoading(false)
      ;
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
    setStudent,
    allUsers,
    theme,
    setTheme
  };

  return (
         <AuthContext.Provider value={authInfo}>
        {children}
        </AuthContext.Provider>
  );
};

export default AuthProvider;
